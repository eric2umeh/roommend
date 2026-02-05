# ROOMMEND - Technical Implementation Guide
**Prepared by:** Eric  
**Date:** February 2, 2026  
**Version:** 1.0  

---

## TABLE OF CONTENTS
1. Database Schema Details
2. API Endpoint Specifications
3. Frontend Component Structure
4. State Management Patterns
5. Security Implementation
6. Performance Optimization
7. Deployment Checklist

---

## 1. DATABASE SCHEMA DETAILS

### 1.1 Authentication & Users

```sql
-- Supabase Auth (Built-in)
-- auth.users table auto-managed

-- organizations
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100),
  tier VARCHAR(20) DEFAULT 'free', -- free, pro, enterprise
  max_locations INTEGER DEFAULT 1,
  subscription_status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- locations
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- hotel, property, restaurant
  address TEXT,
  phone VARCHAR(20),
  timezone VARCHAR(50) DEFAULT 'UTC',
  currency VARCHAR(10) DEFAULT 'NGN',
  check_in_time TIME DEFAULT '14:00',
  check_out_time TIME DEFAULT '11:00',
  default_tax_rate DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(org_id, name)
);

-- users (linking Supabase Auth)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id UUID NOT NULL REFERENCES organizations(id),
  location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  role_id UUID NOT NULL REFERENCES roles(id),
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  status VARCHAR(20) DEFAULT 'active', -- active, inactive, suspended
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(email, org_id)
);

-- roles (Dynamic Role Management)
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  permissions JSONB DEFAULT '[]', -- Array of permission codes
  is_system BOOLEAN DEFAULT FALSE, -- TRUE for Super Admin, Admin, etc
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES users(id),
  UNIQUE(org_id, name)
);

-- Permissions reference (in-app enum)
-- PERMISSIONS = {
--   SUPER_ADMIN: 'super_admin:all',
--   ORG_ADMIN: 'org:admin',
--   LOCATION_ADMIN: 'location:admin',
--   RESERVATIONS_VIEW: 'reservations:read',
--   RESERVATIONS_EDIT: 'reservations:write',
--   ROOMS_VIEW: 'rooms:read',
--   ROOMS_EDIT: 'rooms:write',
--   GUESTS_VIEW: 'guests:read',
--   GUESTS_EDIT: 'guests:write',
--   STAFF_MANAGE: 'staff:manage',
--   PAYROLL_VIEW: 'payroll:read',
--   PAYROLL_EDIT: 'payroll:write',
--   INVENTORY_VIEW: 'inventory:read',
--   INVENTORY_EDIT: 'inventory:write',
--   POS_VIEW: 'pos:read',
--   POS_EDIT: 'pos:write',
--   MESSAGES_VIEW: 'messages:read',
--   MESSAGES_SEND: 'messages:write',
--   ANALYTICS_VIEW: 'analytics:read',
--   AUDIT_VIEW: 'audit:read'
-- }
```

### 1.2 Rooms & Inventory

```sql
-- room_types
CREATE TABLE room_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL, -- Single, Double, Suite, Penthouse
  description TEXT,
  capacity INTEGER NOT NULL,
  base_price DECIMAL(10,2) NOT NULL,
  amenities JSONB DEFAULT '[]', -- [WiFi, AC, TV, Fridge, etc]
  images JSONB DEFAULT '[]', -- Array of {url, alt}
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(location_id, name)
);

-- rooms (Physical room instances)
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  room_number VARCHAR(50) NOT NULL,
  room_type_id UUID NOT NULL REFERENCES room_types(id),
  current_status VARCHAR(20) DEFAULT 'clean', -- clean, dirty, maintenance, occupied
  last_cleaned TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  floor_number INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(location_id, room_number)
);

-- room_status_history (Audit trail)
CREATE TABLE room_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  old_status VARCHAR(20),
  new_status VARCHAR(20) NOT NULL,
  changed_by UUID REFERENCES users(id),
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 1.3 Reservations & Guests

```sql
-- guests (CRM)
CREATE TABLE guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  phone VARCHAR(20),
  email VARCHAR(255),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100),
  middle_name VARCHAR(100),
  date_of_birth DATE,
  nationality VARCHAR(100),
  id_type VARCHAR(50), -- Passport, Driver License, NIN
  id_number VARCHAR(100),
  preferences JSONB DEFAULT '{}', -- {roomType, floor, earlyCheckIn, etc}
  total_stays INTEGER DEFAULT 0,
  total_spent DECIMAL(12,2) DEFAULT 0,
  last_visit TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(location_id, phone),
  UNIQUE(location_id, email)
);

