# ROOMMEND - Detailed Project Plan & Epics Breakdown
**Prepared by:** Eric  
**Date:** February 2, 2026  
**Sprint Structure:** 2-week sprints  
**MVP Timeline:** 8 weeks (Weeks 1-8)  

---

## PROJECT STRUCTURE

### Phase 1: MVP Admin Dashboard (8 Weeks)

---

## EPIC 1: PROJECT FOUNDATION & INFRASTRUCTURE
**Status:** BACKLOG  
**Priority:** P0 (Blocker)  
**Sprint:** Week 1  

### Story 1.1: Development Environment Setup
- [ ] Next.js 16 project initialization
- [ ] Supabase project creation + configuration
- [ ] Environment variables setup
- [ ] TypeScript configuration
- [ ] ESLint + Prettier setup

### Story 1.2: Authentication & Authorization System
- [ ] Supabase Auth integration
- [ ] JWT token management
- [ ] Super Admin role bootstrapping
- [ ] Login/logout UI components
- [ ] Password reset flow
- **Acceptance Criteria:**
  - ✅ User can sign up/login
  - ✅ Tokens auto-refresh
  - ✅ Protected routes work

### Story 1.3: Dynamic Role-Based Access Control (RBAC)
- [ ] Roles table schema
- [ ] Permissions schema (JSON-based)
- [ ] Role creation/edit/delete UI (Admin only)
- [ ] Permission assignment UI
- [ ] Middleware to enforce RBAC
- **Roles to support:**
  - Super Admin (full access)
  - Organization Admin (org-wide access)
  - Location Manager (location-specific)
  - Front Desk Staff (check-in/out, reservations)
  - Housekeeping Staff (room status)
  - Kitchen Staff (orders only)
  - Account Manager (finance/payroll)

### Story 1.4: Design System & UI Components
- [ ] Shadcn/ui installation
- [ ] Tailwind CSS v4 configuration
- [ ] Design tokens (colors, spacing, typography)
- [ ] Custom component library (forms, tables, modals)
- [ ] Dark mode toggle (optional for Phase 1)
- [ ] Responsive breakpoints verification

### Story 1.5: Mock Data Generation
- [ ] Seed script for test organizations
- [ ] Test user accounts (all roles)
- [ ] Sample rooms (20-50 rooms)
- [ ] Sample guests (50-100 guests)
- [ ] Sample reservations (past, current, future)
- [ ] Sample restaurant orders

### Story 1.6: Navigation & Layout Shell
- [ ] Main dashboard layout component
- [ ] Sidebar navigation
- [ ] Top navigation bar with user menu
- [ ] Breadcrumb navigation
- [ ] Role-based menu visibility
- [ ] Mobile-responsive navigation

---

## EPIC 2: ROOMS & INVENTORY MANAGEMENT (Hotel)
**Status:** BACKLOG  
**Priority:** P1 (Core Feature)  
**Sprint:** Weeks 2-3  

### Story 2.1: Room Types Management
- [ ] Room types CRUD (Create, Read, Update, Delete)
- [ ] Capacity configuration
- [ ] Base pricing rules
- [ ] Amenities tagging system
- [ ] Bulk import room types
- **Database Tables:** room_types
- **API Endpoints:**
  - `GET /api/locations/:id/room-types`
  - `POST /api/locations/:id/room-types`
  - `PATCH /api/room-types/:id`
  - `DELETE /api/room-types/:id`

### Story 2.2: Room Instance Management
- [ ] Room CRUD operations
- [ ] Room number generation/bulk create
- [ ] Room assignment to room type
- [ ] Room status tracking (clean, dirty, maintenance, occupied)
- [ ] Last cleaned timestamp
- **Database Tables:** rooms
- **UI Components:**
  - Room table view with filters
  - Room detail modal
  - Bulk operations panel

### Story 2.3: Room Status Workflow
- [ ] Status update UI
- [ ] Status history tracking
- [ ] Mark room as "clean" / "dirty" / "maintenance"
- [ ] Prevent operations on unavailable rooms
- [ ] Real-time status updates (Supabase Realtime)
- **Validations:**
  - Cannot check-in to dirty room
  - Cannot book maintenance room
  - Housekeeping can only update status if assigned

