# ROOMMEND - Key Data Flows & User Journeys
**Prepared by:** Eric | **Date:** February 2, 2026

---

## 🔄 MAIN USER FLOWS

### 1. RESERVATION BOOKING FLOW

```
Guest Inquiry (Phone/Email/Walk-in)
    ↓
[Front Desk Staff Opens App]
    ↓
[Search Guest by Phone/Email]
    ├─ Guest Found → Load History
    ├─ Guest Not Found → Create New Guest
    │   ├─ Enter: Name, Phone, Email, ID
    │   └─ Save to guests table
    ↓
[Start New Reservation Form]
    ├─ Select Guest (already loaded)
    ├─ Select Check-in Date
    ├─ Select Check-out Date (triggers availability check)
    ├─ System checks: 
    │   ├─ Conflicts against reservations table
    │   ├─ Room status (not maintenance)
    │   └─ Availability based on room_types
    ├─ System suggests available rooms
    ├─ Staff selects room & room type
    ↓
[PRICING CALCULATION]
    ├─ Base rate = room_type.base_price × nights
    ├─ Taxes = base_rate × location.tax_rate
    ├─ Discounts applied
    ├─ Total = base_rate + taxes - discounts
    ├─ Display breakdown to staff
    └─ Staff confirms price
    ↓
[BOOKING CONFIRMATION]
    ├─ Create reservation record
    ├─ Set status = "confirmed"
    ├─ Emit real-time update (Supabase RT)
    ├─ Show room assignment
    ├─ Print/email confirmation
    └─ Add to guest's history
    ↓
[DATABASE UPDATES]
    reservation_items: INSERT (itemized charges)
    reservations: INSERT (new booking)
    guests: UPDATE (total_stays++, last_visit)
    rooms: UPDATE (status potentially occupied)
    audit_logs: INSERT (who booked, when, what)
    ↓
GUEST SUCCESSFULLY BOOKED ✅
```

---

### 2. CHECK-IN WORKFLOW

```
Guest Arrives at Reception
    ↓
[Staff Opens Reservations List]
    ├─ Filter by today's check-ins
    ├─ Verify guest identity
    └─ Select reservation
    ↓
[CHECK-IN FORM]
    ├─ Confirm guest details
    ├─ Verify room assignment
    ├─ Confirm any special requests
    ├─ Collect mobile number for emergency
    └─ Note any damages/requests
    ↓
[ROOM ASSIGNMENT & ACCESS]
    ├─ Assign room (if not already assigned)
    ├─ Generate/print key card
    ├─ Show amenities & Wi-Fi password
    └─ Provide room service guide
    ↓
[DATABASE UPDATES]
    reservations: UPDATE (status = "checked_in")
    rooms: UPDATE (status = "occupied")
    check_in_out_events: INSERT (event_type = "check_in")
    audit_logs: INSERT (who checked in, timestamp)
    ↓
[REAL-TIME UPDATES]
    → Housekeeping sees room as occupied
    → Front desk sees occupancy updated
    → Kitchen/Staff see any related assignments
    ↓
CHECK-IN COMPLETE ✅
```

---

### 3. CHECK-OUT WORKFLOW

```
Guest Checks Out
    ↓
[Staff Opens Checkout]
    ├─ Search reservation by room or guest
    ├─ Pull up reservation details
    └─ Review stay charges
    ↓
[CHECKOUT ASSESSMENT]
    ├─ Inspect room for damages
    ├─ Document any issues with photos (optional)
    ├─ Apply damage charges if applicable
    ├─ Calculate final bill
    └─ Show itemized breakdown
    ↓
[PAYMENT PROCESSING]
    ├─ Select payment method (cash/card/credit)
    ├─ Process payment
    ├─ Print receipt
    ├─ Collect key card
    └─ Thank guest
    ↓
[POST-CHECKOUT WORKFLOW]
    ├─ Mark reservation as "checked_out"
    ├─ Mark room as "dirty"
    ├─ Trigger housekeeping task generation
    ├─ Update guest's total_spent
    └─ Add review prompt (optional)
    ↓
[DATABASE UPDATES]
    reservations: UPDATE (status = "checked_out")
    reservation_items: INSERT (any damage charges)
    rooms: UPDATE (status = "dirty", last_cleaned = NULL)
    room_status_history: INSERT (old_status, new_status)
    check_in_out_events: INSERT (event_type = "check_out")
    guests: UPDATE (total_spent += payment)
    housekeeping_tasks: INSERT (cleaning task for room)
    audit_logs: INSERT (who checked out, timestamp)
    ↓
[HOUSEKEEPING NOTIFICATION]
    → New task assigned to housekeeping staff
    → Real-time notification sent
    → Task appears in staff's queue
    ↓
CHECKOUT COMPLETE ✅
```

