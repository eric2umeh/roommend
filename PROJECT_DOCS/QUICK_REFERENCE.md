# ROOMMEND - Quick Reference Guide
**Prepared by:** Eric | **Date:** February 2, 2026

---

## 🎯 ONE-PAGE EXECUTIVE SUMMARY

**Product:** Hotel/Restaurant Management SaaS for Nigeria & beyond  
**Timeline:** 8 weeks MVP  
**Tech:** Next.js 16, Supabase, Shadcn/ui, Tailwind CSS v4  
**Deployment:** Vercel (frontend) + Supabase (backend)  
**Launch:** FREE tier + Pro ($99/mo) + Enterprise (custom)  

---

## 📦 10 CORE FEATURES

```
1. 🏨 ROOM MANAGEMENT
   - Room types & instances
   - Status tracking (clean/dirty/occupied/maintenance)
   - Availability calendar
   
2. 📅 RESERVATIONS
   - Manual booking form
   - Price calculation with taxes
   - Check-in/check-out workflow
   - Conflict detection
   
3. 👥 GUEST CRM
   - Guest profiles & search
   - Stay history
   - Deduplication
   - Preferences tracking
   
4. 🍽️ RESTAURANT & POS
   - Menu management
   - Order creation & tracking
   - Kitchen queue display
   - Bill splitting & room charges
   
5. 📦 INVENTORY
   - Stock in/out tracking
   - Low-stock alerts
   - Inventory valuation
   - Auto-deduction from POS
   
6. 👨‍💼 STAFF & PAYROLL
   - Dynamic role management
   - Attendance tracking
   - Salary calculation
   - Payslip generation
   
7. 🧹 HOUSEKEEPING
   - Task generation & assignment
   - Workflow tracking
   - Maintenance escalation
   
8. 💬 INTERNAL MESSAGING
   - Group/direct chat
   - File uploads
   - Read receipts
   - Location-isolated
   
9. 📊 ANALYTICS
   - Occupancy metrics
   - Revenue tracking (ADR/RevPAR)
   - Restaurant sales
   - Inventory reports
   
10. 🔐 DYNAMIC RBAC
    - Super Admin / Org Admin / Location Manager / Staff
    - Custom role creation
    - Permission-based features
    - Row-Level Security
```

---

## 💾 DATABASE SNAPSHOT

**Provider:** Supabase (PostgreSQL)  
**Tables:** 30+ core tables  
**Multi-tenancy:** Organization → Location → User  
**Security:** RLS on all tables  

### Core Tables:
```
organizations, locations, users, roles
rooms, room_types, room_status_history
reservations, guests, check_in_out_events
restaurant_orders, order_items, menu_items, menu_categories
inventory_items, inventory_logs
staff, attendance, payslips
housekeeping_tasks
message_channels, messages, message_read_receipts
audit_logs
```

---

## 🏗️ ARCHITECTURE

```
CLIENT (Next.js 16 + React 19.2)
  ↓ (Next.js App Router)
API ROUTES (Route Handlers + Server Actions)
  ↓ (JWT Auth)
DATABASE (Supabase PostgreSQL)
  ↓ (RLS + Realtime)
FEATURES:
  - Real-time updates (room status, orders)
  - AI recommendations (Vercel AI SDK)
  - File storage (Supabase Storage)
  - Analytics (built-in reporting)
```

---

## 📅 SPRINT SCHEDULE

```
WEEK 1-2: FOUNDATION
├─ Project setup (Next.js, Supabase, Tailwind)
├─ Authentication & login
├─ Dynamic RBAC system
├─ Design system & components
├─ Mock data generation
└─ Navigation shell

OUTPUT: Can log in, navigate, see mock data

---

WEEK 3-4: ROOMS & RESERVATIONS
├─ Room management CRUD
├─ Availability calculation
├─ Reservation booking form
├─ Price calculation engine
├─ Check-in/check-out workflow
└─ Conflict detection

OUTPUT: Can book & checkout a guest

---

WEEK 5-6: GUESTS & RESTAURANT
├─ Guest CRUD & search
├─ Guest history & preferences
├─ Menu management
├─ POS order flow
├─ Kitchen queue display
└─ Room charge posting

OUTPUT: Can manage guests & take orders

---

WEEK 7-8: INVENTORY, STAFF & MVP COMPLETION
├─ Inventory management
├─ Stock tracking
├─ Staff accounts & attendance
├─ Payroll foundation
├─ Housekeeping tasks
├─ Dashboard analytics
└─ Grand Bohabs testing

OUTPUT: Feature-complete MVP ready for production
```

---

## 🎨 DESIGN SYSTEM

**Colors:** TBD (to match design brief)  
**Typography:** 2 fonts max (headings + body)  
**Components:** Shadcn/ui + custom components  
**Responsive:** Mobile-first approach  
**Accessibility:** WCAG 2.1 AA  

---

## 🔐 SECURITY CHECKLIST

- ✅ Supabase Auth (JWT + 2FA ready)
- ✅ Row-Level Security on all tables
- ✅ Encryption for sensitive data (bank accounts, IDs)
- ✅ API rate limiting
- ✅ CORS + CSRF protection
- ✅ Input validation (Zod)
- ✅ Audit logging (immutable)
- ✅ GDPR-compliant data deletion

