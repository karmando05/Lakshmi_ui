# Lakshmi_ui

Lakshmi_ui is a modern Next.js frontend for an online course platform, tailored for entrepreneurs, course creators, and admins. It includes features like:

- public course catalog
- course detail + checkout flow
- user dashboard
- admin panel for courses, users, sales
- protected routes and mock auth

## 🧩 Project structure

- `app/` — Next.js App Router pages and routes
  - `app/admin` — admin UI & nested course/user/sales pages
  - `app/courses` — course list and course detail pages
  - `app/dashboard`, `app/learn`, `app/checkout` — learner workflows
- `components/` — reusable UI components (CourseCard, Header, etc.)
- `lib/` — data layer, mock stores, services, repositories, types

## 🚀 Getting started

1. Clone the repository

```bash
git clone <your-repo-url>
cd Lakshmi_ui
```

2. Install dependencies

```bash
npm install
```

3. Run in development mode

```bash
npm run dev
```

4. Open in browser

`http://localhost:3000`

## 🧪 Build and production

```bash
npm run build
npm run start
```

## ✅ Notes

- This implementation uses mock data stores under `lib/data/mock/` for local development.
- Authentication is handled through a `AuthProvider` mock under `components/providers/AuthProvider.tsx`.
- Admin-only pages are protected via `components/auth/ProtectedRoute.tsx`.