-- reservations
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  guest_id UUID NOT NULL REFERENCES guests(id),
  room_id UUID REFERENCES rooms(id),
  room_type_id UUID NOT NULL REFERENCES room_types(id),
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  num_guests INTEGER DEFAULT 1,
  status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, checked_in, checked_out, cancelled
  total_price DECIMAL(10,2) NOT NULL,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) NOT NULL,
  special_requests TEXT,
  cancellation_reason TEXT,
  source VARCHAR(50), -- direct, phone, email, web_booking
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- reservation_items (For itemized breakdown)
CREATE TABLE reservation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  description VARCHAR(255),
  quantity DECIMAL(10,2),
  unit_price DECIMAL(10,2),
  amount DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Check-in/Check-out Events
CREATE TABLE check_in_out_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id UUID NOT NULL REFERENCES reservations(id),
  event_type VARCHAR(20) NOT NULL, -- check_in, check_out
  created_by UUID NOT NULL REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 1.4 Restaurant & POS

```sql
-- menu_categories
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(location_id, name)
);

-- menu_items
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  cost DECIMAL(10,2), -- For profit tracking
  is_available BOOLEAN DEFAULT TRUE,
  image_url VARCHAR(500),
  ingredients JSONB DEFAULT '[]', -- For inventory deduction
  calories INTEGER,
  allergens JSONB DEFAULT '[]',
  preparation_time INTEGER DEFAULT 15, -- minutes
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- restaurant_orders (POS Orders)
CREATE TABLE restaurant_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  order_number VARCHAR(50) NOT NULL,
  table_number VARCHAR(50),
  reservation_id UUID REFERENCES reservations(id),
  status VARCHAR(20) DEFAULT 'pending', -- pending, preparing, ready, served, paid, cancelled
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50), -- cash, card, room_charge
  notes TEXT,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  UNIQUE(location_id, order_number)
);

-- order_items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES restaurant_orders(id) ON DELETE CASCADE,
  menu_item_id UUID NOT NULL REFERENCES menu_items(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  special_instructions TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- pending, preparing, ready, served
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 1.5 Inventory Management

```sql
-- inventory_items
CREATE TABLE inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL, -- food, beverage, supplies, linens
  unit VARCHAR(20) NOT NULL, -- kg, liters, pieces, boxes
  current_quantity DECIMAL(10,2) DEFAULT 0,
  minimum_threshold DECIMAL(10,2),
  maximum_capacity DECIMAL(10,2),
  unit_cost DECIMAL(10,2),
  supplier VARCHAR(255),
  last_restocked TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(location_id, name)
);

