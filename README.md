# Madhan Raj B. — Full-Stack Personal Portfolio

A clean, modern, student-focused personal portfolio website for **Madhan Raj B.**, a 2nd Year Computer Science & Engineering student (Section CSE-C) and Aspiring Software Engineer.

Designed with authentic student aesthetics: clean typography, off-white background, dark charcoal text, warm terracotta/amber accents, honest project descriptions, and zero AI-slop or fake statistics.

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Features](#2-features)
3. [Technologies](#3-technologies)
4. [Folder Structure](#4-folder-structure)
5. [MongoDB Setup](#5-mongodb-setup)
6. [Environment Variables](#6-environment-variables)
7. [Local Installation](#7-local-installation)
8. [Running Frontend](#8-running-frontend)
9. [Running Backend](#9-running-backend)
10. [GitHub Upload](#10-github-upload)
11. [Vercel Deployment (Frontend)](#11-vercel-deployment-frontend)
12. [Render Deployment (Backend)](#12-render-deployment-backend)

---

## 1. Project Overview
This portfolio showcases:
- **Developer**: Madhan Raj B.
- **Academic Degree**: B.E. Computer Science and Engineering &bull; II Year (CSE-C)
- **Role**: Aspiring Software Engineer
- **Core Focus**: Java, Data Structures & Algorithms, Object-Oriented Programming, and Full-Stack Web Development (MERN).
- **Architecture**: Decoupled React frontend (Vite) + Express REST backend + MongoDB/Mongoose database with built-in resilience (automatic in-memory fallback if the database is offline).

---

## 2. Features
- **Clean Student UI**: No bloated animations, no fake progress bars, no excessive gradients.
- **Responsive Layout**: Fluid navigation and readable typography on mobile, tablet, and widescreen.
- **Dynamic Projects Section**: Projects are retrieved dynamically via `GET /api/projects`.
  - **RentWise**: Role-based rental management platform connecting tenants & landlords.
  - **Smart Parking Slot Management System**: QR-code bay scan occupancy verification.
  - **Algorithms Practice**: Java & C DSA solutions (Searching, Sorting, Binary Search, Greedy, Recursion, Linked Lists).
- **Working Contact Form**: Submits messages directly to `POST /api/contact` and stores them in MongoDB with receipt confirmation.
- **Admin Authentication**: Modification endpoints (`POST`, `PUT`, `DELETE` on `/api/projects` and `GET /api/contact`) protected via `ADMIN_KEY` header (`x-admin-key`).
- **Interactive Backend Inspector**: Built-in modal to test `/api/health`, inspect saved messages, and verify database connectivity directly from the UI.
- **Fault-Tolerant Offline Fallback**: If the backend or MongoDB is temporarily restarting, cached project data is presented seamlessly without a blank screen.

---

## 3. Technologies
### Frontend:
- **React.js 19**
- **Vite** (Ultra-fast build tool)
- **Tailwind CSS v4**
- **Lucide React** (Clean developer icons)

### Backend:
- **Node.js** (LTS)
- **Express.js 4**
- **MongoDB** with **Mongoose ODM**
- **CORS** & **Dotenv**

---

## 4. Folder Structure
```text
portfolio/
├── backend/
│   ├── models/
│   │   ├── Project.js          # Mongoose schema for projects
│   │   └── Contact.js          # Mongoose schema for contact messages
│   ├── routes/
│   │   ├── projectRoutes.js    # GET, POST, PUT, DELETE /api/projects
│   │   └── contactRoutes.js    # POST, GET /api/contact
│   ├── middleware/
│   │   └── admin.js            # Admin authentication middleware (ADMIN_KEY)
│   ├── server.js               # Standalone Express server entry point
│   ├── seed.js                 # Database seeder script
│   ├── package.json            # Backend dependencies
│   ├── .env.example            # Environment variables template
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── api.js              # Fetch client for Express REST API
│   │   ├── App.jsx             # Main application layout
│   │   ├── main.jsx            # React root mount
│   │   └── styles.css          # Tailwind CSS base styles
│   ├── index.html              # HTML entry point with Plus Jakarta Sans
│   ├── vite.config.js          # Vite configuration
│   ├── package.json            # Frontend dependencies
│   ├── .env.example
│   └── .gitignore
│
├── server.ts                   # Unified full-stack server (AI Studio & monolithic deploy)
├── package.json                # Root build & dependency scripts
└── README.md                   # Complete documentation
```

---

## 5. MongoDB Setup
You can use either a free **MongoDB Atlas cloud cluster** (recommended for production) or a **local MongoDB instance**:

### Using MongoDB Atlas (Free Tier):
1. Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new cluster (Shared / Free M0).
3. Under **Database Access**, create a database user (e.g., username `madhan`, choose a secure password).
4. Under **Network Access**, click **Add IP Address** &rarr; choose **Allow Access From Anywhere** (`0.0.0.0/0`) for hosting on Render/Vercel.
5. In your cluster dashboard, click **Connect** &rarr; **Drivers** &rarr; copy the connection string:
   ```
   mongodb+srv://madhan:<password>@cluster0.abcde.mongodb.net/madhan_portfolio?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your database user password and set it as `MONGO_URI` in `backend/.env`.

### Seed the Initial Data:
Once `MONGO_URI` is configured, run:
```bash
cd backend
npm run seed
```

---

## 6. Environment Variables

### Backend (`backend/.env`):
```env
# MongoDB connection URI (Atlas or local)
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.abcde.mongodb.net/madhan_portfolio?retryWrites=true&w=majority

# Port for Express API
PORT=5000

# Secret key protecting administrative endpoints
ADMIN_KEY=student_admin_secret_2025
```

### Frontend (`frontend/.env`):
```env
# URL where your Express backend is listening
VITE_API_URL=http://localhost:5000
```

---

## 7. Local Installation

### Clone the repository:
```bash
git clone https://github.com/madhanrajb/madhan-portfolio.git
cd madhan-portfolio
```

### Install Backend Dependencies:
```bash
cd backend
npm install
cp .env.example .env
```

### Install Frontend Dependencies:
```bash
cd ../frontend
npm install
cp .env.example .env
```

---

## 8. Running Frontend
From the `frontend` directory:
```bash
cd frontend
npm run dev
```
Open your browser at:
```
http://localhost:5173
```

---

## 9. Running Backend
From the `backend` directory:
```bash
cd backend
npm run dev
```
Your backend will start listening at:
```
http://localhost:5000
```
Verify the health check in your browser or terminal:
```bash
curl http://localhost:5000/api/health
```

---

## 10. GitHub Upload
1. Initialize Git in the project root (if not already initialized):
   ```bash
   git init
   git add .
   git commit -m "feat: complete full-stack portfolio for Madhan Raj B."
   ```
2. Create a new repository on GitHub named `madhan-portfolio`.
3. Add the remote and push:
   ```bash
   git remote add origin https://github.com/madhanrajb/madhan-portfolio.git
   git branch -M main
   git push -u origin main
   ```

---

## 11. Vercel Deployment (Frontend)
1. Sign in to [vercel.com](https://vercel.com) using your GitHub account.
2. Click **Add New** &rarr; **Project** and import your `madhan-portfolio` repository.
3. In **Project Settings**:
   - **Root Directory**: Click edit and select `frontend`.
   - **Framework Preset**: Vite.
   - **Build Command**: `npm run build`.
   - **Output Directory**: `dist`.
4. Under **Environment Variables**, add:
   - `VITE_API_URL`: `https://your-backend-service.onrender.com` (your Render URL from step 12).
5. Click **Deploy**. Vercel will provide your live HTTPS portfolio URL!

---

## 12. Render Deployment (Backend)
1. Sign in to [render.com](https://render.com).
2. Click **New +** &rarr; **Web Service**.
3. Connect your `madhan-portfolio` GitHub repository.
4. Configure the service settings:
   - **Name**: `madhan-portfolio-backend`
   - **Region**: Singapore or nearest
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `PORT`: `5000` (or `10000`)
   - `ADMIN_KEY`: Your secret admin key.
6. Click **Create Web Service**. Render will deploy your Express REST API.
7. Copy the service URL (e.g. `https://madhan-portfolio-backend.onrender.com`) and paste it into Vercel's `VITE_API_URL` variable.

---

## Author & Contact
- **Developer**: Madhan Raj B.
- **Email**: [madhanraj0171@gmail.com](mailto:madhanraj0171@gmail.com)
- **GitHub**: [github.com/madhanrajb](https://github.com/madhanrajb)
- **LinkedIn**: [linkedin.com/in/madhanrajb](https://linkedin.com/in/madhanrajb)