### Story 2.4: Room Availability Calculation
- [ ] Check room availability for date range
- [ ] Prevent double-booking
- [ ] Consider room status + reservations
- [ ] Availability calendar view
- [ ] Bulk availability check API
- **Performance:** < 100ms response

---

## EPIC 3: RESERVATIONS & BOOKING SYSTEM
**Status:** BACKLOG  
**Priority:** P1 (Core Feature)  
**Sprint:** Weeks 3-4  

### Story 3.1: Manual Booking Form (Front Desk)
- [ ] Reservation form UI
- [ ] Guest selection/creation
- [ ] Check-in/out date pickers
- [ ] Room type selection with availability filter
- [ ] Length of stay auto-calculation
- [ ] Special requests field
- **Form Validation:**
  - Check-out must be after check-in
  - At least 1-day stay
  - Guest name required

### Story 3.2: Price Calculation Engine
- [ ] Base rate calculation (room type × nights)
- [ ] Seasonal pricing (future phase, basic for MVP)
- [ ] Discount application
- [ ] Tax calculation (configurable per org)
- [ ] Total price breakdown display
- **Acceptance Criteria:**
  - ✅ Price updates in real-time as dates change
  - ✅ Tax calculated based on config
  - ✅ Clear itemized breakdown

### Story 3.3: Conflict Detection & Booking Logic
- [ ] Query overlapping reservations
- [ ] Prevent simultaneous bookings
- [ ] Handle check-in/out same-day edge case
- [ ] Booking confirmation UI
- [ ] Booking success notification
- **Database Transaction:** Ensure atomic booking

### Story 3.4: Reservation Management
- [ ] View reservations calendar
- [ ] View reservations list (filterable)
- [ ] Reservation detail modal
- [ ] Modify reservation (dates, room, guest)
- [ ] Cancel reservation with reason
- [ ] Generate confirmation receipt (PDF optional)
- **Statuses:** pending → confirmed → checked_in → checked_out

### Story 3.5: Check-in/Check-out Workflow
- [ ] Quick check-in button
- [ ] Verify guest ID
- [ ] Update room status to "occupied"
- [ ] Generate room key/access info
- [ ] Check-out form (damage assessment)
- [ ] Mark room as "dirty" post-checkout
- **Real-time:** Update housekeeping queue immediately

---

## EPIC 4: GUEST MANAGEMENT & CRM
**Status:** BACKLOG  
**Priority:** P1 (Core Feature)  
**Sprint:** Week 4  

### Story 4.1: Guest Profiles
- [ ] Guest schema with deduplication rules
- [ ] Phone + Email uniqueness per location
- [ ] Guest CRUD operations
- [ ] Photo/ID storage
- [ ] Contact preferences
- **Deduplication:** Flag likely duplicates (same phone/email)

### Story 4.2: Guest Search & Lookup
- [ ] Search by name/phone/email
- [ ] Offline-first search (local caching)
- [ ] Search results filtering
- [ ] Quick-add new guest from search
- [ ] Search performance optimization (indexing)
- **Performance:** < 200ms search

### Story 4.3: Guest History & Preferences
- [ ] Stay history per guest
- [ ] Total visits counter
- [ ] Previous room preferences
- [ ] Dietary restrictions / special needs
- [ ] Preferred arrival time
- [ ] Billing notes

### Story 4.4: Guest Communication Log
- [ ] Log emails/calls to guest
- [ ] Merge duplicate guest profiles
- [ ] Guest profile archiving
- [ ] Export guest data (CSV)
- [ ] GDPR data deletion request handling

---

## EPIC 5: RESTAURANT & POS SYSTEM
**Status:** BACKLOG  
**Priority:** P2 (Phase 2)  
**Sprint:** Weeks 5-6  

