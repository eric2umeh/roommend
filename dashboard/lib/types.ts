// Roommend Type Definitions

// Organization & Multi-tenancy
export interface Organization {
  id: string
  name: string
  email: string
  phone?: string
  country: string
  currency: string
  timezone: string
  logo_url?: string
  website?: string
  subscription_tier: 'free' | 'pro' | 'enterprise'
  max_users: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Location {
  id: string
  organization_id: string
  name: string
  address?: string
  city?: string
  state?: string
  country: string
  phone?: string
  email?: string
  check_in_time: string
  check_out_time: string
  currency: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Users & RBAC
export interface User {
  id: string
  organization_id: string
  email: string
  password_hash: string
  first_name: string
  last_name: string
  phone?: string
  avatar_url?: string
  role_id: string
  is_active: boolean
  last_login?: string
  created_at: string
  updated_at: string
}

export interface Role {
  id: string
  organization_id: string
  name: string
  description?: string
  permissions: string[]
  is_system_role: boolean
  created_at: string
  updated_at: string
}

// Rooms & Inventory
export interface RoomType {
  id: string
  location_id: string
  name: string
  capacity: number
  base_price_naira: number
  amenities: string[]
  description?: string
  image_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Room {
  id: string
  location_id: string
  room_type_id: string
  room_number: string
  floor: number
  status: 'clean' | 'dirty' | 'maintenance' | 'occupied'
  notes?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Guests
export interface Guest {
  id: string
  organization_id: string
  email?: string
  phone?: string
  first_name: string
  last_name: string
  date_of_birth?: string
  gender?: string
  country?: string
  id_type?: string
  id_number?: string
  preferences: Record<string, any>
  total_stays: number
  total_spent_naira: number
  is_vip: boolean
  created_at: string
  updated_at: string
}

// Reservations
export interface Reservation {
  id: string
  location_id: string
  guest_id: string
  room_id: string
  check_in_date: string
  check_out_date: string
  status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
  number_of_guests: number
  total_price_naira: number
  notes?: string
  created_by: string
  created_at: string
  updated_at: string
}

// Restaurant & POS
export interface MenuCategory {
  id: string
  location_id: string
  name: string
  display_order: number
  is_active: boolean
  created_at: string
}

export interface MenuItem {
  id: string
  menu_category_id: string
  name: string
  description?: string
  price_naira: number
  is_available: boolean
  is_vegetarian: boolean
  image_url?: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  location_id: string
  reservation_id?: string
  status: 'pending' | 'preparing' | 'served' | 'paid'
  total_naira: number
  payment_method?: string
  is_room_charged: boolean
  created_by: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  menu_item_id: string
  quantity: number
  unit_price_naira: number
  subtotal_naira: number
  special_notes?: string
}

// Inventory
export interface InventoryItem {
  id: string
  location_id: string
  name: string
  category: string
  unit: string
  quantity_on_hand: number
  minimum_quantity: number
  unit_cost_naira: number
  supplier?: string
  last_restocked?: string
  created_at: string
  updated_at: string
}

// Staff & Payroll
export interface StaffPayroll {
  id: string
  user_id: string
  location_id: string
  salary_naira: number
  bank_account?: string
  bank_code?: string
  employment_date?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Payslip {
  id: string
  staff_payroll_id: string
  period_start: string
  period_end: string
  base_salary_naira: number
  deductions_naira: number
  bonuses_naira: number
  net_amount_naira: number
  status: 'pending' | 'approved' | 'paid'
  created_at: string
}

// Housekeeping
export interface HousekeepingTask {
  id: string
  location_id: string
  room_id?: string
  assigned_to?: string
  task_type: 'cleaning' | 'maintenance' | 'inspection'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  status: 'pending' | 'in_progress' | 'completed'
  description?: string
  due_date?: string
  completed_at?: string
  created_at: string
}

// Messaging
export interface MessageGroup {
  id: string
  organization_id: string
  name: string
  created_by: string
  is_archived: boolean
  created_at: string
}

export interface Message {
  id: string
  group_id: string
  sender_id: string
  content: string
  file_url?: string
  read_at?: string
  created_at: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Dashboard Stats
export interface DashboardStats {
  occupancy_rate: number
  total_revenue_naira: number
  pending_reservations: number
  rooms_status: {
    clean: number
    dirty: number
    maintenance: number
    occupied: number
  }
  staff_count: number
  total_guests: number
}

// Pricing Constants (NGN)
export const PRICING_NGN = {
  FREE_TIER_USERS: 5,
  FREE_TIER_MAX_LOCATIONS: 1,
  PRO_MONTHLY: 163_350, // ₦163,350 (approx $99 USD)
  ENTERPRISE_MONTHLY: 'Custom',
  EXTRA_USER_MONTHLY: 16_500, // ₦16,500 per additional user
}
