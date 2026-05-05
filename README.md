<div align="center">

<img src="https://img.shields.io/badge/CareerBridge-Job%20Portal-4F46E5?style=for-the-badge&logoColor=white" alt="CareerBridge" />

# 🌉 CareerBridge

### *Connecting Talent with Opportunity — Seamlessly.*

> A production-ready, full-stack **MERN Job Portal** where job seekers discover careers and employers find their next hire.

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Frontend-4F46E5?style=for-the-badge)](https://careerbridge-live.netlify.app)
[![Backend API](https://img.shields.io/badge/🔗%20Live%20API-Backend-10B981?style=for-the-badge)](https://careerbridge-backend-9c8f.onrender.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<br/>


![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB%20Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black)

</div>

---

## 📑 Table of Contents

- [✨ Overview](#-overview)
- [🎯 Problem Statement](#-problem-statement)
- [⚡ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [📁 Folder Structure](#-folder-structure)
- [🚀 Getting Started](#-getting-started)
- [🔑 Environment Variables](#-environment-variables)
- [📡 API Endpoints](#-api-endpoints)
- [🔐 Auth Flow](#-auth-flow)
- [🌐 Deployment](#-deployment)
- [🗺️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Overview

**CareerBridge** is a full-stack job marketplace built on the **MERN stack**, designed to eliminate friction between talent and opportunity. Whether you're a job seeker hunting for your next role or an employer building a world-class team — CareerBridge has you covered.

| Role | What they can do |
|------|-----------------|
| 👤 **Job Seeker** | Register, browse all jobs, apply with one click, track applications |
| 🏢 **Employer** | Post job listings, manage postings, review applicants |

---

## 🎯 Problem Statement

Traditional job boards are cluttered, slow, and impersonal. **CareerBridge** solves this by providing:

- ⚡ A fast, reactive UI powered by **React + Vite**
- 🔒 Secure, role-based access so the right people see the right data
- 🗂️ Organized job categories and application tracking in one place
- 🌍 Cloud-native infrastructure (MongoDB Atlas + Render + Vercel) for global availability

---

## ⚡ Features

<details>
<summary><b>👤 Job Seeker Features</b></summary>

- ✅ Register and log in securely (JWT + HTTP-only cookies)
- ✅ Browse all available job listings
- ✅ View detailed job descriptions
- ✅ Apply to jobs in one click
- ✅ Track all submitted applications (`My Applications`)
- ✅ Persistent login session across page refreshes

</details>

<details>
<summary><b>🏢 Employer Features</b></summary>

- ✅ Register as an employer with role-based access
- ✅ Post new job listings with details (title, description, location, salary, category)
- ✅ Manage all posted jobs (`My Jobs`)
- ✅ View and manage incoming applications per job
- ✅ Edit or delete job postings

</details>

<details>
<summary><b>🔐 Security Features</b></summary>

- ✅ JWT authentication with HTTP-only cookies (XSS-resistant)
- ✅ Bcrypt password hashing
- ✅ Protected routes via `auth` middleware
- ✅ Role-based route guards (employer vs. job seeker)
- ✅ Environment variable isolation with `dotenv`
- ✅ Mongoose schema-level data validation

</details>

---

## 🛠️ Tech Stack

### 🎨 Frontend

| Technology | Purpose |
|-----------|---------|
| ![React](https://img.shields.io/badge/React%2018-61DAFB?logo=react&logoColor=black&style=flat-square) | UI component library |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat-square) | Lightning-fast dev server & bundler |
| ![React Router](https://img.shields.io/badge/React%20Router%20v6-CA4245?logo=reactrouter&logoColor=white&style=flat-square) | Client-side routing |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white&style=flat-square) | HTTP client for API calls |
| ![Context API](https://img.shields.io/badge/Context%20API-61DAFB?logo=react&logoColor=black&style=flat-square) | Global state management |
| ![React Hot Toast](https://img.shields.io/badge/Toast%20Notifications-FF6154?style=flat-square) | User feedback & notifications |

### ⚙️ Backend

| Technology | Purpose |
|-----------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=flat-square) | JavaScript runtime |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=flat-square) | REST API framework |
| ![MongoDB](https://img.shields.io/badge/MongoDB%20Atlas-47A248?logo=mongodb&logoColor=white&style=flat-square) | Cloud NoSQL database |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white&style=flat-square) | MongoDB ODM & schema validation |
| ![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white&style=flat-square) | Stateless authentication |
| ![Bcrypt](https://img.shields.io/badge/Bcrypt-003A70?style=flat-square) | Password hashing |
| ![Dotenv](https://img.shields.io/badge/Dotenv-ECD53F?logo=dotenv&logoColor=black&style=flat-square) | Environment variable management |

### ☁️ DevOps & Deployment

| Technology | Purpose |
|-----------|---------|
| ![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white&style=flat-square) | Frontend hosting |
| ![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=black&style=flat-square) | Backend API hosting |
| ![MongoDB Atlas](https://img.shields.io/badge/MongoDB%20Atlas-47A248?logo=mongodb&logoColor=white&style=flat-square) | Managed cloud database |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                       │
│          React + Vite  ·  React Router  ·  Axios        │
│                  Context API  ·  Toast UI                │
└───────────────────────┬─────────────────────────────────┘
                        │  HTTPS / REST
                        ▼
┌─────────────────────────────────────────────────────────┐
│                      API LAYER                          │
│          Node.js  ·  Express.js  ·  JWT Auth            │
│   /api/v1/users  ·  /api/v1/jobs  ·  /api/v1/apps      │
└───────────────────────┬─────────────────────────────────┘
                        │  Mongoose ODM
                        ▼
┌─────────────────────────────────────────────────────────┐
│                   DATABASE LAYER                        │
│               MongoDB Atlas (Cloud)                     │
│     Collections: users · jobs · applications            │
└─────────────────────────────────────────────────────────┘
```

**Request Lifecycle:**
```
Browser → React Component → Axios → Express Route → Auth Middleware
       → Controller → Mongoose Model → MongoDB Atlas
       → Response → Context State → UI Update
```

---

## 📁 Folder Structure

```
CareerBridge/
├── 📦 package.json              ← Root (runs both apps with concurrently)
│
├── 🎨 frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/            ← Login, Register
│   │   │   ├── Home/            ← Landing page
│   │   │   ├── Job/             ← Jobs, JobDetails, MyJobs, PostJob
│   │   │   ├── Application/     ← Apply, MyApplications
│   │   │   ├── Layout/          ← Navbar, Footer
│   │   │   └── NotFound/        ← 404 page
│   │   ├── context/             ← Global auth/job context
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
│
└── ⚙️ backend/
    ├── controllers/
    │   ├── userController.js
    │   ├── jobController.js
    │   └── applicationController.js
    ├── models/
    │   ├── userModel.js
    │   ├── jobModel.js
    │   └── applicationModel.js
    ├── routes/
    │   ├── userRoutes.js
    │   ├── jobRoutes.js
    │   └── applicationRoutes.js
    ├── middlewares/
    │   └── auth.js              ← JWT verification
    ├── config/
    │   └── db.js                ← MongoDB Atlas connection
    └── server.js
```

---

## 🚀 Getting Started

### Prerequisites

```bash
node  >= 18.x
npm   >= 9.x
```

You'll also need a **MongoDB Atlas** account and cluster URI.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CareerBridge.git
cd CareerBridge
```

### 2. Install All Dependencies

```bash
# Install root dependencies (concurrently)
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd backend && npm install && cd ..
```

### 3. Configure Environment Variables

See the [Environment Variables](#-environment-variables) section below, then create your `.env` file inside `backend/`.

### 4. Run the App

```bash
# ✅ Run BOTH frontend + backend simultaneously (from root)
npm run start

# Or run individually:
cd frontend && npm run dev       # → http://localhost:5173
cd backend  && npm run dev       # → http://localhost:4000
```

---

## 🔑 Environment Variables

Create a file at `backend/.env`:

```env
# ─── Server ────────────────────────────────────────────
PORT=4000
NODE_ENV=development

# ─── Database ──────────────────────────────────────────
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/careerbridge

# ─── Authentication ────────────────────────────────────
JWT_SECRET_KEY=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

# ─── CORS ──────────────────────────────────────────────
FRONTEND_URL=http://localhost:5173
```

> ⚠️ **Never commit your `.env` file.** Add it to `.gitignore`.

---

## 📡 API Endpoints

All routes are prefixed with `/api/v1`.

### 👤 User Routes — `/api/v1/user`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/register` | Public | Register a new user |
| `POST` | `/login` | Public | Login and receive JWT cookie |
| `GET` | `/logout` | Authenticated | Clear cookie and logout |
| `GET` | `/me` | Authenticated | Fetch current user profile |

### 💼 Job Routes — `/api/v1/job`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/getall` | Public | Fetch all job listings |
| `POST` | `/post` | Employer | Post a new job |
| `GET` | `/getmyjobs` | Employer | Fetch employer's posted jobs |
| `PUT` | `/update/:id` | Employer | Update a job listing |
| `DELETE` | `/delete/:id` | Employer | Delete a job listing |
| `GET` | `/:id` | Public | Fetch single job by ID |

### 📋 Application Routes — `/api/v1/application`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/post` | Job Seeker | Submit a job application |
| `GET` | `/employer/getall` | Employer | Get all applications for employer's jobs |
| `GET` | `/jobseeker/getall` | Job Seeker | Get all applications by current user |
| `DELETE` | `/delete/:id` | Job Seeker | Withdraw an application |

---

## 🔐 Auth Flow

```
1. User registers → password hashed with bcrypt → saved to MongoDB
2. User logs in → JWT signed with JWT_SECRET_KEY → stored in HTTP-only cookie
3. Protected route hit → auth.js middleware reads cookie → verifies JWT
4. Token valid → req.user populated → controller executes
5. Token invalid / expired → 401 Unauthorized returned
6. Logout → cookie cleared on server side
```

**Role-based access** is enforced at the middleware level. Employers can only access employer routes; job seekers can only access job seeker routes.

---

## 🌐 Deployment

### Frontend → Vercel

```bash
# 1. Push your frontend folder to GitHub
# 2. Import the repo on vercel.com
# 3. Set root directory to: frontend
# 4. Add environment variable:
VITE_API_URL=https://your-backend.onrender.com/api/v1
```

### Backend → Render

```bash
# 1. Create a new Web Service on render.com
# 2. Connect your GitHub repo
# 3. Set:
#    Root Directory: backend
#    Build Command:  npm install
#    Start Command:  npm run start
# 4. Add all environment variables from .env
```

### Database → MongoDB Atlas

```
1. Create a free cluster at cloud.mongodb.com
2. Create a DB user with read/write access
3. Whitelist IPs (0.0.0.0/0 for Render dynamic IPs)
4. Copy the connection string to MONGO_URI in your .env
```

---

## 🗺️ Roadmap

| Status | Feature |
|--------|---------|
| ✅ Done | JWT authentication & role-based access |
| ✅ Done | Job posting, browsing, and applying |
| ✅ Done | Application management for both roles |
| 🔜 Planned | Resume/file upload for applications |
| 🔜 Planned | Email notifications (Nodemailer) |
| 🔜 Planned | Admin dashboard |
| 🔜 Planned | Job search with filters (location, salary, category) |
| 🔜 Planned | Employer profile pages |
| 🔜 Planned | Pagination for job listings |
| 🔜 Planned | Real-time notifications (Socket.io) |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "feat: add your feature description"

# 4. Push and open a Pull Request
git push origin feature/your-feature-name
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ using the **MERN Stack**

⭐ Star this repo if you found it helpful!

[![GitHub stars](https://img.shields.io/github/stars/your-username/CareerBridge?style=social)](https://github.com/abhinavkg27/CareerBridge)

</div>