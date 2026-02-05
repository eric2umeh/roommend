# ROOMMEND - System Architecture Document
**Prepared by:** Eric  
**Date:** February 2, 2026  
**Project:** Roommend - Hotel/Property/Restaurant Management SaaS  
**Target Market:** Nigeria (expanding internationally)  
**Competitor Analysis:** Inngo.com

---

## 1. EXECUTIVE SUMMARY

Roommend is a next-generation hotel, property, and restaurant management software designed to replace legacy systems with a modern, AI-inclusive SaaS platform. The MVP focuses on the admin dashboard for hotel operations, with plans to scale to multi-location support and international markets.

**Key Value Propositions:**
- ✅ Cloud-based accessibility (work from anywhere)
- ✅ Mobile-responsive design
- ✅ AI-powered insights and automation
- ✅ Zero licensing fees at launch (freemium model)
- ✅ Enterprise-grade security
- ✅ Innovative features for competitive advantage

---

## 2. SYSTEM ARCHITECTURE OVERVIEW

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER (Responsive)                     │
├──────────────────────────┬──────────────────────────────────────┤
│  Web Browser (Desktop)   │  Mobile Browser (Phone/Tablet)       │
│  - Admin Dashboard       │  - Mobile-optimized UI               │
│  - Real-time Updates     │  - Offline-first capability          │
│  - SSR + PWA features    │  - Touch-optimized components        │
└──────────────────────────┴──────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │   API Layer (Next.js Routes)   │
                    │   - Route Handlers             │
                    │   - Server Actions             │
                    │   - Real-time Subscriptions    │
                    └───────────────┬───────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
    ┌───▼────┐              ┌──────▼──────┐           ┌────▼────┐
    │Database │              │ Auth Layer  │           │ AI/ML   │
    │(Supabase)              │(Supabase    │           │Service  │
    │- PostgreSQL            │ Auth)       │           │(Vercel  │
    │- RLS Policies          │- JWT Tokens │           │AI SDK)  │
    │- Row-level Security    │- Sessions   │           │         │
    └─────────┘              └─────────────┘           └─────────┘
        │
        └──────────────────────────────────┐
                                           │
                    ┌──────────────────────▼──────────────────┐
                    │   Real-time Features (Supabase RT)      │
                    │   - Presence tracking                   │
                    │   - Live room status updates             │
                    │   - Order queue updates                  │
                    └─────────────────────────────────────────┘
```

### 2.2 Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 16 (App Router) | Server-side rendering, optimal performance |
| **UI Framework** | React 19.2 + Shadcn/ui | Component library, accessibility |
| **Styling** | Tailwind CSS v4 | Responsive, utility-first CSS |
| **Database** | Supabase (PostgreSQL) | Scalable, built-in auth & RLS |
| **Authentication** | Supabase Auth | JWT-based, multi-factor support |
| **Real-time** | Supabase Realtime | Live data synchronization |
| **File Storage** | Supabase Storage | Invoice/document management |
| **AI/ML** | Vercel AI SDK + OpenAI | Price recommendations, demand forecasting |
| **Deployment** | Vercel | Edge functions, optimal CDN |
| **State Management** | React hooks + SWR | Client-side data fetching & caching |
| **Monitoring** | Sentry (optional) | Error tracking & performance |

---

## 3. DATA MODEL & SCHEMA

### 3.1 Core Database Tables

```
ORGANIZATIONS (Super Admin Level)
├── id (UUID)
├── name (string)
├── country (string)
├── tier (enum: free, pro, enterprise)
├── created_at
└── max_locations (integer)

LOCATIONS (Business Level)
├── id (UUID)
├── org_id (FK: organizations)
├── name (string)
├── type (enum: hotel, property, restaurant)
├── address
├── phone
├── timezone
└── created_at

USERS
├── id (UUID) - Supabase Auth
├── email (string)
├── org_id (FK: organizations)
├── location_id (FK: locations, nullable for super admin)
├── role_id (FK: roles)
├── status (enum: active, inactive)
└── created_at

ROLES (Dynamic Role Management)
├── id (UUID)
├── org_id (FK: organizations)
├── name (string)
├── permissions (JSON: array of permission codes)
├── created_at
└── updated_at

ROOMS (Hotel Inventory)
├── id (UUID)
├── location_id (FK: locations)
├── room_number (string)
├── room_type_id (FK: room_types)
├── current_status (enum: clean, dirty, maintenance, occupied)
├── last_cleaned (timestamp)
└── created_at

