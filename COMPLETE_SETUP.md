# AIDIYFYS Job Portal - Complete Setup Guide

## 📁 Project Structure
```
AIDIYFYS-Jobportal-main/
├── AIDIYFYS-Jobportal-main/      (Frontend - React)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ... (React frontend files)
└── backend/                       (Backend - Node.js + Express)
    ├── src/
    ├── package.json
    └── ... (API server files)
```

## 🚀 Quick Start - Both Frontend & Backend

### Step 1: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/job-portal
# PORT=5000
```

### Step 2: Start Backend Server

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB connected successfully
```

### Step 3: Frontend Setup & Run

**Terminal 2 - Frontend:**
```bash
# Navigate to frontend directory
cd AIDIYFYS-Jobportal-main

# Install dependencies (if not already installed)
npm install

# Create .env file
echo REACT_APP_API_URL=http://localhost:5000/api > .env

# Start development server
npm start
```

Frontend will open at: `http://localhost:3000`

---

## 📋 Prerequisites

### Required Software
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or cloud) - [Download](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js)

### Verify Installation
```bash
node --version
npm --version
mongod --version
```

---

## 🔧 MongoDB Setup

### Option A: Local MongoDB (Windows)

1. **Install MongoDB Community Edition:**
   - Download from: https://www.mongodb.com/try/download/community
   - Run installer and follow steps
   - Add MongoDB to system PATH

2. **Start MongoDB Service:**
   ```bash
   # Windows - run as Administrator
   mongod
   ```

3. **Update Backend .env:**
   ```
   MONGODB_URI=mongodb://localhost:27017/job-portal
   ```

### Option B: MongoDB Atlas (Cloud)

1. **Create Account:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account
   - Create organization and project

2. **Create Cluster:**
   - Click "Build a Cluster"
   - Choose shared (free tier)
   - Select region and create

3. **Get Connection String:**
   - Go to "Connect"
   - Choose "Connect your application"
   - Copy connection string

4. **Update Backend .env:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-portal?retryWrites=true&w=majority
   ```

---

## 🔌 Frontend-Backend Integration

### Update Frontend .env

Create `AIDIYFYS-Jobportal-main/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RESUME_AI_ENDPOINT=http://localhost:5000/api/resume/analyze
```

### Update Backend .env

Create `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/job-portal
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
FRONTEND_URL=http://localhost:3000
```

### Frontend API Usage

In your React components, use the API:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Example: Login
const handleLogin = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    if (data.success) {
      localStorage.setItem('token', data.token);
      // Redirect to dashboard
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Example: Get protected resource
const fetchUserProfile = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/users/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  return data.user;
};
```

---

## 🧪 Testing API Endpoints

### Using Postman

1. **Open Postman** (or use VS Code REST Client)

2. **Register User:**
   ```
   POST http://localhost:5000/api/auth/register
   Content-Type: application/json

   {
     "name": "Test User",
     "email": "test@example.com",
     "password": "password123",
     "confirmPassword": "password123",
     "role": "job_seeker"
   }
   ```

3. **Login:**
   ```
   POST http://localhost:5000/api/auth/login
   Content-Type: application/json

   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```

4. **Get Profile (requires token):**
   ```
   GET http://localhost:5000/api/users/profile
   Authorization: Bearer <JWT_TOKEN_FROM_LOGIN>
   ```

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 📦 Dependencies Overview

### Backend (`backend/package.json`)
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **multer** - File upload
- **cors** - Cross-origin requests
- **dotenv** - Environment variables

### Frontend (`package.json`)
- **react** - UI library
- **react-dom** - React rendering
- **axios** - HTTP client
- **react-router-dom** - Routing
- **tailwindcss** - CSS framework
- **react-icons** - Icon library

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Start MongoDB: `mongod` (or MongoDB service on Windows)
- Check MongoDB URI in `.env`
- Verify MongoDB is running on port 27017

### Port 5000 Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use different port in .env
PORT=5001
```

### CORS Error from Frontend
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution:**
- Update `FRONTEND_URL` in backend `.env`
- Ensure backend is running
- Check `REACT_APP_API_URL` in frontend `.env`

### npm install Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Frontend won't start
```bash
# Check if Node modules are installed
npm install

# Clear React cache
rm -rf node_modules/.cache

# Restart dev server
npm start
```

---

## 📊 Development Workflow

### Terminal Setup (Recommended)

**Terminal 1 - MongoDB:**
```bash
mongod
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
# Watches for changes, auto-restarts
```

**Terminal 3 - Frontend:**
```bash
cd AIDIYFYS-Jobportal-main
npm start
# Watches for changes, hot-reload
```

Now you have:
- ✅ MongoDB running on port 27017
- ✅ Backend API running on port 5000
- ✅ Frontend running on port 3000

---

## 🔐 Demo Credentials

**Job Seeker:**
- Email: `demo@aidifys.com`
- Password: `demo123`

**Recruiter:**
- Email: `recruiter@example.com`
- Password: `password123`

**Admin:**
- Email: `admin@example.com`
- Password: `admin123`

---

## 📝 API Documentation

For complete API reference, see: `backend/API_DOCUMENTATION.md`

Key endpoints:
- Authentication: `/api/auth/*`
- Users: `/api/users/*`
- Jobs: `/api/jobs/*`
- Applications: `/api/applications/*`
- Resume: `/api/resume/*`
- Companies: `/api/companies/*`
- Admin: `/api/admin/*`

---

## 🚀 Production Deployment

### Backend Deployment (Heroku/Railway)

1. **Build:**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables:**
   - Set in deployment platform dashboard
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV=production
   - FRONTEND_URL

### Frontend Deployment (Vercel/Netlify)

1. **Build:**
   ```bash
   cd AIDIYFYS-Jobportal-main
   npm run build
   ```

2. **Environment Variables:**
   - REACT_APP_API_URL=https://your-backend-url/api

---

## ✅ Checklist

Before running the project, ensure:

- [ ] Node.js and npm installed
- [ ] MongoDB installed and running
- [ ] Backend folder has `.env` file
- [ ] Frontend folder has `.env` file
- [ ] `npm install` run in both folders
- [ ] Three terminals open (MongoDB, Backend, Frontend)
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] CORS configured correctly

---

## 📚 Additional Resources

- **Express.js Docs:** https://expressjs.com/
- **MongoDB Docs:** https://docs.mongodb.com/
- **React Docs:** https://react.dev/
- **JWT Auth:** https://jwt.io/
- **Mongoose Docs:** https://mongoosejs.com/

---

**Setup Complete! 🎉**

Start developing your job portal!
