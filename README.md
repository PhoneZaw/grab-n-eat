# Grab-n-Eat 🍔

A modern food ordering and pickup platform built with Next.js 14, Prisma, and MongoDB.

## 🚀 Key Features

- **Multi-tenancy**: Support for multiple restaurants and branches.
- **Transactional Safety**: Atomic operations for orders, branches, and menus using Prisma Transactions.
- **Robust Validation**: Schema-based input validation using Zod across all core services.
- **Selective Hydration**: Optimized loading performance on the home page with React Suspense and custom skeleton loaders.
- **Real-time Tracking**: Dynamic order status tracking for customers and management tools for staff.
- **Dual Session Auth**: Secure, separate session management for customers and staff/admins via Iron Session.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB (ORM: Prisma)
- **Styling**: Tailwind CSS & Shadcn UI
- **Auth**: Iron Session
- **Payments**: Stripe
- **Validation**: Zod
- **Icons**: Lucide React

## 🚦 Getting Started

### 1. Prerequisites
- Node.js 18+ 
- MongoDB instance (local or Atlas)
- PNPM (recommended)

### 2. Installation
```bash
pnpm install
```

### 3. Environment Setup
Copy `.env.example` to `.env` and fill in your credentials:
```bash
DATABASE_URL="mongodb+srv://..."
DEFAULT_PASSWORD="your_default_password"
```

### 4. Database Sync
```bash
npx prisma db push
```

### 5. Run Development Server
```bash
pnpm run dev
```

## 🧪 Testing & QA

For developers and QA testers, we've built a dedicated **Tester Dashboard** available at:
👉 **[http://localhost:3000/tester](http://localhost:3000/tester)**

This page includes pre-configured dummy accounts for **Admin, Owner, Manager, and Customer** roles, along with quick navigation to all major system flows.

## 📖 Developer Guidelines

For detailed information on project structure, coding standards, and architectural patterns, please refer to:
📄 **[AGENTS.md](./AGENTS.md)**

---
*Built with ❤️ for better food experiences.*