---

### 4. RESTAURANT ORDER FLOW

```
Guest/Staff Orders Food
    ↓
[OPEN NEW ORDER]
    ├─ Select table number (if restaurant)
    ├─ OR select reservation (if room service)
    └─ Scan/select first item
    ↓
[ADD ITEMS FROM MENU]
    ├─ Browse menu by category
    ├─ Select item (real-time stock check)
    ├─ Add quantity
    ├─ Special instructions (no salt, etc)
    ├─ Update running total
    └─ Repeat for all items
    ↓
[PRICE CALCULATION]
    ├─ Sum: item prices × quantity
    ├─ Apply taxes
    ├─ Check for discounts
    └─ Display total
    ↓
[SEND TO KITCHEN]
    ├─ Order created & confirmed
    ├─ Items pushed to kitchen queue
    ├─ Real-time updates to KDS (Kitchen Display System)
    └─ Staff notified: "New order!"
    ↓
[DATABASE UPDATES]
    restaurant_orders: INSERT (status = "pending")
    order_items: INSERT (for each item)
    inventory_logs: INSERT (if auto-deducting stock)
    ↓
[KITCHEN WORKFLOW]
    ├─ Kitchen staff views order on screen
    ├─ Selects "preparing" when starting
    ├─ Updates item status as completed
    ├─ Marks entire order "ready" when done
    └─ Call/alert sent to server
    ↓
[SERVE & COMPLETE]
    ├─ Server collects prepared items
    ├─ Verifies with guest
    ├─ Marks as "served"
    └─ Clears from kitchen queue
    ↓
[PAYMENT]
    ├─ Calculate final bill
    ├─ Apply payment
    ├─ If room charge: add to guest's bill
    ├─ If direct payment: process & close
    └─ Print receipt
    ↓
[DATABASE UPDATES]
    restaurant_orders: UPDATE (status = "paid")
    order_items: UPDATE (status = "served")
    reservations: UPDATE (add charges if room bill)
    audit_logs: INSERT (order completed, timestamp)
    ↓
ORDER COMPLETE ✅
```

---

### 5. INVENTORY STOCK MOVEMENT

```
[STOCK IN - Receiving Delivery]
    ├─ Receive goods
    ├─ Open Inventory → Stock In
    ├─ Select item
    ├─ Enter quantity received
    ├─ Enter cost per unit
    ├─ Verify & confirm
    ↓
    inventory_items: UPDATE (current_quantity += received)
    inventory_logs: INSERT (transaction_type = "in")
    audit_logs: INSERT (who received, quantity, cost)
    ↓

[STOCK OUT - POS Order Auto-Deduction]
    ├─ Restaurant order created
    ├─ System scans order_items
    ├─ For each item with ingredients:
    │   ├─ Deduct ingredient quantity
    │   ├─ Check if below threshold
    │   └─ Alert if critical
    ├─ Update inventory automatically
    ↓
    inventory_items: UPDATE (current_quantity -= used)
    inventory_logs: INSERT (transaction_type = "out")
    ↓

[LOW STOCK ALERT]
    ├─ Check if quantity < minimum_threshold
    ├─ If yes:
    │   ├─ Flag item as "low stock"
    │   ├─ Send notification to manager
    │   ├─ Display warning on dashboard
    │   └─ Suggest reorder
    ↓

[MANUAL ADJUSTMENT]
    ├─ Monthly inventory count
    ├─ Physical count vs system count
    ├─ Record discrepancy
    ├─ Enter adjustment
    ↓
    inventory_items: UPDATE (current_quantity = new_count)
    inventory_logs: INSERT (transaction_type = "adjustment", reason)
    ↓

INVENTORY UPDATED ✅
```

---

### 6. HOUSEKEEPING TASK WORKFLOW

```
[POST-CHECKOUT AUTOMATION]
    ├─ Guest checks out
    ├─ Room status changes to "dirty"
    ├─ System auto-generates cleaning task
    └─ Task assigned based on staff availability
    ↓

[MANUAL TASK CREATION]
    ├─ Manager can create manual tasks
    ├─ Select room
    ├─ Select task type (daily clean, maintenance)
    ├─ Set priority & due date
    ├─ Assign to staff member
    └─ Send notification
    ↓

[TASK ASSIGNMENT]
    ├─ Staff receives notification
    ├─ Task appears in their queue
    ├─ Staff accepts/confirms
    └─ Task marked "in_progress"
    ↓

[DATABASE UPDATES]
    housekeeping_tasks: INSERT/UPDATE
    audit_logs: INSERT (task created/assigned)
    ↓

[TASK COMPLETION]
    ├─ Staff completes cleaning
    ├─ Takes photos of room (optional)
    ├─ Records any issues found
    ├─ Marks task as "completed"
    └─ Updates room status
    ↓

[DATABASE UPDATES]
    housekeeping_tasks: UPDATE (status = "completed")
    rooms: UPDATE (status = "clean", last_cleaned = NOW())
    room_status_history: INSERT
    audit_logs: INSERT
    ↓

[MAINTENANCE ESCALATION]
    ├─ If major issues found during cleaning:
    ├─ Staff can escalate to maintenance
    ├─ Create maintenance task
    ├─ Manager notified
    └─ Room blocked until repairs
    ↓

HOUSEKEEPING COMPLETE ✅
```