ROOM_TYPES (Classification)
├── id (UUID)
├── location_id (FK: locations)
├── name (string: Single, Double, Suite)
├── capacity (integer)
├── base_price (decimal)
├── amenities (JSON)
└── created_at

RESERVATIONS (Bookings)
├── id (UUID)
├── location_id (FK: locations)
├── guest_id (FK: guests)
├── room_id (FK: rooms)
├── check_in (date)
├── check_out (date)
├── status (enum: pending, confirmed, checked_in, checked_out)
├── total_price (decimal)
├── created_at
└── created_by (FK: users)

GUESTS (CRM)
├── id (UUID)
├── location_id (FK: locations)
├── phone (string, unique per location)
├── email (string)
├── first_name
├── last_name
├── preferences (JSON)
├── total_stays (integer)
├── created_at
└── updated_at

RESTAURANT_ORDERS (POS)
├── id (UUID)
├── location_id (FK: locations)
├── table_id (nullable)
├── reservation_id (FK: reservations, nullable - room charge)
├── status (enum: pending, preparing, ready, served, paid)
├── total_amount (decimal)
├── created_at
└── created_by (FK: users)

ORDER_ITEMS
├── id (UUID)
├── order_id (FK: restaurant_orders)
├── menu_item_id (FK: menu_items)
├── quantity (integer)
├── unit_price (decimal)
├── special_notes (text)
└── created_at

MENU_ITEMS
├── id (UUID)
├── location_id (FK: locations)
├── category_id (FK: menu_categories)
├── name (string)
├── price (decimal)
├── available (boolean)
├── ingredients (JSON)
└── created_at

INVENTORY_ITEMS (Stock Management)
├── id (UUID)
├── location_id (FK: locations)
├── category (enum: food, beverage, supplies, linens)
├── name (string)
├── current_quantity (integer)
├── unit (string: kg, liters, pieces)
├── min_threshold (integer)
├── reorder_cost (decimal)
└── created_at

INVENTORY_LOGS (Audit Trail)
├── id (UUID)
├── item_id (FK: inventory_items)
├── transaction_type (enum: in, out, adjustment)
├── quantity (integer)
├── notes (text)
├── created_by (FK: users)
└── created_at

STAFF
├── id (UUID)
├── user_id (FK: users)
├── location_id (FK: locations)
├── position (string)
├── salary (decimal)
├── bank_account (encrypted)
├── contract_start (date)
└── created_at

ATTENDANCE
├── id (UUID)
├── staff_id (FK: staff)
├── date (date)
├── check_in (time)
├── check_out (time)
├── status (enum: present, absent, late, half_day)
└── created_at

HOUSEKEEPING_TASKS
├── id (UUID)
├── location_id (FK: locations)
├── room_id (FK: rooms)
├── assigned_to (FK: staff)
├── status (enum: pending, in_progress, completed)
├── priority (enum: low, medium, high)
├── due_date (timestamp)
└── created_at

INTERNAL_MESSAGES
├── id (UUID)
├── location_id (FK: locations)
├── sender_id (FK: users)
├── channel_id (FK: message_channels)
├── content (text)
├── created_at
└── updated_at

MESSAGE_CHANNELS
├── id (UUID)
├── location_id (FK: locations)
├── name (string)
├── type (enum: group, direct)
├── members (UUID[], stored as array)
├── created_by (FK: users)
└── created_at
```

### 3.2 Row-Level Security (RLS) Strategy

```
PRINCIPLE: Data isolation by organization → location → user role

Super Admin:
  └─ Can access all organizations' data via special super_admin_role

Organization Admin:
  └─ Can access all locations within their organization
    └─ Full access to users, financial data, settings

Location Manager:
  └─ Can access only their assigned location
    └─ Full operational control (rooms, reservations, staff)

Staff Member:
  └─ Limited to assigned areas (kitchen, housekeeping, front desk)
    └─ Read-only or write access based on role permissions