### Story 5.1: Menu Management
- [ ] Menu categories CRUD
- [ ] Menu items CRUD (with images)
- [ ] Item pricing & variants
- [ ] Availability toggle (in-stock / out-of-stock)
- [ ] Inventory linkage (deduct stock on order)
- [ ] Bulk menu import from CSV
- **UI:** Drag-to-reorder categories/items

### Story 5.2: Restaurant Orders (POS)
- [ ] New order creation UI
- [ ] Quick add items from menu
- [ ] Quantity + special instructions
- [ ] Order status tracking (pending → preparing → ready → served)
- [ ] Order total calculation
- [ ] Multiple payment methods support
- **Real-time:** Order queue updates for kitchen

### Story 5.3: Kitchen Order Queue
- [ ] Kitchen display system (KDS)
- [ ] Order prioritization
- [ ] Status updates (order received → preparing → ready)
- [ ] Call/alert when order ready
- [ ] Order completion time tracking
- **Performance:** < 500ms queue updates

### Story 5.4: Bill Splitting & Room Charges
- [ ] Split bill between multiple guests
- [ ] Post charges to guest room bill
- [ ] Multiple payment handling
- [ ] Generate bill receipt
- [ ] Void/refund order (with approval)

---

## EPIC 6: STOCK & INVENTORY MANAGEMENT
**Status:** BACKLOG  
**Priority:** P2 (Phase 2)  
**Sprint:** Week 6  

### Story 6.1: Inventory Item Management
- [ ] Inventory item CRUD
- [ ] Categories (food, beverage, supplies, linens)
- [ ] Stock tracking (quantity, unit)
- [ ] Reorder level configuration
- [ ] Cost per unit
- [ ] Supplier information

### Story 6.2: Stock Movement Tracking
- [ ] Stock in (purchases)
- [ ] Stock out (usage, waste)
- [ ] Inventory adjustments (count correction)
- [ ] Transaction history (audit trail)
- [ ] Auto-deduction from POS orders
- [ ] Manual adjustments with notes

### Story 6.3: Low-Stock Alerts
- [ ] Alert when stock below threshold
- [ ] Email notification to manager
- [ ] Reorder suggestion
- [ ] Dashboard warning indicator
- [ ] Bulk reorder workflow

### Story 6.4: Inventory Valuation & Reports
- [ ] Monthly inventory count
- [ ] Stock valuation (quantity × cost)
- [ ] Inventory variance reporting
- [ ] Export inventory report (Excel)
- [ ] Cycle counting support

---

## EPIC 7: STAFF, USERS & PAYROLL
**Status:** BACKLOG  
**Priority:** P2 (Phase 2)  
**Sprint:** Weeks 7  

### Story 7.1: Staff Account Management
- [ ] Staff CRUD (hire/terminate)
- [ ] Assign roles & permissions
- [ ] Department assignment (front desk, housekeeping, kitchen, etc)
- [ ] Contact information
- [ ] Profile photos
- [ ] First 5 free users (freemium logic)
- **Billing Counter:** Track extra users for pricing

### Story 7.2: Attendance Tracking
- [ ] Check-in/check-out UI
- [ ] Biometric integration (optional Phase 2)
- [ ] Attendance calendar
- [ ] Late/absent marking
- [ ] Monthly attendance report
- [ ] Shift scheduling

### Story 7.3: Payroll Management
- [ ] Salary structure configuration
- [ ] Attendance aggregation
- [ ] Deductions (tax, loans, etc)
- [ ] Payslip generation (PDF)
- [ ] Payroll export to accounting software
- [ ] Payment date scheduling

---

## EPIC 8: HOUSEKEEPING & MAINTENANCE
**Status:** BACKLOG  
**Priority:** P2 (Phase 2)  
**Sprint:** Week 7  

### Story 8.1: Cleaning Task Generation
- [ ] Auto-generate cleaning tasks post-checkout
- [ ] Manual task creation
- [ ] Priority levels (high/medium/low)
- [ ] Task assignment to staff
- [ ] Task due dates
- [ ] Recurring tasks (daily, weekly)

### Story 8.2: Task Workflow & Status Tracking
- [ ] Task status (pending → in-progress → completed)
- [ ] Staff can view assigned tasks
- [ ] Update task status with photos/notes
- [ ] Complete task flow
- [ ] Task history & analytics