---

### 7. PAYROLL WORKFLOW

```
[ATTENDANCE TRACKING]
    ├─ Staff check-in via app (biometric optional)
    ├─ System records check-in time
    ├─ Staff check-out at end of day
    ├─ System records check-out time
    ├─ Calculate hours worked
    └─ Mark as present/absent/late
    ↓

[DATABASE UPDATES]
    attendance: INSERT (date, check_in, check_out, status)
    audit_logs: INSERT (attendance record)
    ↓

[PAYROLL CALCULATION]
    ├─ End of month arrives
    ├─ Generate payroll for period
    ├─ Aggregate attendance records
    ├─ Calculate gross salary
    ├─ Apply deductions (tax, loans, insurance)
    ├─ Calculate net salary
    └─ Generate payslip
    ↓

[DATABASE UPDATES]
    payslips: INSERT (period, gross, deductions, net, status)
    audit_logs: INSERT (payroll generated)
    ↓

[APPROVAL & PAYMENT]
    ├─ Manager reviews payroll
    ├─ Approves/rejects
    ├─ Initiate payment
    ├─ Payment method: bank transfer
    └─ Mark as "paid"
    ↓

[DATABASE UPDATES]
    payslips: UPDATE (status = "paid", payment_date)
    audit_logs: INSERT (payroll paid)
    ↓

PAYROLL COMPLETE ✅
```

---

### 8. PERMISSION-BASED FEATURE ACCESS

```
[USER LOGS IN]
    ├─ Authenticate via JWT
    ├─ Load user record from database
    ├─ Load associated role
    └─ Load role permissions (JSON array)
    ↓

[PERMISSION CHECK]
    ├─ User navigates to feature (e.g., /payroll)
    ├─ App checks: user.role.permissions.includes("payroll:read")
    ├─ If YES:
    │   ├─ Show feature/page
    │   └─ Enable viewing
    ├─ If NO:
    │   ├─ Show 403 Forbidden
    │   └─ Log unauthorized attempt
    ↓

[DYNAMIC ROLE CREATION]
    ├─ Organization Admin opens Roles page
    ├─ Creates new role (e.g., "Night Manager")
    ├─ Assigns permissions via checkboxes:
    │   ├─ reservations:read, reservations:write
    │   ├─ rooms:read, rooms:write
    │   ├─ guests:read
    │   └─ staff:read
    ├─ Saves role
    └─ New role available for assignment
    ↓

[ROLE ASSIGNMENT TO USER]
    ├─ Admin selects user
    ├─ Changes user.role_id
    ├─ System immediately updates permissions
    ├─ User sees new features next login
    └─ Old features hidden
    ↓

[DATABASE STRUCTURE]
    roles: {
      id, org_id, name, permissions: ["reservations:read", ...],
      is_system (for built-in roles)
    }
    users: {
      id, role_id, permissions inherited from role
    }
    ↓

FEATURE ACCESS CONTROLLED ✅
```

---

### 9. REAL-TIME ROOM STATUS UPDATE

```
[ROOM STATUS CHANGES]
    ├─ Housekeeping marks room as "clean"
    ├─ OR Front desk changes status
    └─ Change triggers update
    ↓

[SUPABASE REALTIME BROADCAST]
    ├─ Database record updated
    ├─ Supabase detects change
    ├─ Broadcasts to all subscribed clients
    └─ Payload: { room_id, old_status, new_status }
    ↓

[CLIENT SUBSCRIPTIONS]
    ├─ Front desk listening to rooms channel
    ├─ Housekeeping listening to rooms channel
    ├─ Dashboard listening to rooms channel
    ├─ All receive update instantly
    └─ UI re-renders with new status
    ↓

[UI UPDATES]
    ├─ Status badge changes color
    ├─ Room becomes available/unavailable
    ├─ Alerts housekeeping if dirty
    ├─ Enables/disables check-in
    └─ No page refresh needed
    ↓

REAL-TIME UPDATE COMPLETE ✅
```