---

## 💰 PRICING STRATEGY

| Tier | Users | Locations | Price | Target |
|------|-------|-----------|-------|--------|
| FREE | 5 | 1 | $0/mo | Attract new hotels |
| PRO | Unlimited | 3 | $99/mo | Growing hotels |
| ENTERPRISE | Unlimited | Unlimited | Custom | Large chains |

**Monetization:**
- Extra users: $X per user/month
- Extra locations: $X per location/month
- AI features: Premium add-on

---

## 🚀 MVP SUCCESS CRITERIA

**Functional:**
- ✅ Rooms & reservations working end-to-end
- ✅ Guests can be created, searched, tracked
- ✅ Restaurant orders taken & tracked
- ✅ Inventory basics working
- ✅ Dashboard shows key metrics
- ✅ Staff can be assigned & tracked

**Performance:**
- ✅ Page load < 1.5s
- ✅ API response < 200ms
- ✅ 99.5% uptime

**User Experience:**
- ✅ Grand Bohabs staff can use without training
- ✅ Mobile responsive
- ✅ Zero critical bugs

---

## 🎯 FEATURE PRIORITY MAP

```
MUST HAVE (MVP - Week 8)
├─ Rooms & Reservations
├─ Guest Management
├─ Basic Dashboard
├─ Authentication & RBAC
└─ Mock data ready

SHOULD HAVE (Phase 2 - Weeks 9-16)
├─ Restaurant & POS
├─ Inventory Management
├─ Staff & Payroll
├─ Housekeeping Workflow
└─ Advanced Reports

NICE TO HAVE (Phase 3+)
├─ AI Recommendations
├─ Mobile App
├─ Guest Portal
├─ Channel Manager Integration
└─ Advanced BI/Predictions
```

---

## 🔧 DEVELOPER SETUP

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=

# 3. Run migrations
supabase migration up

# 4. Seed data
node scripts/seed-data.js

# 5. Start dev server
npm run dev

# 6. Access http://localhost:3000
```

---

## 📊 COMPETITIVENESS VS INNGO

| Feature | Inngo | Roommend |
|---------|-------|----------|
| Cloud-based | ✅ | ✅ Plus PWA |
| Mobile | Web only | ✅ Native responsive |
| AI Features | ❌ | ✅ Recommendations |
| Dynamic Roles | Basic | ✅ Custom roles |
| Free Tier | ❌ | ✅ 5 users free |
| Real-time | Limited | ✅ Full realtime |
| POS | Basic | ✅ Advanced |
| Integration | Basic | ✅ Expandable |
| UI/UX | Dated | ✅ Modern |
| Support | Email | ✅ Chat + Email |

---

## 🏆 COMPETITIVE ADVANTAGES

1. **FREE AT START** - Acquire customers before competitors
2. **MODERN UI/UX** - Better than legacy systems
3. **MOBILE-FIRST** - Work from anywhere
4. **AI-POWERED** - Pricing recommendations, forecasting
5. **DYNAMIC ROLES** - Clients control permissions
6. **REAL-TIME** - Live kitchen queue, order updates
7. **INNOVATION** - Patent-worthy features
8. **SCALABILITY** - Multi-location, multi-country ready

---

## 📞 STAKEHOLDERS & CONTACTS

| Role | Name | Responsibility |
|------|------|-----------------|
| Product Owner | Eric | Vision, requirements, approval |
| Business Partner | Ebuka | Go-to-market, partnerships |
| Client | Grand Bohabs | Testing, feedback, testimonial |

---

## 🎬 KICKOFF QUESTIONS

- [ ] Design theme approved?
- [ ] Supabase project created?
- [ ] Grand Bohabs available for testing Week 8?
- [ ] Team size & availability?
- [ ] Budget for integrations (payment, SMS)?
- [ ] Patent strategy finalized?
- [ ] Marketing strategy aligned?

---

## 📈 SUCCESS METRICS (6 Months)

- 5+ hotels actively using Roommend
- <2% churn rate
- 99.9% uptime
- Patent application filed
- NPS > 50

---

## 🔗 USEFUL LINKS (to be updated)

- Supabase Project: [Link]
- GitHub Repo: [Link]
- Vercel Deployment: [Link]
- Design System: [Link]
- Database Backup: [Link]

---

## 📝 NOTES FOR EBUKA

**Key Points:**
1. This is a real, production-ready application - not a prototype
2. We're starting with a freemium model to acquire users quickly
3. Grand Bohabs gives us real-world validation before scaling
4. AI features differentiate us from Inngo
5. Dynamic roles are innovative and hard to copy
6. 8-week MVP is aggressive but achievable
7. Multi-location support built in from start = competitive moat

**Next Steps:**
1. Review all 3 documentation files
2. Approve tech stack & architecture
3. Sign off on feature prioritization
4. Create Supabase project
5. Kick off Sprint 1

---

**Prepared by:** Eric  
**Date:** February 2, 2026  
**Status:** Ready for review with Ebuka