-- inventory_logs (Audit trail)
CREATE TABLE inventory_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID NOT NULL REFERENCES inventory_items(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES locations(id),
  transaction_type VARCHAR(20) NOT NULL, -- in, out, adjustment, count
  quantity_change DECIMAL(10,2) NOT NULL,
  reference_id UUID, -- reservation_id, order_id, purchase_id
  reference_type VARCHAR(50), -- reservation, pos_order, purchase
  notes TEXT,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 1.6 Staff & Payroll

```sql
-- staff
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  position VARCHAR(100) NOT NULL,
  department VARCHAR(100), -- Front Desk, Housekeeping, Kitchen, etc
  salary_amount DECIMAL(10,2),
  salary_period VARCHAR(20) DEFAULT 'monthly', -- monthly, bi-weekly
  bank_account_encrypted VARCHAR(500), -- Encrypted
  bank_name VARCHAR(100),
  contract_start_date DATE,
  contract_end_date DATE,
  emergency_contact VARCHAR(255),
  emergency_phone VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, location_id)
);

-- attendance
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES locations(id),
  date DATE NOT NULL,
  check_in_time TIME,
  check_out_time TIME,
  status VARCHAR(20) DEFAULT 'absent', -- present, absent, late, half_day, leave
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(staff_id, date)
);

-- payslips
CREATE TABLE payslips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id UUID NOT NULL REFERENCES staff(id),
  location_id UUID NOT NULL REFERENCES locations(id),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  gross_salary DECIMAL(10,2) NOT NULL,
  deductions JSONB DEFAULT '{}', -- {tax, loan, health_insurance, etc}
  net_salary DECIMAL(10,2) NOT NULL,
  payment_date DATE,
  status VARCHAR(20) DEFAULT 'draft', -- draft, approved, paid
  generated_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 1.7 Housekeeping

```sql
-- housekeeping_tasks
CREATE TABLE housekeeping_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES staff(id),
  task_type VARCHAR(50) NOT NULL, -- daily_clean, post_checkout, maintenance
  status VARCHAR(20) DEFAULT 'pending', -- pending, in_progress, completed, cancelled
  priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high
  due_date TIMESTAMP NOT NULL,
  completed_at TIMESTAMP,
  completion_notes TEXT,
  issues_found JSONB DEFAULT '[]', -- [{description, photo_urls}]
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 1.8 Internal Messaging

```sql
-- message_channels
CREATE TABLE message_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(20) NOT NULL, -- group, direct
  members UUID[] NOT NULL, -- Array of user IDs
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(location_id, name)
);

-- messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID NOT NULL REFERENCES message_channels(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  attachments JSONB DEFAULT '[]', -- [{url, type, filename}]
  is_edited BOOLEAN DEFAULT FALSE,
  edited_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- message_read_receipts
CREATE TABLE message_read_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  read_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(message_id, user_id)
);
```

### 1.9 Audit & Compliance

```sql
-- audit_logs
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id),
  user_id UUID NOT NULL REFERENCES users(id),
  action VARCHAR(100) NOT NULL, -- create, update, delete, login, etc
  entity_type VARCHAR(50) NOT NULL, -- reservations, rooms, guests, etc
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_audit_logs_location ON audit_logs(location_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Create indexes for common queries
CREATE INDEX idx_reservations_location_dates ON reservations(location_id, check_in_date, check_out_date);
CREATE INDEX idx_reservations_room ON reservations(room_id, status);
CREATE INDEX idx_rooms_location_status ON rooms(location_id, current_status);
CREATE INDEX idx_guests_location_phone ON guests(location_id, phone);
CREATE INDEX idx_inventory_logs_item ON inventory_logs(item_id, created_at);
CREATE INDEX idx_attendance_staff_date ON attendance(staff_id, date);
```

### 1.10 Row-Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
-- ... (all tables)

-- Example RLS Policies

-- Users can only see their own organization's locations
CREATE POLICY locations_org_isolation
  ON locations FOR SELECT
  USING (org_id = (SELECT org_id FROM users WHERE id = auth.uid()));

-- Users can only see reservations in their location(s)
CREATE POLICY reservations_location_isolation
  ON reservations FOR SELECT
  USING (
    location_id IN (
      SELECT location_id FROM users WHERE id = auth.uid()
    )
  );

-- Super Admin bypass (via special role check)
CREATE POLICY super_admin_bypass
  ON reservations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM roles r
      JOIN users u ON u.role_id = r.id
      WHERE u.id = auth.uid()
      AND r.name = 'Super Admin'
    )
  );