```

---

## 4. FEATURE ROADMAP

### MVP (Phase 1: Weeks 1-8)
Focus: Admin Dashboard with core hotel operations
- ✅ Authentication & User Management
- ✅ Room Management (CRUD, Status tracking)
- ✅ Reservation System (Manual booking, conflict detection)
- ✅ Guest Management (Search, history)
- ✅ Staff Roles & Permissions (Dynamic role creation)
- ✅ Dashboard with basic analytics (Occupancy, ADR)

### Phase 2 (Weeks 9-16)
- ✅ Restaurant & POS integration
- ✅ Inventory management
- ✅ Housekeeping workflow
- ✅ Enhanced analytics (Revenue, trends)

### Phase 3 (Weeks 17-24)
- ✅ AI-powered recommendations (pricing, demand forecasting)
- ✅ Payroll system
- ✅ Internal messaging
- ✅ Multi-location dashboard

### Future Enhancements
- Mobile app (React Native)
- Guest portal (web booking)
- Advanced BI/Reporting
- Payment gateway integration
- Channel manager integration

---

## 5. SCALABILITY PLAN

### 5.1 Database Scaling Strategy

| Stage | Users | DB Size | Action |
|-------|-------|---------|--------|
| **MVP** | <100 | <1GB | Supabase Free/Pro |
| **Growth** | 100-1K | 1-10GB | Supabase Business |
| **Scale** | 1K-10K | 10-100GB | Supabase Enterprise |
| **Enterprise** | 10K+ | 100GB+ | Dedicated PostgreSQL |

### 5.2 Infrastructure Optimization

1. **Caching Layer:** Redis (Upstash) for session/room status
2. **CDN:** Vercel Edge for static assets
3. **Database:** Connection pooling via pgBouncer
4. **API Rate Limiting:** 100 req/min for free tier, scaled for paid

### 5.3 Multi-Tenancy Architecture

```
Single Supabase Instance (Initial)
└─ Org 1 (Grand Bohabs)
   ├─ Location 1 (Main)
   ├─ Location 2 (Annex)
   └─ Location 3 (New)
└─ Org 2 (Future Client)
   └─ Location 1
```

---

## 6. SECURITY & COMPLIANCE

### 6.1 Authentication & Authorization
- Supabase Auth (JWT-based)
- Email/password + optional 2FA
- Row-Level Security on all tables
- Dynamic role-based access control (RBAC)

### 6.2 Data Protection
- Encryption at rest (Supabase default)
- Encryption in transit (TLS 1.3)
- GDPR-compliant (optional data deletion)
- Encrypted sensitive fields (bank accounts, ID numbers)

### 6.3 Audit Trail
- All user actions logged (who/when/what)
- Immutable logs for financial transactions
- Export capability for compliance

---

## 7. DEPLOYMENT & DEVOPS

### 7.1 Deployment Strategy
- **Frontend:** Vercel (automatic CI/CD on git push)
- **Database:** Supabase cloud-hosted
- **Monitoring:** Sentry for error tracking
- **Database Backups:** Supabase automated daily

### 7.2 Environment Setup
```
Development → Staging → Production
(Local)      (Vercel)   (Vercel + Prod DB)
```

---

## 8. PERFORMANCE TARGETS

| Metric | Target | Tool |
|--------|--------|------|
| Page Load (FCP) | < 1.5s | Vercel Analytics |
| API Response | < 200ms | Server monitoring |
| Database Query | < 100ms | Supabase Profiling |
| Uptime | 99.9% | Vercel SLA |

---

## 9. COST ESTIMATION (Freemium Model)

### Free Tier
- Up to 5 users per location
- 1 location
- Basic features (rooms, reservations, guests)
- 5GB storage
- **Cost:** $0/month

### Pro Tier ($99/month)
- Unlimited users
- Up to 3 locations
- All features + AI recommendations
- 100GB storage
- Priority support

### Enterprise Tier (Custom)
- Unlimited everything
- Custom integrations
- Dedicated support
- White-label option

---

## 10. RISK MITIGATION

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Data loss | Low | Critical | Automated backups, recovery SLA |
| Performance degradation | Medium | High | Caching, CDN, monitoring |
| Role/permission bugs | Medium | High | Automated testing, careful QA |
| User adoption | High | High | Excellent onboarding, free tier |
| Competitor features | High | Medium | Rapid iteration, AI differentiation |

---

## 11. SUCCESS METRICS (First 6 Months)

- ✅ Grand Bohabs testing & feedback
- ✅ 5+ hotels using MVP
- ✅ 99.9% uptime
- ✅ < 2% churn rate
- ✅ Net Promoter Score > 50
- ✅ Patent application filed (innovative features)
