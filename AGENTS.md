# Grab-n-Eat Project Guidelines for Agents

Welcome to the **Grab-n-Eat** project! This document provides a comprehensive overview of the project's structure, technology stack, design philosophy, and core features to help you navigate and contribute effectively.

## 1. Project Overview
**Grab-n-Eat** is a modern food ordering and pickup platform. It allows customers to browse restaurants, customize orders, and schedule pickups, while providing restaurant owners and managers with tools to manage their menus, branches, and orders.

### Core User Roles
-   **Customer**: Browses restaurants, places orders, manages favorites, and writes reviews.
-   **Owner**: Owns a restaurant and can manage multiple branches.
-   **Manager**: Manages a specific branch (orders, menu availability, staff).
-   **Admin**: Platform-wide administrator (access to all data).

## 2. Tech Stack
-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Database & ORM**: [MongoDB](https://www.mongodb.com/) with [Prisma](https://www.prisma.io/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Radix UI](https://www.radix-ui.com/) (primitives), [Lucide React](https://lucide.dev/) (icons), [Shadcn UI](https://ui.shadcn.com/) (styled components)
-   **Forms & Validation**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
-   **Authentication**: [Iron Session](https://github.com/vvo/iron-session) (session-based)
    -   *Note*: The project uses two distinct sessions: `myapp_session` for staff/admins and `client_session` for customers. See `lib/session.ts` for details.
-   **Payments**: [Stripe](https://stripe.com/)
-   **File Uploads**: [UploadThing](https://uploadthing.com/)
-   **Email**: [Nodemailer](https://nodemailer.com/)

## 3. Project Structure
The project follows a domain-driven and component-based organization:

-   `app/`: Next.js App Router pages and API routes.
    -   `api/`: Backend API endpoints.
    -   `auth/`: Authentication-related pages (Login, Signup).
    -   `dashboard/`: User-specific dashboards (Customer, Manager, Owner).
    -   `ui/`: Common UI layouts and application-specific views.
-   `components/`: Reusable React components.
    -   `ui/`: Low-level UI primitives (Shadcn UI components like buttons, dialogs, etc.).
    -   `data-table/`: Custom data table components using TanStack Table.
-   `services/`: Business logic and data fetching, organized by domain (e.g., `branch`, `order`, `menu`).
-   `lib/`: Shared utilities, configurations, and singleton instances (e.g., Prisma client, session logic).
-   `prisma/`: Database schema and migrations.
-   `public/`: Static assets (images, icons).
-   `data/`: Mock data or seed data for development.

## 4. Core Features
-   **Multi-tenancy**: Support for multiple restaurants, each with multiple branches.
-   **Order Management**: Full lifecycle from `PENDING` to `PICKED` or `CANCELLED`.
-   **Pickup Slots**: Customers can choose specific time slots for picking up their food.
-   **Menu Customization**: Choice groups and options for flexible food items.
-   **Location-based Search**: Calculate distances between customers and branches.
-   **Reviews & Ratings**: Customer feedback system for branches.
-   **Coupons**: Promotional codes and discounts.

## 5. Design & Styling
The project uses a clean, modern aesthetic with a specific color palette:
-   **Primary**: `#004E64` (Deep Blue)
-   **Secondary**: `#00A5CF` (Teal)
-   **Accent**: `#FF6B35` (Bright Orange)
-   **Neutral**: White, `#EFEFEF` (Light Gray), `#37474F` (Dark Gray)

**Guidelines for UI**:
-   Use **Tailwind CSS** for all styling. Avoid inline styles.
-   Leverage **Radix UI** primitives for accessible interactive elements.
-   Follow the **Shadcn UI** pattern for component organization (keep primitives in `components/ui`).
-   Maintain responsiveness using Tailwind's breakpoint prefixes.

## 6. Coding Standards & Patterns
-   **Data Fetching**: Use Server Components for initial data fetching via `services/`. Use `use client` sparingly for interactive components.
-   **Types**: Always define and use TypeScript interfaces for data structures (see `services/` for examples).
-   **Server Actions**: Leverage Next.js Server Actions for mutations (forms, order placement).
-   **Error Handling**: Use Zod for schema validation and provide clear feedback to the user via Toasts or form errors.
-   **Modularity**: Keep components small and focused. Move complex business logic into the `services/` layer.

## 7. Database Model (Prisma)
Refer to `prisma/schema.prisma` for the full data model. Key models include:
-   `User` & `Customer`: Authentication and profile data.
-   `Restaurant` & `Branch`: Hierarchical structure for food providers.
-   `Menu`, `Category`, `BranchMenu`: Menu organization.
-   `Order` & `OrderItem`: Order tracking.
-   `PickUpSlot`: Inventory and scheduling for pickups.

## 8. Testing & QA
To facilitate testing the full application flow, a dedicated tester page is available at `/tester`. This page includes:
- **Dummy Credentials**: Pre-configured accounts for Admin, Owner, Manager, and Customer roles.
- **Quick Links**: Direct access to key application routes.
- **Testing Guides**: Step-by-step instructions for common user flows.

## 9. Getting Started for Agents
1.  **Understand the Domain**: Before making changes, check the relevant subdirectory in `services/` to see how data is handled.
2.  **UI Consistency**: If adding a new UI element, check `components/ui` first to see if a primitive already exists.
3.  **Environment Variables**: Refer to `.env.example` for required configuration (MongoDB URL, Stripe keys, etc.).
4.  **Database Updates**: If you modify `schema.prisma`, remember to run `npx prisma generate`.

---
*Created to help AI agents and developers build better food experiences.*