```

---

## 2. API ENDPOINT SPECIFICATIONS

### 2.1 Authentication Endpoints

```typescript
// POST /api/auth/signup
{
  email: "manager@hotel.com",
  password: "secure_password",
  fullName: "John Doe",
  organizationName: "Grand Bohabs"
}
// Returns: { user, session, organization }

// POST /api/auth/login
{
  email: "manager@hotel.com",
  password: "password"
}
// Returns: { user, session }

// POST /api/auth/logout
// Returns: { success: true }

// POST /api/auth/refresh
// Returns: { session }

// GET /api/auth/me
// Returns: { user, organization, location, role, permissions }
```

### 2.2 Room Management Endpoints

```typescript
// GET /api/locations/:locationId/rooms
// Query: ?status=clean&roomTypeId=uuid
// Returns: Room[]

// POST /api/locations/:locationId/rooms
{
  roomNumber: "101",
  roomTypeId: "uuid",
  floorNumber: 1
}
// Returns: Room

// PATCH /api/rooms/:roomId
{
  currentStatus: "clean",
  notes: "Minor damage to lamp"
}
// Returns: Room

// DELETE /api/rooms/:roomId
// Returns: { success: true }

// GET /api/locations/:locationId/room-availability
// Query: ?checkIn=2026-02-10&checkOut=2026-02-15&roomTypeId=uuid
// Returns: { available: boolean, availableRooms: Room[] }
```

### 2.3 Reservation Endpoints

```typescript
// POST /api/locations/:locationId/reservations
{
  guestId: "uuid",
  roomTypeId: "uuid",
  roomId: "uuid", // optional - specific room
  checkInDate: "2026-02-10",
  checkOutDate: "2026-02-15",
  numGuests: 2,
  specialRequests: "High floor preferred",
  discountAmount: 50
}
// Returns: { reservation, pricingBreakdown }

// GET /api/locations/:locationId/reservations
// Query: ?status=confirmed&checkInDate=2026-02-10
// Returns: Reservation[]

// GET /api/reservations/:reservationId
// Returns: Reservation with guest & room details

// PATCH /api/reservations/:reservationId
{
  status: "checked_in",
  roomId: "uuid" // can reassign room
}
// Returns: Reservation

// POST /api/reservations/:reservationId/cancel
{
  reason: "Guest requested"
}
// Returns: Reservation (cancelled)

// POST /api/reservations/:reservationId/check-in
// Returns: CheckInEvent

// POST /api/reservations/:reservationId/check-out
{
  damageReports: []
}
// Returns: CheckOutEvent
```

### 2.4 Guest Management Endpoints

```typescript
// POST /api/locations/:locationId/guests
{
  firstName: "John",
  lastName: "Doe",
  phone: "+2348012345678",
  email: "john@example.com",
  nationality: "NG",
  idType: "Passport",
  idNumber: "A12345678"
}
// Returns: Guest

// GET /api/locations/:locationId/guests
// Query: ?search=John&limit=20
// Returns: Guest[]

// GET /api/guests/:guestId
// Returns: Guest with stay history

// PATCH /api/guests/:guestId
{
  preferences: { roomType: "suite", floor: 3 }
}
// Returns: Guest

// POST /api/guests/:guestId1/merge/:guestId2
// Merge duplicate guests
// Returns: { success: true, mergedGuestId: guestId1 }
```

### 2.5 Restaurant/POS Endpoints

```typescript
// POST /api/locations/:locationId/orders
{
  tableNumber: "5",
  reservationId: "uuid", // optional - room charge
  items: [
    { menuItemId: "uuid", quantity: 2, specialInstructions: "Extra sauce" }
  ]
}
// Returns: Order

// GET /api/locations/:locationId/orders
// Query: ?status=pending&createdDate=2026-02-02
// Returns: Order[]

// PATCH /api/orders/:orderId
{
  status: "served"
}
// Returns: Order

