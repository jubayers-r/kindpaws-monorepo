# 🐾 KindPaws – Pet Adoption & Donation Platform

A full-stack MERN application where users can discover, adopt, or raise donation campaigns for pets in need. Built with ❤️ to unite loving humans with their future furry, feathered, or finned family members.

## 🌐 Live Site

🔗 [Visit KindPaws](https://kind-paws.web.app/)

<!-- ## 📁 Repositories
- **Client:** [GitHub → PetConnect Client](https://github.com/yourusername/petconnect-client)
- **Server:** [GitHub → PetConnect Server](https://github.com/yourusername/petconnect-server) -->

---

## 🎯 Project Purpose

This platform empowers users to:

- Find and adopt pets in need
- Launch donation campaigns for pets
- Make secure donations via Stripe
- Manage pet listings, adoption requests, and donations via a dynamic dashboard

Built to demonstrate real-world fullstack skills, secure authentication, admin controls, and responsive, accessible UI — perfect for production and recruiters alike.

---

## ✨ Key Features

### 🔐 Authentication

- Firebase email/password auth
- Google & GitHub OAuth
- JWT-based secure access (stored in HTTP-only cookies)
- Role-based access control (`admin` / `user`)
- Ban mechanism (optional)

### 🏠 Public Pages

- Homepage with categories, calls-to-action, inspirational sections
- Pet Listing with infinite scroll, filters, search
- Pet Detail modal with adopt form
- Donation Campaigns with infinite scroll
- Donation Detail with Stripe-powered payment & recommendations

### 🧑 User Dashboard (Protected)

- Add, edit, and manage pets (Formik + Yup + Imgbb API)
- View adoption requests & accept/reject
- Create and manage donation campaigns
- Track own donations & refund if needed
- TanStack Table + Pagination + Sorting + Modals

### 🛠️ Admin Dashboard (Protected)

- View/manage all users, pets, and donations
- Promote to admin, ban users
- Pause/edit/delete any donation campaign or pet

### ⚙️ Tech Stack

| Frontend                    | Backend            | Others                           |
| --------------------------- | ------------------ | -------------------------------- |
| React.js                    | Node.js + Express  | Stripe API for donations         |
| Vite + Shadcn UI            | MongoDB + Mongoose | TanStack Query + Infinite Scroll |
| Firebase Auth               | JWT Auth           | Imgbb API for image upload       |
| React Router                | CORS Config        | TipTap WYSIWYG Editor            |
| React Hook Form / Formik    | RESTful APIs       | Axios + Secure Axios Instance    |
| React-Intersection-Observer | Cookie-based auth  | Framer Motion Animations         |

---

## 📱 Responsive Design

Fully optimized for:

- ✅ Mobile
- ✅ Tablet
- ✅ Laptop
- ✅ Desktop

With proper alignment, spacing, and color contrast for a clean, recruiter-attractive UI.

---

## 🛂 Test Credentials

| Role  | Email             | Password |
| ----- | ----------------- | -------- |
| Admin | `admin@gmail.com` | `123456` |
| User  | `user@gmail.com`  | `123456` |

---

## 🔒 Environment Variables

### Client

```env
VITE_API_BASE_URL=your-server-url
VITE_IMGBB_API_KEY=your-imgbb-key
VITE_FIREBASE_API_KEY=...
```

### Server

```env
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
CLIENT_URL=your-client-site-url
```

---

## 📜 NPM Packages Used

### Client

- `@tanstack/react-query`
- `firebase`
- `axios`
- `react-router-dom`
- `react-hook-form` & `formik`, `yup`
- `shadcn/ui`
- `react-loading-skeleton`
- `react-intersection-observer`
- `tiptap`
- `stripe-js`, `@stripe/react-stripe-js`
- `lucide-react`, `clsx`, `framer-motion`, `date-fns`, `many more`

### Server

- `express`
- `mongoose`
- `cors`
- `cookie-parser`
- `jsonwebtoken`
- `stripe`
- `dotenv`

---

## ✅ Deployment Checklist

- [x] Server deployed on Vercel
- [x] Client deployed on Firebase Hosting
- [x] Firebase authorized domains added
- [x] CORS configured correctly
- [x] No CORS / 404 / 504 errors
- [x] Reload-safe routing (SPA compatible)
- [x] Protected route access using JWT + Cookies
- [x] Firebase & MongoDB secured via `.env`

---

## 🧠 Lessons Learned

- Implementing full JWT-based auth in Firebase + Express
- Advanced data fetching using TanStack Query
- Dynamic routing with protected layouts
- Stripe integration for secure payments
- Reusable form components with real-time validation
- Managing large-scale state without Redux

---

## 🚀 Future Improvements

- Add real-time chat between adopters and pet owners
- Email notifications for adoption status
- PWA support
- Analytics dashboard for admins

---

> **Built with care by Md. Jubayer Shikder — a Full-Stack developer on a mission to connect paws with people. 🐶🐱🐰**
> [🐦 Twitter (X)](https://x.com/jubayers_r) • [📧 Email](mailto:jubayer.shikder.007@gmail.com) • [💼 LinkedIn](https://linkedin.com/in/jubayer-shikder) • [💻 GitHub](https://github.com/jubayers-r)</br>
> Feel free to reach out if you'd like to collaborate or need help using the project!

## 📜 License

This project is licensed under the [MIT License](LICENSE) — free to use, modify, and fork..
