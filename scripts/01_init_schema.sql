-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizations table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  logo_url TEXT,
  owner_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Locations (Hotels/Restaurants) table
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500),
  city VARCHAR(100),
  country VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(255),
  timezone VARCHAR(50) DEFAULT 'Africa/Lagos',
  currency VARCHAR(3) DEFAULT 'NGN',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Dynamic Roles table (allows clients to create custom roles)
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  permissions JSONB DEFAULT '[]'::jsonb,
  is_system_role BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(organization_id, name)
);

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  organization_id UUID NOT NULL REFERENCES organizations ON DELETE CASCADE,
  location_id UUID REFERENCES locations ON DELETE SET NULL,
  role_id UUID NOT NULL REFERENCES roles ON DELETE RESTRICT,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Guest Profiles (CRM) table
CREATE TABLE guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations ON DELETE CASCADE,
  email VARCHAR(255),
  phone VARCHAR(20),
  full_name VARCHAR(255) NOT NULL,
  date_of_birth DATE,
  country VARCHAR(100),
  address TEXT,
  preferences JSONB DEFAULT '{}'::jsonb,
  notes TEXT,
  total_stays INTEGER DEFAULT 0,
  total_spent_ngn DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(organization_id, email)
);

-- Room Types table
CREATE TABLE room_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID NOT NULL REFERENCES locations ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  capacity INTEGER NOT NULL,
  base_price_ngn DECIMAL(10,2) NOT NULL,
  amenities JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Rooms (Inventory) table
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID NOT NULL REFERENCES locations ON DELETE CASCADE,
  room_type_id UUID NOT NULL REFERENCES room_types ON DELETE RESTRICT,
  room_number VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'available',
  floor_number INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(location_id, room_number)
);

-- Reservations table
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID NOT NULL REFERENCES locations ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES rooms ON DELETE RESTRICT,
  guest_id UUID NOT NULL REFERENCES guests ON DELETE RESTRICT,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  number_of_guests INTEGER NOT NULL,
  base_price_ngn DECIMAL(10,2) NOT NULL,
  discount_ngn DECIMAL(10,2) DEFAULT 0,
  tax_ngn DECIMAL(10,2) DEFAULT 0,
  total_price_ngn DECIMAL(12,2) NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'pending',
  payment_method VARCHAR(50),
  special_requests TEXT,
  created_by UUID REFERENCES users ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Menu Categories table
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID NOT NULL REFERENCES locations ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Menu Items table
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID NOT NULL REFERENCES locations ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES menu_categories ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price_ngn DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  preparation_time_minutes INTEGER,
  allergens JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- POS Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID NOT NULL REFERENCES locations ON DELETE CASCADE,
  reservation_id UUID REFERENCES reservations ON DELETE SET NULL,
  order_number VARCHAR(50) NOT NULL UNIQUE,
  status VARCHAR(20) DEFAULT 'pending',
  table_number VARCHAR(20),
  room_number VARCHAR(20),
  subtotal_ngn DECIMAL(10,2) NOT NULL,
  tax_ngn DECIMAL(10,2) DEFAULT 0,
  discount_ngn DECIMAL(10,2) DEFAULT 0,
  total_ngn DECIMAL(12,2) NOT NULL,
  payment_method VARCHAR(50),
  created_by UUID REFERENCES users ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Order Items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders ON DELETE CASCADE,
  menu_item_id UUID NOT NULL REFERENCES menu_items ON DELETE RESTRICT,
  quantity INTEGER NOT NULL,
  unit_price_ngn DECIMAL(10,2) NOT NULL,
  subtotal_ngn DECIMAL(10,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Inventory Items table
CREATE TABLE inventory_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID NOT NULL REFERENCES locations ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  quantity INTEGER NOT NULL,
  unit VARCHAR(50),
  reorder_level INTEGER,
  cost_per_unit_ngn DECIMAL(10,2),
  supplier VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Staff/Payroll table
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations ON DELETE CASCADE,
  location_id UUID REFERENCES locations ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES users ON DELETE RESTRICT,
  job_title VARCHAR(100),
  department VARCHAR(100),
  salary_ngn DECIMAL(12,2),
  employment_type VARCHAR(20),
  date_of_hire DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Attendance table
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id UUID NOT NULL REFERENCES staff ON DELETE CASCADE,
  date DATE NOT NULL,
  check_in_time TIMESTAMP,
  check_out_time TIMESTAMP,
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(staff_id, date)
);