// POST /api/orders/:orderId/payment
{
  paymentMethod: "card",
  amountPaid: 25000
}
// Returns: { success: true, change: 0 }

// GET /api/locations/:locationId/kitchen-queue
// Real-time order queue for kitchen display
// Returns: OrderItem[] (pending/preparing only)

// POST /api/order-items/:itemId/status
{
  status: "ready"
}
// Returns: OrderItem
```

### 2.6 Inventory Endpoints

```typescript
// POST /api/locations/:locationId/inventory-items
{
  name: "Olive Oil",
  category: "food",
  unit: "liters",
  minimumThreshold: 5,
  unitCost: 5000
}
// Returns: InventoryItem

// GET /api/locations/:locationId/inventory
// Query: ?category=food&status=low_stock
// Returns: InventoryItem[]

// POST /api/inventory/:itemId/stock-movement
{
  transactionType: "in", // in, out, adjustment
  quantity: 10,
  referenceType: "purchase",
  notes: "Weekly stock replenishment"
}
// Returns: InventoryLog

// GET /api/inventory/:itemId/history
// Returns: InventoryLog[]

// GET /api/locations/:locationId/low-stock-alerts
// Returns: InventoryItem[] (below threshold)
```

### 2.7 Staff & Payroll Endpoints

```typescript
// POST /api/locations/:locationId/staff
{
  userId: "uuid",
  position: "Front Desk Manager",
  department: "Front Desk",
  salaryAmount: 50000,
  bankAccount: "1234567890", // encrypted
  bankName: "Access Bank"
}
// Returns: Staff

// GET /api/locations/:locationId/staff
// Returns: Staff[]

// POST /api/staff/:staffId/attendance
{
  date: "2026-02-02",
  checkInTime: "09:00",
  checkOutTime: "17:00",
  status: "present"
}
// Returns: Attendance

// GET /api/staff/:staffId/payslip
// Query: ?month=2026-02
// Returns: Payslip

// POST /api/staff/:staffId/payslip/generate
{
  periodStart: "2026-02-01",
  periodEnd: "2026-02-28"
}
// Returns: Payslip
```

---

## 3. FRONTEND COMPONENT STRUCTURE

```
/components
├── /ui (shadcn components)
│   ├── button.tsx
│   ├── card.tsx
│   ├── form.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── table.tsx
│   ├── modal.tsx
│   ├── tabs.tsx
│   └── ... (other shadcn)
├── /layout
│   ├── Sidebar.tsx
│   ├── TopNav.tsx
│   ├── Layout.tsx
│   └── Breadcrumbs.tsx
├── /auth
│   ├── LoginForm.tsx
│   ├── SignUpForm.tsx
│   └── ProtectedRoute.tsx
├── /rooms
│   ├── RoomTable.tsx
│   ├── RoomForm.tsx
│   ├── RoomTypeForm.tsx
│   ├── RoomAvailabilityCalendar.tsx
│   └── RoomStatusBadge.tsx
├── /reservations
│   ├── ReservationForm.tsx
│   ├── ReservationTable.tsx
│   ├── ReservationDetailModal.tsx
│   ├── PriceBreakdown.tsx
│   └── CheckInOutForm.tsx
├── /guests
│   ├── GuestSearch.tsx
│   ├── GuestForm.tsx
│   ├── GuestDetailModal.tsx
│   ├── GuestHistory.tsx
│   └── MergeDuplicates.tsx
├── /dashboard
│   ├── Dashboard.tsx
│   ├── KPICards.tsx
│   ├── OccupancyChart.tsx
│   ├── RevenueChart.tsx
│   └── UpcomingEvents.tsx
├── /pos
│   ├── OrderForm.tsx
│   ├── KitchenQueue.tsx
│   ├── PaymentForm.tsx
│   └── OrderHistory.tsx
├── /inventory
│   ├── InventoryTable.tsx
│   ├── StockMovement.tsx
│   ├── LowStockAlerts.tsx
│   └── InventoryHistory.tsx
├── /staff
│   ├── StaffTable.tsx
│   ├── StaffForm.tsx
│   ├── AttendanceTracker.tsx
│   └── PayrollForm.tsx
├── /roles
│   ├── RoleTable.tsx
│   ├── RoleForm.tsx
│   ├── PermissionSelector.tsx
│   └── RoleDetailModal.tsx
└── /common
    ├── Loading.tsx
    ├── ErrorBoundary.tsx
    ├── DataTable.tsx
    └── EmptyState.tsx