---

### 10. MULTI-LOCATION DATA ISOLATION

```
[ORGANIZATION HIERARCHY]
    Organization (Grand Bohabs)
    ├─ Location 1: Main Hotel (Lagos)
    ├─ Location 2: Annex (Lagos)
    └─ Location 3: Beach Resort (Accra)
    ↓

[USER BELONGS TO LOCATION]
    ├─ Manager_A → Location 1 only
    ├─ Manager_B → Location 2 only
    ├─ Org_Admin → All locations
    └─ Super_Admin → All orgs/locations
    ↓

[ROW-LEVEL SECURITY ENFORCES]
    ├─ Query: SELECT * FROM rooms
    ├─ With RLS Policy:
    │   WHERE location_id IN (
    │     SELECT location_id FROM users 
    │     WHERE id = current_user_id
    │   )
    ├─ Result: Only rooms from assigned locations
    └─ Manager_A never sees Location 2 rooms
    ↓

[DATA ISOLATION EXAMPLE]
    Scenario: Manager_A views dashboard
    ├─ Rooms: Only Location 1's rooms
    ├─ Reservations: Only Location 1's bookings
    ├─ Guests: Only Location 1's guests
    ├─ Staff: Only Location 1's staff
    ├─ Orders: Only Location 1's orders
    └─ Inventory: Only Location 1's stock
    ↓

[CROSS-LOCATION REPORTING]
    ├─ Org Admin can see all locations
    ├─ Super Admin can see all orgs
    ├─ Regular Manager: limited to their location
    └─ This is enforced at database level (RLS)
    ↓

DATA ISOLATION ENFORCED ✅
```

---

## 📊 DATA RELATIONSHIPS

### Core Diagram:

```
Organization (1)
    ↓ (1-to-many)
Location (many)
    ↓ (1-to-many)
├─ Rooms (1-to-many) → Room Types
├─ Reservations ↔ Guests
├─ Restaurant Orders ↔ Menu Items
├─ Staff ↔ Users
├─ Inventory Items
└─ Housekeeping Tasks

Roles
    ↓ (many-to-1)
Users
    ├─ (1-to-many) Reservations created
    ├─ (1-to-many) Orders created
    ├─ (1-to-many) Tasks assigned
    └─ (1-to-many) Audit logs
```

---

## 🔄 EVENT-DRIVEN FEATURES

```
ROOM STATUS CHANGE
    → Triggers: Housekeeping notification, Availability update

RESERVATION CREATED
    → Triggers: Confirmation email, Audit log, Guest history update

CHECK-IN
    → Triggers: Room marked occupied, Housekeeping blocked, Guest welcome

CHECK-OUT
    → Triggers: Room marked dirty, Housekeeping task, Guest history update, Payment

ORDER CREATED
    → Triggers: Kitchen queue update, Stock deduction, Real-time display

ORDER COMPLETED
    → Triggers: Room charge posting, Revenue tracking

LOW STOCK ALERT
    → Triggers: Manager notification, Dashboard warning

STAFF CHECKED IN
    → Triggers: Attendance record, Availability tracking

PAYROLL GENERATED
    → Triggers: Manager notification, Payslip email
```

---

## 🎯 KEY METRICS TO TRACK

```
DASHBOARD REAL-TIME METRICS
├─ Current occupancy (rooms occupied / total rooms)
├─ Check-ins today (count)
├─ Check-outs today (count)
├─ Pending housekeeping tasks (count)
├─ Revenue today ($)
├─ Orders completed today (count)
├─ Average wait time (kitchen)
└─ Staff on duty (count)

DATABASE AGGREGATES
├─ Total revenue (day/week/month/year)
├─ ADR (Average Daily Rate) = total_revenue / occupancy_nights
├─ RevPAR = total_revenue / total_available_rooms
├─ Occupancy rate (%)
├─ Restaurant revenue
├─ Inventory turnover
└─ Staff attendance rate (%)
```

---

## 🔔 NOTIFICATION TRIGGERS

```
FOR MANAGERS:
├─ Low stock alert
├─ New reservation
├─ Guest special request
├─ Payment received
├─ Housekeeping urgent issue
└─ Payroll ready for approval

FOR STAFF:
├─ New task assigned
├─ Message from manager
├─ Order ready (kitchen)
├─ Guest request
└─ Check-in/check-out reminders

FOR GUESTS:
├─ Confirmation email (after booking)
├─ Check-in reminder (day before)
├─ Welcome message (check-in)
├─ Checkout reminder (checkout time)
└─ Thank you (after checkout)
```

---

**Document prepared:** February 2, 2026 | **By:** Eric
