
# UI Development Specification
## Online Course Platform – MVP
Version: v1.0

---

# 1. Tech Stack Assumptions

Frontend should be built using:

- Next.js
- React
- TypeScript
- TailwindCSS
- Component architecture

Optional UI libraries:

- Radix UI
- shadcn/ui

---

# 2. Design Principles

### Simplicity
Target users are non‑technical entrepreneurs. The UI must be extremely simple.

### Minimal Navigation

Navigation items:

- Home
- Courses
- My Courses
- Profile

### Clear CTAs

Every page should have **one primary action**.

---

# 3. Global Layout

Component: `AppLayout`

Structure:

Header  
Main Content  
Footer

---

## Header Component

Component: `Header`

Left:
- Logo

Center:
- Navigation
  - Courses

Right:
- Login / Profile

Behavior:

If user NOT logged in:
- Show **Login**

If user logged in:
- Show **My Courses**
- Show **Avatar Menu**

---

# 4. Landing Page

Route:

/

---

## Layout Sections

- Hero
- Benefits
- Featured Courses
- Testimonials
- Footer

---

## Hero Section

Component: `Hero`

Elements:

- Title
- Subtitle
- CTA Button

Example:

Title:
Learn marketing and sales for your business

Subtitle:
Practical courses for entrepreneurs who want more customers

CTA:
[ View Courses ]

Behavior:

CTA → /courses

---

## Benefits Section

Component: `BenefitsGrid`

Grid: 3 Columns

Items:

- Learn Fast
- Practical Lessons
- Grow Your Business

---

## Featured Courses Section

Component: `CourseCardGrid`

Grid Layout:

- Desktop: 3 columns
- Mobile: 1 column

Course Card Structure:

- Course Image
- Course Title
- Short Description
- Price
- Button: View Course

---

# 5. Course Catalog Page

Route:

/courses

---

## Layout

Page Title  
Course Grid

---

## Course Card Component

Component: `CourseCard`

Structure:

- Image
- Title
- Short Description
- Price
- CTA Button

Example:

Marketing for Entrepreneurs  
$499  
[ View Course ]

Behavior:

CTA → /courses/[courseSlug]

---

# 6. Course Detail Page

Route:

/courses/[slug]

---

## Layout

Two-column layout

Left:
Course preview video

Right:
Course information

---

## Course Information

Fields:

- Title
- Instructor
- Price
- Buy Button

CTA:

[ Buy Course ]

---

## Course Description

Text block describing the course.

---

## Curriculum Section

Component: `ModuleAccordion`

Structure:

Module  
  Lesson  
  Lesson  
  Lesson  

Example:

Module 1 – Fundamentals  
• Lesson 1: What is marketing  
• Lesson 2: Finding your customer

Module 2 – Instagram  
• Lesson 1: Profile optimization  
• Lesson 2: Content strategy

---

# 7. Checkout Page

Route:

/checkout

---

## Layout

Checkout Container

Order Summary  
User Information  
Payment Form

---

## Order Summary

Fields:

Course Title  
Price  
Total

---

## User Information Form

Fields:

Name  
Email

---

## Payment Form

Stripe Embedded Checkout

CTA:

[ Complete Purchase ]

---

# 8. Student Dashboard

Route:

/dashboard

---

## Layout

Header  
Welcome Message  
Course List

---

## Course List

Component: `StudentCourseCard`

Structure:

Course Title  
Progress Bar  
Continue Button

Example:

Marketing for Entrepreneurs  
Progress: 40%  
[ Continue Course ]

---

# 9. Course Player Page

Route:

/learn/[courseId]

---

## Layout

Two-column layout

Left Sidebar: Lesson list  
Right Content: Video player

---

## Sidebar

Component: `LessonList`

Structure:

Module  
  Lesson  
  Lesson  

Active lesson highlighted.

---

## Video Player Area

Components:

Video Player  
Lesson Title  
Lesson Description  
Download Resources  
Complete Button

Example:

[ Download PDF ]  
[ Mark as Completed ]

---

# 10. Admin Panel

Route:

/admin

---

## Layout

Sidebar Navigation  
Main Content

Sidebar:

- Courses
- Sales
- Users

---

# 11. Admin Courses Page

Route:

/admin/courses

---

Structure:

Header: Create Course Button

Course List

Course Card:

Title  
Status  
Edit Button

Example:

Marketing for Entrepreneurs  
Status: Published  
[ Edit ]

---

# 12. Create Course Page

Route:

/admin/courses/new

Fields:

Title  
Description  
Price  
Thumbnail Upload

CTA:

[ Create Course ]

---

# 13. Create Lesson Page

Route:

/admin/courses/[id]/lesson

Fields:

Lesson Title  
Video Upload  
PDF Upload

CTA:

[ Save Lesson ]

---

# 14. Navigation Flow

Landing  
→ Courses  
→ Course Detail  
→ Checkout  
→ Dashboard  
→ Course Player

---

# 15. MVP Screens Summary

Public Screens:

- Landing
- Course Catalog
- Course Detail

Student Screens:

- Dashboard
- Course Player

Admin Screens:

- Admin Dashboard
- Course Management
- Lesson Creation

Total MVP Screens: 8

---

# 16. Out of Scope for MVP

Not included:

- Community
- Chat
- Quizzes
- Certificates
- Affiliate program
- Instructor marketplace
- Mobile apps