/app
├── layout.tsx
├── page.tsx (homepage/redirect)
├── /auth
│   ├── /login
│   ├── /signup
│   └── /forgot-password
├── /(protected)
│   ├── /dashboard
│   ├── /rooms
│   ├── /reservations
│   ├── /guests
│   ├── /pos
│   ├── /inventory
│   ├── /staff
│   ├── /payroll
│   ├── /messages
│   ├── /housekeeping
│   ├── /roles
│   ├── /settings
│   └── /reports
└── /api
    ├── /auth
    ├── /locations
    ├── /rooms
    ├── /reservations
    ├── /guests
    ├── /orders
    ├── /inventory
    ├── /staff
    └── /audit

/lib
├── supabase.ts (Supabase client config)
├── auth.ts (Auth utilities)
├── api.ts (API client)
├── types.ts (TypeScript interfaces)
├── constants.ts (PERMISSIONS, STATUSES, etc)
├── utils.ts (Helper functions)
└── validators.ts (Form validation schemas)

/hooks
├── useAuth.ts
├── useLocation.ts
├── useReservations.ts
├── useGuests.ts
├── useRooms.ts
└── ... (domain-specific hooks)

/store
├── authStore.ts (or use Zustand)
├── locationStore.ts
└── uiStore.ts (for modals, toasts, etc)
```

---

## 4. STATE MANAGEMENT PATTERNS

### 4.1 Authentication State

```typescript
// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    // Check session on mount
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session?.user) {
        setUser(data.session.user);
        fetchUserPermissions(data.session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchUserPermissions(session.user.id);
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  async function fetchUserPermissions(userId: string) {
    const { data } = await supabase
      .from('users')
      .select('role_id, roles(permissions)')
      .eq('id', userId)
      .single();
    
    if (data?.roles?.permissions) {
      setPermissions(data.roles.permissions);
    }
  }

  return { user, loading, permissions };
}
```

### 4.2 Data Fetching with SWR

```typescript
// hooks/useReservations.ts
import useSWR from 'swr';
import { fetcher } from '@/lib/api';

export function useReservations(locationId: string, filters = {}) {
  const query = new URLSearchParams(filters).toString();
  const { data, error, isLoading, mutate } = useSWR(
    locationId ? `/api/locations/${locationId}/reservations?${query}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    reservations: data || [],
    isLoading,
    isError: !!error,
    mutate
  };
}
```

### 4.3 Form State Management

```typescript
// Use React Hook Form for all forms
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reservationSchema } from '@/lib/validators';

export function ReservationForm() {
  const form = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guestId: '',
      checkInDate: '',
      checkOutDate: '',
      specialRequests: ''
    }
  });

  async function onSubmit(data) {
    const response = await fetch('/api/reservations', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    // Handle response
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

---

## 5. SECURITY IMPLEMENTATION

### 5.1 API Route Protection

```typescript
// lib/auth.ts
import { createClient } from '@supabase/supabase-js';

export async function protectedRoute(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  // Get token from Authorization header
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return { status: 401, body: { error: 'Unauthorized' } };
  }

  // Verify token
  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    return { status: 401, body: { error: 'Invalid token' } };
  }

  return { user: data.user };
}

// app/api/reservations/route.ts
import { protectedRoute } from '@/lib/auth';

export async function POST(req: Request) {
  const auth = await protectedRoute(req);
  if (auth.status) return new Response(auth.body, { status: auth.status });

  const { user } = auth;
  const body = await req.json();

  // Create reservation
  // Verify user has permission to book
  // ...
}
```

### 5.2 Input Validation

```typescript
// lib/validators.ts
import { z } from 'zod';

export const reservationSchema = z.object({
  guestId: z.string().uuid('Invalid guest ID'),
  roomTypeId: z.string().uuid('Invalid room type ID'),
  checkInDate: z.string().refine(
    date => new Date(date) > new Date(),
    'Check-in must be in future'
  ),
  checkOutDate: z.string(),
  specialRequests: z.string().optional()
}).refine(
  data => new Date(data.checkOutDate) > new Date(data.checkInDate),
  {
    message: 'Check-out must be after check-in',
    path: ['checkOutDate']
  }
);
```

### 5.3 Encryption for Sensitive Data

```typescript
// lib/encryption.ts
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;

export function encryptField(plaintext: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  
  let encrypted = cipher.update(plaintext, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  
  return iv.toString('hex') + ':' + encrypted;
}

export function decryptField(encrypted: string): string {
  const [iv, ciphertext] = encrypted.split(':');
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    Buffer.from(iv, 'hex')
  );
  
  let decrypted = decipher.update(ciphertext, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  
  return decrypted;
}
```

---

## 6. PERFORMANCE OPTIMIZATION

### 6.1 Database Query Optimization

```sql
-- Add indexes for common queries
CREATE INDEX idx_reservations_location_status 
  ON reservations(location_id, status);

CREATE INDEX idx_rooms_location_status 
  ON rooms(location_id, current_status);

CREATE INDEX idx_guests_location 
  ON guests(location_id);

-- For reservation availability checks
CREATE INDEX idx_reservations_date_range 
  ON reservations(room_id, check_in_date, check_out_date)
  WHERE status NOT IN ('cancelled');
```

### 6.2 Caching Strategy

```typescript
// Use SWR with specific revalidation
useSWR(key, fetcher, {
  dedupingInterval: 60000, // 1 minute
  focusThrottleInterval: 300000, // 5 minutes
  revalidateOnFocus: false,
  revalidateOnReconnect: true
});

// Cache frequently accessed data
const cache = new Map();
export async function getCachedRoomAvailability(locationId, dates) {
  const key = `availability_${locationId}_${dates}`;
  if (cache.has(key)) {
    return cache.get(key);
  }
  
  const data = await fetchRoomAvailability(locationId, dates);
  cache.set(key, data);
  
  // Invalidate cache after 5 minutes
  setTimeout(() => cache.delete(key), 5 * 60 * 1000);
  
  return data;
}
```

### 6.3 Image Optimization

```typescript
// Use Next.js Image component
import Image from 'next/image';

export function RoomTypeImage({ room }) {
  return (
    <Image
      src={room.imageUrl}
      alt={room.name}
      width={300}
      height={200}
      priority={false}
      placeholder="blur"
      blurDataURL={room.blurDataUrl}
    />
  );
}
```

---

## 7. DEPLOYMENT CHECKLIST

- [ ] Environment variables configured (Vercel)
- [ ] Database backups automated
- [ ] SSL certificates valid
- [ ] Rate limiting configured
- [ ] CORS policies set
- [ ] CSRF tokens implemented
- [ ] Monitoring/Sentry configured
- [ ] Error pages created (404, 500)
- [ ] Performance budget set
- [ ] Security headers configured
- [ ] Database connection pooling active
- [ ] CDN cache headers set
- [ ] Logging configured (error tracking)
- [ ] Uptime monitoring active
- [ ] Incident response plan documented

---

## 8. QUICK START

```bash
# 1. Create Supabase project
# 2. Run migrations from SQL scripts

npm install
npm run dev

# Database migrations
supabase migration up

# Seed data
node scripts/seed-data.js

# Run tests
npm test

# Deploy
npm run build
vercel deploy --prod
```

---

**End of Technical Specifications**
