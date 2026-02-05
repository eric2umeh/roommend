# Roommend - Hotel & Restaurant Management System

Modern, open-source hotel and restaurant management software built with Next.js, Supabase, and React. Manage rooms, reservations, guests, POS orders, inventory, staff, and more—all from one beautiful dashboard.

**Document Created:** February 5, 2024  
**Created By:** Eric Umeh  
**Status:** Active Development (Sprint 1)

## 🚀 Features

### Core Modules
- **🏨 Room Management** - Room types, inventory, status tracking, availability
- **📅 Reservations** - Booking system with pricing engine, conflict detection
- **👥 Guest CRM** - Guest profiles, preferences, stay history, deduplication
- **🍽️ Restaurant & POS** - Menu management, order taking, kitchen queue, bill splitting
- **📦 Inventory** - Stock tracking, low-stock alerts, supplier management
- **👨‍💼 Staff & Payroll** - User management, dynamic roles, attendance, payslips
- **🧹 Housekeeping** - Task generation, assignment, maintenance tracking
- **💬 Internal Messaging** - Team communication, file sharing, read receipts
- **📊 Analytics** - Occupancy, revenue, guest metrics, inventory valuation

### Advanced Features
- **Dynamic RBAC** - Clients create unlimited custom roles with granular permissions
- **Multi-tenancy** - Support multiple organizations and locations from Day 1
- **Real-time Updates** - Live room status, kitchen queue, order tracking
- **AI-Ready** - Hooks for pricing recommendations, demand forecasting
- **Mobile Responsive** - Full functionality on phones, tablets, and desktops
- **Open Source** - MIT licensed, community-driven development

## 💰 Pricing (All in NGN ₦)

- **Free Tier** - ₦0/month, up to 5 users, 1 location, core features
- **Pro** - ₦163,350/month (~$99 USD), unlimited users, multiple locations, all features
- **Enterprise** - Custom pricing, white-label, dedicated support

## 🏁 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

```bash
# Clone repository
git clone https://github.com/eric2umeh/roommend.git
cd roommend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

### Running Locally

```bash
# Development server
npm run dev

# Open browser to http://localhost:3000
```

### Demo Accounts

**Admin Account:**
- Email: `***REMOVED***`
- Password: `demo`

**Front Desk Account:**
- Email: `***REMOVED***`
- Password: `demo`

**Housekeeping Account:**
- Email: `***REMOVED***`
- Password: `demo`

## 📁 Project Structure

```
app/
├── app/                    # Next.js 16 app directory
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout with metadata
│   ├── globals.css        # Tailwind theme tokens
│   ├── app/               # Dashboard app
│   │   ├── page.tsx       # Dashboard home
│   │   ├── reservations/  # Reservation module
│   │   ├── rooms/         # Room management
│   │   ├── guests/        # Guest CRM
│   │   ├── orders/        # POS orders
│   │   └── ...
│   └── login/             # Authentication
├── components/
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── types.ts           # TypeScript interfaces
│   ├── mock-data.ts       # Mock data for testing
│   ├── supabase.ts        # Supabase client
│   └── auth-utils.ts      # Authentication utilities
├── scripts/
│   └── 01_init_schema.sql # Database schema
└── public/                # Static assets
```

## 🔧 Tech Stack

- **Frontend** - Next.js 16, React 19.2, TypeScript
- **UI Library** - shadcn/ui, Tailwind CSS v4
- **Database** - Supabase (PostgreSQL)
- **Authentication** - Supabase Auth
- **Real-time** - Supabase Realtime
- **Deployment** - Vercel (frontend), Supabase (backend)
- **State Management** - React hooks, SWR
- **Forms** - React Hook Form (planned)
- **Animations** - Tailwind CSS animations

## 🗄️ Database Schema

**Core Tables:**
- `organizations` - Tenant management
- `locations` - Hotel/restaurant locations
- `users` - Staff accounts
- `roles` - Dynamic role-based access control
- `rooms` - Room instances
- `room_types` - Room categories and pricing
- `guests` - Guest profiles and CRM
- `reservations` - Bookings and check-ins
- `menu_categories` - POS menu organization
- `menu_items` - Food and beverage items
- `orders` - Customer orders
- `order_items` - Order line items
- `inventory_items` - Stock and supplies
- `inventory_transactions` - Stock movements
- `staff_payroll` - Employee payroll data
- `attendance` - Staff attendance tracking
- `payslips` - Generated payroll documents
- `housekeeping_tasks` - Cleaning and maintenance
- `message_groups` - Team messaging groups
- `messages` - Internal messages and files

**All tables include:**
- Row-Level Security (RLS) policies
- Tenant isolation (organization_id)
- Timestamps (created_at, updated_at)
- Proper foreign key relationships

## 🔐 Security

- Row-Level Security on all tables
- Supabase authentication with JWT tokens
- Bcrypt password hashing
- Environment variable protection
- GDPR-compliant data handling
- Audit logging ready
- SQL injection prevention via parameterized queries

## 📊 Development Roadmap

### Sprint 1 (Weeks 1-2) - Foundation ✅
- [x] Project setup with Next.js 16
- [x] Supabase integration
- [x] Design system (Tailwind + shadcn/ui)
- [x] Authentication & RBAC
- [x] Mock data generation
- [x] Landing page
- [x] Basic dashboard shell
- [ ] Deploy to Vercel

### Sprint 2 (Weeks 3-4) - Rooms & Reservations
- [ ] Room type CRUD
- [ ] Room inventory management
- [ ] Reservation booking system
- [ ] Price calculation engine
- [ ] Conflict detection
- [ ] Check-in/check-out flows

### Sprint 3 (Weeks 5-6) - Guests & Restaurant
- [ ] Guest profile management
- [ ] Guest deduplication
- [ ] POS order system
- [ ] Kitchen queue
- [ ] Menu management
- [ ] Order history

### Sprint 4 (Weeks 7-8) - Inventory, Staff & Analytics
- [ ] Inventory tracking
- [ ] Payroll system
- [ ] Housekeeping tasks
- [ ] Analytics dashboard
- [ ] Reports generation
- [ ] Internal messaging

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Commands

```bash
# Format code
npm run format

# Run linter
npm run lint

# Run tests
npm run test

# Build for production
npm run build

# Start production server
npm run start
```

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🙋 Support

- **Documentation** - [docs/](docs/)
- **Issues** - GitHub Issues
- **Email** - support@roommend.app

## 🌍 Localization

Currently supports:
- **English** - Default
- **Upcoming** - Yoruba, Igbo, Hausa (Nigeria)
- **Upcoming** - French (West Africa)

## 📞 Contact

- **Email** - eric@roommend.app
- **Twitter** - [@roommend_app](https://twitter.com/roommend_app)
- **Website** - [roommend.app](https://roommend.app)

---

**Built with ❤️ for hotels and restaurants across Africa**

*Roommend is an open-source project dedicated to modernizing hospitality management.*