---

## EPIC 9: INTERNAL MESSAGING & COLLABORATION
**Status:** BACKLOG  
**Priority:** P3 (Phase 2)  
**Sprint:** Week 8  

### Story 9.1: Staff Messaging
- [ ] Group chat creation
- [ ] Direct messages between staff
- [ ] Message notifications
- [ ] Read receipts
- [ ] File upload capability (images, documents)
- [ ] Message history search
- **Permissions:** Only same-location staff can message

### Story 9.2: Message Moderation
- [ ] Message edit/delete (within 24hrs)
- [ ] Admin can view all messages
- [ ] Message retention policy
- [ ] Export conversations for audit

---

## EPIC 10: DASHBOARD & ANALYTICS
**Status:** BACKLOG  
**Priority:** P1 (Core Feature)  
**Sprint:** Week 8  

### Story 10.1: Operational Dashboard
- [ ] Occupancy rate display
- [ ] Today's check-ins/check-outs
- [ ] Available rooms count
- [ ] Pending housekeeping tasks
- [ ] Recent reservations
- [ ] Key metrics (real-time)

### Story 10.2: Financial Analytics
- [ ] Revenue by room type
- [ ] Average Daily Rate (ADR)
- [ ] Revenue Per Available Room (RevPAR)
- [ ] Restaurant revenue
- [ ] Occupancy chart (last 30 days)
- [ ] Forecast projections (optional)

### Story 10.3: Reports & Exports
- [ ] Daily operations report
- [ ] Monthly summary
- [ ] Export to PDF/Excel
- [ ] Email automated reports
- [ ] Custom date range reports

---

## EPIC 11: SYSTEM SETTINGS & CONFIGURATION
**Status:** BACKLOG  
**Priority:** P3 (Phase 1.5)  
**Sprint:** Week 1-2  

### Story 11.1: Organization Settings
- [ ] Business name & logo
- [ ] Address & contact details
- [ ] Timezone configuration
- [ ] Currency configuration (NGN, USD, etc)
- [ ] Tax configuration (default tax %)
- [ ] Financial year start

### Story 11.2: Location Settings
- [ ] Location details
- [ ] Check-in/check-out times
- [ ] Cancellation policy
- [ ] No-show policy
- [ ] Room numbering scheme
- [ ] Report recipients (email list)

### Story 11.3: Theme & Localization
- [ ] Light/dark mode toggle
- [ ] Language support (English, Yoruba, Hausa - future)
- [ ] Currency display formatting
- [ ] Date format preferences
- [ ] Timezone-based time display

---

## EPIC 12: SECURITY & COMPLIANCE
**Status:** BACKLOG  
**Priority:** P0 (Blocker)  
**Sprint:** Weeks 1, 8  

### Story 12.1: Data Security
- [ ] Row-Level Security (RLS) setup
- [ ] Encryption for sensitive fields
- [ ] API rate limiting
- [ ] CSRF protection
- [ ] XSS prevention

### Story 12.2: Audit Logging
- [ ] Log all user actions
- [ ] Immutable transaction logs
- [ ] Audit trail UI (admin only)
- [ ] Data modification history
- [ ] Export audit logs

### Story 12.3: Backup & Recovery
- [ ] Automated database backups (Supabase)
- [ ] Point-in-time recovery capability
- [ ] Disaster recovery runbook
- [ ] Data retention policies

---

## SPRINT BREAKDOWN

### Sprint 1 (Week 1-2)
**Goal:** Foundation Ready for Testing

**Tasks:**
- Project setup (Next.js, Supabase, Tailwind)
- Authentication & login
- Dynamic RBAC system
- Design system + components
- Mock data generation
- Navigation shell

**Deliverable:** Developers can log in, see mock data, navigate app

**Testing:**
- ✅ Login flow works
- ✅ Mock data populated
- ✅ Navigation responsive on mobile/desktop

---

### Sprint 2 (Week 3-4)
**Goal:** Room & Reservation MVP