-- Payslips table
CREATE TABLE payslips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id UUID NOT NULL REFERENCES staff ON DELETE CASCADE,
  period_start_date DATE NOT NULL,
  period_end_date DATE NOT NULL,
  basic_salary_ngn DECIMAL(12,2),
  allowances_ngn DECIMAL(12,2) DEFAULT 0,
  deductions_ngn DECIMAL(12,2) DEFAULT 0,
  net_salary_ngn DECIMAL(12,2),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
  receiver_id UUID REFERENCES users ON DELETE CASCADE,
  group_id UUID,
  content TEXT NOT NULL,
  file_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Message Groups table
CREATE TABLE message_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  created_by UUID NOT NULL REFERENCES users ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Group Members table
CREATE TABLE group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID NOT NULL REFERENCES message_groups ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Housekeeping Tasks table
CREATE TABLE housekeeping_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID NOT NULL REFERENCES locations ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES rooms ON DELETE CASCADE,
  assigned_to UUID REFERENCES users ON DELETE SET NULL,
  task_type VARCHAR(50),
  status VARCHAR(20) DEFAULT 'pending',
  priority VARCHAR(20) DEFAULT 'normal',
  notes TEXT,
  due_date TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Indexes for Performance
CREATE INDEX idx_users_organization_id ON users(organization_id);
CREATE INDEX idx_users_location_id ON users(location_id);
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_locations_organization_id ON locations(organization_id);
CREATE INDEX idx_rooms_location_id ON rooms(location_id);
CREATE INDEX idx_rooms_status ON rooms(status);
CREATE INDEX idx_reservations_location_id ON reservations(location_id);
CREATE INDEX idx_reservations_guest_id ON reservations(guest_id);
CREATE INDEX idx_reservations_room_id ON reservations(room_id);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_check_in_date ON reservations(check_in_date);
CREATE INDEX idx_guests_organization_id ON guests(organization_id);
CREATE INDEX idx_orders_location_id ON orders(location_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_inventory_items_location_id ON inventory_items(location_id);
CREATE INDEX idx_staff_organization_id ON staff(organization_id);
CREATE INDEX idx_staff_location_id ON staff(location_id);
CREATE INDEX idx_attendance_staff_id ON attendance(staff_id);
CREATE INDEX idx_messages_organization_id ON messages(organization_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_housekeeping_tasks_location_id ON housekeeping_tasks(location_id);
CREATE INDEX idx_housekeeping_tasks_room_id ON housekeeping_tasks(room_id);

-- Enable RLS (Row Level Security)
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE payslips ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE housekeeping_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for Organizations (owner access)
CREATE POLICY "Users can view their organization" ON organizations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE users.organization_id = organizations.id
        AND users.id = auth.uid()
    )
  );

CREATE POLICY "Users can update their organization" ON organizations
  FOR UPDATE USING (owner_id = auth.uid());

-- Create RLS Policies for Users (within same organization)
CREATE POLICY "Users can view members of their organization" ON users
  FOR SELECT USING (
    organization_id = (
      SELECT organization_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (id = auth.uid());

-- Create RLS Policies for Locations
CREATE POLICY "Users can view locations in their organization" ON locations
  FOR SELECT USING (
    organization_id = (
      SELECT organization_id FROM users WHERE id = auth.uid()
    )
  );

-- Create RLS Policies for Guests
CREATE POLICY "Users can view guests in their organization" ON guests
  FOR SELECT USING (
    organization_id = (
      SELECT organization_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can insert guests in their organization" ON guests
  FOR INSERT WITH CHECK (
    organization_id = (
      SELECT organization_id FROM users WHERE id = auth.uid()
    )
  );

-- Create RLS Policies for Rooms
CREATE POLICY "Users can view rooms in their locations" ON rooms
  FOR SELECT USING (
    location_id IN (
      SELECT id FROM locations WHERE organization_id = (
        SELECT organization_id FROM users WHERE id = auth.uid()
      )
    )
  );

-- Create RLS Policies for Reservations
CREATE POLICY "Users can view reservations in their locations" ON reservations
  FOR SELECT USING (
    location_id IN (
      SELECT id FROM locations WHERE organization_id = (
        SELECT organization_id FROM users WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can create reservations in their locations" ON reservations
  FOR INSERT WITH CHECK (
    location_id IN (
      SELECT id FROM locations WHERE organization_id = (
        SELECT organization_id FROM users WHERE id = auth.uid()
      )
    )
  );

-- Create RLS Policies for Roles
CREATE POLICY "Users can view roles in their organization" ON roles
  FOR SELECT USING (
    organization_id = (
      SELECT organization_id FROM users WHERE id = auth.uid()
    )
  );

-- Add comment to schema
COMMENT ON SCHEMA public IS 'Roommend - Hotel & Restaurant Management SaaS (Open Source)';
