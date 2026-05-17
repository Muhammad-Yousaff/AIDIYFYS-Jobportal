# AIDIYFYS Job Portal - Backend Documentation

## Overview
Complete backend API for a full-stack job portal application built with Node.js, Express, and MongoDB.

## Features Implemented

### 1. Authentication & Authorization
- User Registration (Job Seeker, Recruiter, Admin)
- Login with JWT
- Password Reset & Recovery
- Token Verification
- Role-based Access Control

### 2. User Management
- User Profile Management
- Profile Picture Upload
- Password Change
- Account Deletion
- Save/Unsave Jobs

### 3. Job Management
- Create, Read, Update, Delete Jobs
- Job Search & Filtering
- Job Status Management (Open, Closed, On Hold)
- Company-wise Job Listing
- Advanced Search with Text Indexing

### 4. Job Applications
- Apply for Jobs
- Application Status Tracking
- Interview Scheduling
- Applicant Notes
- Application Statistics
- Application Withdrawal

### 5. Resume Management
- Resume Upload (PDF, DOC, DOCX)
- AI Resume Analysis (Mock Implementation)
- Skills Extraction
- Resume Quality Scoring
- Improvement Suggestions
- CV Builder Integration

### 6. Company Management
- Create & Manage Companies
- Company Verification
- Company Statistics
- Multi-recruiter Support
- Company Profile Management

### 7. Admin Dashboard
- User Management
- Job Moderation
- Company Verification
- Statistics & Analytics
- Report Generation

## Installation

### Prerequisites
- Node.js 14+
- MongoDB 4.0+
- npm or yarn

### Setup Steps

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in the backend root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/job-portal
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=./uploads
   FRONTEND_URL=http://localhost:3000
   ```

3. **Start the server:**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - User Registration
- `POST /login` - User Login
- `POST /forgot-password` - Forgot Password
- `POST /reset-password` - Reset Password
- `GET /verify-token` - Verify JWT Token

### Users (`/api/users`)
- `GET /profile` - Get User Profile
- `PUT /profile` - Update Profile
- `POST /upload-profile-picture` - Upload Profile Picture
- `POST /change-password` - Change Password
- `POST /save-job` - Save a Job
- `POST /remove-saved-job` - Unsave a Job
- `GET /saved-jobs` - Get Saved Jobs
- `DELETE /account` - Delete Account

### Jobs (`/api/jobs`)
- `GET /` - Get All Jobs (with filters)
- `GET /search` - Search Jobs
- `GET /:id` - Get Job Details
- `POST /` - Create Job (Recruiter)
- `PUT /:id` - Update Job (Recruiter)
- `DELETE /:id` - Delete Job (Recruiter)
- `PATCH /:id/close` - Close Job (Recruiter)
- `GET /company/:companyId` - Get Company Jobs

### Applications (`/api/applications`)
- `POST /apply` - Apply for Job
- `GET /my-applications` - Get User Applications
- `GET /job/:jobId/applications` - Get Job Applications (Recruiter)
- `PATCH /:applicationId/status` - Update Application Status
- `POST /:applicationId/withdraw` - Withdraw Application
- `POST /:applicationId/note` - Add Interview Note
- `GET /job/:jobId/stats` - Get Application Statistics

### Resume (`/api/resume`)
- `POST /upload` - Upload Resume
- `POST /analyze` - Analyze Resume (AI)
- `GET /analysis` - Get Analysis Results
- `DELETE /` - Delete Resume
- `GET /download` - Download Resume
- `POST /cv-template` - Save CV Template
- `GET /cv-template` - Get CV Template

### Companies (`/api/companies`)
- `POST /` - Create Company (Recruiter)
- `GET /` - Get All Companies
- `GET /:companyId` - Get Company Details
- `PUT /:companyId` - Update Company
- `POST /:companyId/logo` - Upload Company Logo
- `GET /:companyId/stats` - Get Company Statistics

### Admin (`/api/admin`)
- `GET /dashboard/stats` - Dashboard Statistics
- `GET /users` - Get All Users
- `PATCH /users/:userId/toggle-status` - Block/Unblock User
- `PATCH /companies/:companyId/verify` - Verify Company
- `DELETE /jobs/:jobId` - Delete Job
- `GET /companies` - Get All Companies
- `GET /analytics` - Get Analytics & Reports

## Database Models

### User
- Basic Info (name, email, phone)
- Authentication (password with bcrypt)
- Role (job_seeker, recruiter, admin)
- Profile (bio, location, profileImage)
- Resume Management
- Saved Jobs
- Account Status

### Job
- Job Details (title, description, location)
- Company Reference
- Employment Type & Category
- Salary Range
- Requirements (skills, experience, qualifications)
- Application Deadline
- Status Management

### Application
- Job & Applicant References
- Resume & Cover Letter
- Status Tracking
- Interview Notes & Feedback
- Notifications

### Company
- Company Info
- Recruiter Management
- Job Listings
- Verification Status
- Statistics

### Blog (Optional)
- Blog Post Management
- Comments & Engagement
- Categorization & Tags

## Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## File Upload

Files are uploaded to the `uploads/` directory with:
- Size limit: 5MB (configurable)
- Allowed types: PDF, DOC, DOCX for resumes
- Unique filenames with timestamps

## Error Handling

All endpoints return consistent error responses:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Role-based access control
- File upload validation
- Input validation
- CORS enabled
- Secure file storage

## Future Enhancements

1. **Email Notifications** - Send emails for applications, status updates
2. **AI Resume Analysis** - Integrate with OpenAI/HuggingFace for real analysis
3. **Job Recommendations** - ML-based job matching
4. **Video Interviews** - Integration with video conferencing
5. **Real-time Notifications** - WebSocket implementation
6. **Payment Integration** - For premium features
7. **Analytics Dashboard** - Advanced charts and reports
8. **Notification System** - In-app and email notifications

## Support & Contribution

For issues, bugs, or contributions, please submit via GitHub.

---

**Backend Setup Complete! ✅**