**Tasks:**
- Room types & instances CRUD
- Room availability calculation
- Reservation booking form
- Price calculation engine
- Check-in/check-out workflow
- Conflict detection

**Deliverable:** Can book a guest into a room, checkout

**Testing:**
- ✅ Create room type with pricing
- ✅ Book room with multiple date ranges
- ✅ Prevent double-booking
- ✅ Check-in/out updates room status

---

### Sprint 3 (Week 5-6)
**Goal:** Guest Management & Restaurant

**Tasks:**
- Guest CRUD & search
- Guest stay history
- Restaurant menu management
- POS order flow
- Kitchen queue display
- Room charge posting

**Deliverable:** Can create guests, manage menu, take orders

**Testing:**
- ✅ Guest deduplication logic
- ✅ Search performance < 200ms
- ✅ Orders appear in kitchen queue
- ✅ Room charges post correctly

---

### Sprint 4 (Week 7-8)
**Goal:** Inventory, Staff & Analytics

**Tasks:**
- Inventory management
- Stock tracking
- Staff management & attendance
- Payroll foundation
- Housekeeping tasks
- Dashboard analytics

**Deliverable:** MVP feature-complete, ready for Grand Bohabs testing

**Testing:**
- ✅ Inventory levels update on POS orders
- ✅ Low-stock alerts
- ✅ Dashboard shows accurate metrics
- ✅ All happy paths tested

---

## TESTING STRATEGY

### Unit Tests
- Price calculations
- Availability checks
- Role permission logic
- Form validations

### Integration Tests
- Booking flow end-to-end
- Guest + Reservation creation
- Order flow (menu → kitchen → payment)

### User Testing
- Grand Bohabs staff testing (Week 8)
- Collect feedback on UX
- Identify bugs before public launch

### Performance Testing
- Load test with 1000 simultaneous users
- Database query optimization
- API response time validation

---

## DEFINITION OF DONE (For Each Story)

- [ ] Code written & peer reviewed
- [ ] Unit tests passing (min 80% coverage)
- [ ] Integrated with latest main branch
- [ ] Deployed to staging environment
- [ ] Tested on mobile + desktop
- [ ] Accessibility checklist completed (WCAG 2.1 AA)
- [ ] Documentation updated
- [ ] No console errors/warnings
- [ ] Accepted by Product Owner

---

## SUCCESS CRITERIA (MVP)

✅ **Functional Requirements:**
- Can manage rooms & availability
- Can create & manage reservations
- Can manage guests
- Can take restaurant orders
- Can track inventory (basic)
- Can assign & track staff
- Dashboard shows key metrics

✅ **Non-Functional Requirements:**
- Performance: Page load < 1.5s
- Uptime: 99.5% in testing
- Security: No known vulnerabilities
- Responsive: Works on mobile & desktop

✅ **User Satisfaction:**
- Grand Bohabs staff can use without training
- Net Promoter Score ≥ 50
- Zero critical bugs at launch

---

## RISKS & MITIGATION

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Scope creep | High | Strict epic/story boundaries, prioritize MVP |
| Role/permission bugs | High | Comprehensive testing, careful code review |
| Database performance | Medium | Query optimization, indexing from start |
| User adoption | Medium | Excellent onboarding, Grand Bohabs feedback |
| Competitor moves | Medium | Rapid iteration, clear feature roadmap |

---

## STAKEHOLDERS & COMMUNICATION

- **Product Owner:** Eric
- **Dev Lead:** [TBD]
- **Design Lead:** [TBD]
- **QA Lead:** [TBD]
- **Client Contact:** Grand Bohabs Manager

**Sync Meeting:** Weekly sprint planning + demos

---

## GLOSSARY

- **ADR:** Average Daily Rate (total revenue / room nights sold)
- **RevPAR:** Revenue Per Available Room (total revenue / total available rooms)
- **RLS:** Row-Level Security (database-level access control)
- **RBAC:** Role-Based Access Control
- **KDS:** Kitchen Display System
- **POS:** Point of Sale
- **MVP:** Minimum Viable Product
