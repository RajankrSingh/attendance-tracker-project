# Attendance Management System

## Overview

This is a full-stack attendance management system built with React, Express, TypeScript, and PostgreSQL. The application provides separate dashboards for administrators and regular users, allowing for comprehensive attendance tracking, leave management, and reporting functionality.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side navigation (migrated from React Router DOM)
- **Styling**: TailwindCSS with shadcn/ui component library
- **State Management**: React Context API for global state
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Session-based authentication (configured for PostgreSQL sessions)
- **API Design**: RESTful API with `/api` prefix
- **Development**: Hot reload with Vite middleware integration

### Database Schema
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Tables**: Users, Attendance Records, Leave Requests, Leave Balances with full relations
- **Schema Location**: `shared/schema.ts` for type sharing between frontend and backend
- **Database**: PostgreSQL with Neon serverless integration
- **Migrations**: Managed via `npm run db:push` command

## Key Components

### Authentication System
- **Current Implementation**: Mock authentication using localStorage
- **Planned Enhancement**: Full session-based authentication with password hashing
- **User Roles**: Admin and regular user roles with role-based access control

### Dashboard Components
- **AdminDashboard**: Overview of all employees, attendance statistics, and management tools
- **UserDashboard**: Personal attendance tracking and profile information
- **Shared Components**: Reusable UI components for consistency

### Data Management
- **Database Storage**: PostgreSQL with Drizzle ORM integration
- **Storage Interface**: Abstracted storage layer with database implementation
- **API Integration**: Full REST API with database persistence
- **Data Seeding**: Automated seeding with Indian employee data

### UI/UX Design
- **Design System**: shadcn/ui components with neutral color scheme
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Icons**: Lucide React icons throughout the application
- **Theme**: Professional, clean interface suitable for corporate environments

## Data Flow

1. **Authentication Flow**: User logs in → credentials validated → user data stored in localStorage → redirect to appropriate dashboard
2. **Attendance Tracking**: User clocks in/out → data stored in localStorage (mock) → real-time updates to dashboard
3. **Admin Operations**: Admin views all user data → can manage attendance records and generate reports
4. **API Communication**: Frontend communicates with backend via `/api` routes (to be implemented)

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React Router, React Query for server state
- **UI Libraries**: Radix UI components, TailwindCSS, class-variance-authority
- **Form Handling**: React Hook Form with resolvers
- **Date Utilities**: date-fns for date manipulation
- **Carousel**: Embla Carousel for UI components

### Backend Dependencies
- **Database**: Neon PostgreSQL serverless, Drizzle ORM
- **Server**: Express.js with TypeScript support
- **Session Management**: connect-pg-simple for PostgreSQL session store
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Build System**: Vite with React plugin
- **Code Quality**: TypeScript with strict configuration
- **Development Experience**: Hot reload, error overlay, runtime error modal

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20, PostgreSQL 16
- **Port Configuration**: Local port 5000, external port 80
- **Hot Reload**: Enabled with Vite middleware integration
- **Environment Variables**: DATABASE_URL for PostgreSQL connection

### Production Build
- **Build Process**: Vite builds frontend to `dist/public`, esbuild bundles server
- **Deployment Target**: Autoscale deployment on Replit
- **Static Assets**: Served from `dist/public` directory
- **Process Management**: PM2 or similar for production process management

### Database Setup
- **Development**: PostgreSQL 16 module in Replit
- **Schema Management**: Drizzle Kit for migrations and schema synchronization
- **Connection**: Neon serverless PostgreSQL for scalability

## Changelog

```
Changelog:
- June 19, 2025. Initial setup
- June 19, 2025. Migrated from Bolt to Replit environment
  - Migrated routing from React Router DOM to wouter for Replit compatibility
  - Updated employee data with Indian names and diverse departments
  - Added logout functionality for both admin and employee dashboards
  - Fixed missing dependencies and imports
- June 19, 2025. Database integration completed
  - Added PostgreSQL database with Neon serverless integration
  - Created comprehensive schema with users, attendance, leave requests, and leave balances
  - Implemented full REST API with database persistence
  - Updated frontend to use real database data instead of localStorage
  - Added database seeding with Indian employee data
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```