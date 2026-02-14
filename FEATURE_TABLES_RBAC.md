# Feature: Reusable Data Tables & Role-Based Dashboard

## Branch: feature/tables-and-rbac

## Overview
Implemented a professional reusable data table component with pagination, filtering, and search. Enhanced dashboard with role-based visibility for financial and booking data.

## Changes Made

### New Component
- **DataTable Component** (`/app/components/data-table.tsx`)
  - Reusable for all list pages (rooms, guests, orders, inventory, etc)
  - Features:
    - Pagination (configurable items per page, default 20)
    - Search functionality across searchable columns
    - Multiple filter dropdowns
    - Sortable columns with asc/desc indicators
    - Mobile-responsive (table on desktop, card layout on mobile)
    - TypeScript generic support for any data type

### Updated Pages

#### Rooms Page (`/app/app/rooms/page.tsx`)
- Replaced card-based layout with paginated data table
- Added filters for Floor and Status
- Search by room number
- Displays 20 rooms per page
- Shows room type and pricing alongside inventory

#### Guests Page (`/app/app/guests/page.tsx`)
- Implemented data table with 20 guests per page
- Search by name, email, or phone
- Role-based financial visibility:
  - Admin/Managers: See total_spent_naira column
  - Other roles: Hidden financial data
- Added VIP indicator column

#### Dashboard (`/app/app/page.tsx`)
- Added role-based permission checks
- Housekeepers now ONLY see:
  - Occupancy Rate
  - Pending Tasks
- Managers/Admins see full dashboard:
  - Revenue metrics
  - Active guests
  - Recent reservations list

## Role-Based Visibility Logic

**Housekeepers/Kitchen Staff:**
- ✗ Cannot see: Revenue, Total Spent, Active Guest Count, Recent Reservations
- ✓ Can see: Occupancy Rate, Pending Tasks

**Front Desk:**
- ✓ Can see: Reservations, Guest info, Room Status
- ✗ Cannot see: Financial data

**Admin/Manager:**
- ✓ Can see: Everything

## Technical Implementation
- Used `useAuth()` hook to check `hasPermission()` for specific features
- Conditional rendering based on permissions
- Guest page shows/hides `total_spent_naira` column dynamically
- Dashboard conditionally renders revenue and reservation sections

## Mobile Responsiveness
- DataTable automatically switches to card layout on mobile
- Filters and search remain fully functional
- Pagination works on all screen sizes
- Touch-friendly button sizes

## Files Changed
1. `/app/components/data-table.tsx` - NEW
2. `/app/app/rooms/page.tsx` - Updated to use DataTable
3. `/app/app/guests/page.tsx` - Updated to use DataTable + RBAC
4. `/app/app/page.tsx` - Added RBAC for dashboard visibility

## Testing Checklist
- [ ] Login as Admin - see all dashboard metrics
- [ ] Login as Front Desk - see limited dashboard
- [ ] Login as Housekeeping - see ONLY occupancy and tasks
- [ ] Rooms table - search by room number
- [ ] Rooms table - filter by floor
- [ ] Rooms table - filter by status
- [ ] Rooms pagination - 20 items per page
- [ ] Guests table - search by name/email/phone
- [ ] Guests table - Admin sees Total Spent column
- [ ] Guests table - Housekeeping does NOT see Total Spent
- [ ] Mobile view - tables convert to cards on small screens

## Performance Notes
- DataTable uses useMemo to optimize filtering/sorting
- Pagination prevents rendering 100+ rooms at once
- Mobile card layout is efficient with minimal DOM
