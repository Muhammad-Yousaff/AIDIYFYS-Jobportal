# AIDIYFYS Job Portal - Backend Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your settings:
```env
MONGODB_URI=mongodb://localhost:27017/job-portal
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_12345
JWT_EXPIRE=7d
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
FRONTEND_URL=http://localhost:3000
```

### 3. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Start MongoDB service
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in .env:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-portal?retryWrites=true&w=majority
```

### 4. Start Development Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

---

## Testing API Endpoints

### Using Postman or cURL

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123",
    "role": "job_seeker"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Get User Profile (requires token)
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Project Structure

```
backend/
├── src/
│   ├── server.js              # Main server entry point
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── controllers/           # Business logic
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── jobController.js
│   │   ├── applicationController.js
│   │   ├── resumeController.js
│   │   ├── companyController.js
│   │   └── adminController.js
│   ├── models/                # Mongoose schemas
│   │   ├── User.js
│   │   ├── Job.js
│   │   ├── Application.js
│   │   ├── Company.js
│   │   └── Blog.js
│   ├── routes/                # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── resumeRoutes.js
│   │   ├── companyRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/            # Custom middleware
│   │   ├── auth.js            # JWT authentication
│   │   └── upload.js          # File upload handling
│   └── utils/                 # Utility functions
│       ├── validation.js      # Input validation
│       ├── responseHandler.js # Response formatting
│       └── helpers.js         # Helper functions
├── uploads/                   # File storage
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

## Key Features

### ✅ Implemented
- [x] User Authentication (Register, Login, JWT)
- [x] User Profile Management
- [x] Job Posting & Management
- [x] Job Search & Filtering
- [x] Job Applications
- [x] Application Tracking
- [x] Resume Upload & Management
- [x] Resume Analysis (Mock)
- [x] Company Management
- [x] Admin Dashboard
- [x] File Upload (Multer)
- [x] Role-Based Access Control

### 🔄 Coming Soon
- [ ] Email Notifications
- [ ] Real AI Resume Analysis (OpenAI Integration)
- [ ] Video Interviews
- [ ] Notifications (WebSocket)
- [ ] Job Recommendations (ML)
- [ ] Payment Integration
- [ ] Advanced Analytics

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | User login |
| POST | `/auth/forgot-password` | Request password reset |
| POST | `/auth/reset-password` | Reset password |
| GET | `/auth/verify-token` | Verify JWT token |

### User Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/users/profile` | Get user profile | ✅ |
| PUT | `/users/profile` | Update profile | ✅ |
| POST | `/users/upload-profile-picture` | Upload avatar | ✅ |
| POST | `/users/change-password` | Change password | ✅ |
| POST | `/users/save-job` | Save job | ✅ |
| GET | `/users/saved-jobs` | Get saved jobs | ✅ |
| DELETE | `/users/account` | Delete account | ✅ |

### Job Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/jobs` | Get all jobs | ❌ |
| POST | `/jobs` | Create job | ✅ Recruiter |
| GET | `/jobs/:id` | Get job details | ❌ |
| PUT | `/jobs/:id` | Update job | ✅ Recruiter |
| DELETE | `/jobs/:id` | Delete job | ✅ Recruiter |

### Application Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/applications/apply` | Apply for job | ✅ Job Seeker |
| GET | `/applications/my-applications` | Get my applications | ✅ |
| GET | `/applications/job/:jobId/applications` | Get job applicants | ✅ Recruiter |
| PATCH | `/applications/:id/status` | Update status | ✅ Recruiter |

### Resume Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/resume/upload` | Upload resume | ✅ |
| POST | `/resume/analyze` | Analyze resume | ✅ |
| GET | `/resume/analysis` | Get analysis | ✅ |
| GET | `/resume/download` | Download resume | ✅ |

### Company Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/companies` | Get all companies | ❌ |
| POST | `/companies` | Create company | ✅ Recruiter |
| GET | `/companies/:id` | Get company details | ❌ |
| PUT | `/companies/:id` | Update company | ✅ Recruiter |

### Admin Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/admin/dashboard/stats` | Dashboard stats | ✅ Admin |
| GET | `/admin/users` | Get all users | ✅ Admin |
| GET | `/admin/analytics` | Get analytics | ✅ Admin |

---

## Frontend Integration

Update your frontend `.env` to point to backend:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Example frontend call:
```javascript
// In your React component
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Login
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const data = await response.json();
if (data.success) {
  localStorage.setItem('token', data.token);
}
```

---

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network access (for MongoDB Atlas)

### Port Already in Use
```bash
# Change PORT in .env or kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

### CORS Issues
- Update FRONTEND_URL in .env
- Ensure frontend and backend URLs match

### File Upload Issues
- Check uploads/ directory exists
- Verify file size doesn't exceed MAX_FILE_SIZE
- Check file MIME types

---

## Support

For issues or questions:
1. Check the README.md file
2. Review API documentation
3. Check console logs for error messages
4. Verify environment variables

---

**Backend Setup Complete! 🚀**
Happy coding!
