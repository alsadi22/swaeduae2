# SwaedUAE Volunteer Platform - MVP Implementation Plan

## Project Overview
Building a comprehensive volunteer platform for UAE using React + shadcn-ui to simulate Laravel functionality.

## Core Files to Create (8 files max):

1. **src/App.tsx** - Main routing and authentication context
2. **src/pages/Home.tsx** - Public homepage with hero section and opportunities
3. **src/pages/VolunteerDashboard.tsx** - Volunteer portal with events, QR check-in, certificates
4. **src/pages/OrganizationDashboard.tsx** - Organization portal with event management
5. **src/pages/AdminDashboard.tsx** - Admin panel for user/org/event moderation
6. **src/pages/QRVerify.tsx** - Certificate verification page (/qr/verify)
7. **src/components/AuthProvider.tsx** - Authentication context and role management
8. **src/lib/mockData.ts** - Mock database with users, events, organizations, certificates

## Key Features:
- Role-based access (Volunteer/Organization/Admin)
- QR code check-in/out simulation
- Certificate verification
- Event management and registration
- Geofencing simulation (150m radius)
- Responsive design with Tailwind CSS

## Implementation Strategy:
- Use localStorage for data persistence
- Simulate API calls with mock data
- Implement role-based routing
- Create realistic UI/UX matching Laravel admin panels