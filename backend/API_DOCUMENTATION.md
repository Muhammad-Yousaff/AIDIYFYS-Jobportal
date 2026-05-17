# AIDIYFYS Job Portal - Complete API Reference

## Base URL
```
http://localhost:5000/api
```

## Authentication Header Format
```
Authorization: Bearer {JWT_TOKEN}
```

---

## 🔐 Authentication Endpoints

### 1. User Registration
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "job_seeker" // or "recruiter"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "job_seeker"
  }
}
```

---

### 2. User Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "job_seeker",
    "profileImage": "uploads/profile-123.jpg"
  }
}
```

---

### 3. Forgot Password
**POST** `/auth/forgot-password`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset link sent to email",
  "resetToken": "token_for_reset"
}
```

---

### 4. Reset Password
**POST** `/auth/reset-password`

**Request Body:**
```json
{
  "token": "reset_token",
  "password": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

### 5. Verify Token
**GET** `/auth/verify-token`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "job_seeker",
    "profileImage": "uploads/profile-123.jpg"
  }
}
```

---

## 👤 User Endpoints

### 1. Get User Profile
**GET** `/users/profile`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "location": "New York",
    "bio": "Software Developer",
    "profileImage": "uploads/profile-123.jpg",
    "role": "job_seeker",
    "resume": {
      "filename": "resume.pdf",
      "url": "uploads/resume-123.pdf",
      "uploadedAt": "2024-01-15T10:30:00Z",
      "analysisResult": { ... }
    },
    "savedJobs": ["job_id_1", "job_id_2"],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 2. Update User Profile
**PUT** `/users/profile`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "bio": "Senior Software Developer",
  "phone": "9876543210",
  "location": "San Francisco"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

### 3. Upload Profile Picture
**POST** `/users/upload-profile-picture`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: multipart/form-data
```

**Form Data:**
```
profileImage: <file>
```

**Response:**
```json
{
  "success": true,
  "message": "Profile picture uploaded successfully",
  "profileImage": "uploads/profileImage-123456789.jpg"
}
```

---

### 4. Change Password
**POST** `/users/change-password`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### 5. Save Job
**POST** `/users/save-job`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

**Request Body:**
```json
{
  "jobId": "job_id_123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Job saved successfully"
}
```

---

### 6. Get Saved Jobs
**GET** `/users/saved-jobs`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "savedJobs": [
    {
      "id": "job_id_1",
      "title": "Software Engineer",
      "company": { ... },
      "location": "New York",
      "salary": { min: 80000, max: 120000 },
      ...
    }
  ]
}
```

---

### 7. Remove Saved Job
**POST** `/users/remove-saved-job`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

**Request Body:**
```json
{
  "jobId": "job_id_123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Job removed from saved"
}
```

---

### 8. Delete Account
**DELETE** `/users/account`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

**Request Body:**
```json
{
  "password": "your_password_to_confirm"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

---

## 💼 Job Endpoints

### 1. Get All Jobs
**GET** `/jobs`

**Query Parameters:**
```
page=1
limit=10
location=New York
category=Technology
jobType=Full-time
search=developer
```

**Response:**
```json
{
  "success": true,
  "jobs": [
    {
      "id": "job_id_123",
      "title": "Senior Software Engineer",
      "description": "We are looking for...",
      "location": "New York",
      "jobType": "Full-time",
      "category": "Technology",
      "salaryMin": 80000,
      "salaryMax": 120000,
      "currency": "USD",
      "requiredSkills": ["JavaScript", "React", "Node.js"],
      "experience": "5-10 years",
      "applicationDeadline": "2024-12-31",
      "applicantCount": 45,
      "status": "Open",
      "company": { ... },
      "postedBy": { ... },
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalJobs": 50
  }
}
```

---

### 2. Create Job
**POST** `/jobs`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Senior Software Engineer",
  "description": "We are looking for an experienced...",
  "location": "New York, NY",
  "jobType": "Full-time",
  "category": "Technology",
  "salaryMin": 80000,
  "salaryMax": 120000,
  "requiredSkills": ["JavaScript", "React", "Node.js"],
  "experience": "5-10 years",
  "qualifications": ["Bachelor's in CS", "5+ years experience"],
  "responsibilities": ["Design and develop", "Code review", "Mentoring"],
  "benefits": ["Health insurance", "401k", "Flexible hours"],
  "applicationDeadline": "2024-12-31",
  "companyId": "company_id_123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Job created successfully",
  "job": { ... }
}
```

---

### 3. Get Job Details
**GET** `/jobs/:id`

**Response:**
```json
{
  "success": true,
  "job": { ... }
}
```

---

### 4. Update Job
**PUT** `/jobs/:id`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "salaryMax": 150000
}
```

**Response:**
```json
{
  "success": true,
  "message": "Job updated successfully",
  "job": { ... }
}
```

---

### 5. Delete Job
**DELETE** `/jobs/:id`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

---

### 6. Close Job
**PATCH** `/jobs/:id/close`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "message": "Job closed successfully",
  "job": { ... }
}
```

---

### 7. Search Jobs
**GET** `/jobs/search`

**Query Parameters:**
```
query=python developer
page=1
limit=10
```

**Response:**
```json
{
  "success": true,
  "jobs": [ ... ],
  "pagination": { ... }
}
```

---

## 📋 Application Endpoints

### 1. Apply for Job
**POST** `/applications/apply`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

**Request Body:**
```json
{
  "jobId": "job_id_123",
  "coverLetter": "I am very interested in this position because..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "application": {
    "id": "app_id_123",
    "jobId": "job_id_123",
    "applicantId": "user_id",
    "status": "Applied",
    "appliedAt": "2024-01-15T10:30:00Z",
    "resume": { ... },
    "coverLetter": "..."
  }
}
```

---

### 2. Get My Applications
**GET** `/applications/my-applications`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Query Parameters:**
```
page=1
limit=10
status=Applied
```

**Response:**
```json
{
  "success": true,
  "applications": [
    {
      "id": "app_id_123",
      "jobId": { ... },
      "companyId": { ... },
      "status": "Applied",
      "appliedAt": "2024-01-15T10:30:00Z",
      "notifications": [ ... ]
    }
  ],
  "pagination": { ... }
}
```

---

### 3. Get Job Applications (Recruiter)
**GET** `/applications/job/:jobId/applications`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Query Parameters:**
```
page=1
limit=10
status=Under Review
```

**Response:**
```json
{
  "success": true,
  "applications": [
    {
      "id": "app_id_123",
      "applicantId": { ... },
      "status": "Under Review",
      "rating": 4,
      "feedback": "Good technical skills",
      "appliedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### 4. Update Application Status
**PATCH** `/applications/:applicationId/status`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "Interview",
  "feedback": "Great candidate, let's move to interview",
  "rating": 5
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application status updated",
  "application": { ... }
}
```

---

### 5. Withdraw Application
**POST** `/applications/:applicationId/withdraw`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "message": "Application withdrawn successfully"
}
```

---

### 6. Add Interview Note
**POST** `/applications/:applicationId/note`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

**Request Body:**
```json
{
  "content": "Candidate demonstrated strong problem-solving skills"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Note added successfully",
  "application": { ... }
}
```

---

## 📄 Resume Endpoints

### 1. Upload Resume
**POST** `/resume/upload`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: multipart/form-data
```

**Form Data:**
```
resume: <PDF/DOC/DOCX file>
```

**Response:**
```json
{
  "success": true,
  "message": "Resume uploaded successfully",
  "resume": {
    "filename": "resume.pdf",
    "url": "uploads/resume-123456789.pdf",
    "uploadedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 2. Analyze Resume
**POST** `/resume/analyze`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "message": "Resume analyzed successfully",
  "analysis": {
    "skills": ["JavaScript", "React", "Node.js", "MongoDB"],
    "score": 78,
    "suggestions": [
      "Add more specific project achievements",
      "Include quantifiable results",
      "Add certifications"
    ],
    "summary": "Strong technical foundation with good skills..."
  }
}
```

---

### 3. Get Resume Analysis
**GET** `/resume/analysis`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "analysis": { ... }
}
```

---

### 4. Delete Resume
**DELETE** `/resume/`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "message": "Resume deleted successfully"
}
```

---

### 5. Download Resume
**GET** `/resume/download`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:** Binary file download

---

## 🏢 Company Endpoints

### 1. Create Company
**POST** `/companies`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Tech Corp Inc",
  "email": "hr@techcorp.com",
  "phone": "1234567890",
  "website": "https://techcorp.com",
  "location": "San Francisco, CA",
  "industry": "Technology",
  "companySize": "1000-5000",
  "description": "Leading technology company...",
  "foundedYear": 2010,
  "socialLinks": {
    "linkedin": "https://linkedin.com/company/techcorp",
    "twitter": "https://twitter.com/techcorp"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Company created successfully",
  "company": { ... }
}
```

---

### 2. Get All Companies
**GET** `/companies`

**Query Parameters:**
```
page=1
limit=10
search=tech
```

**Response:**
```json
{
  "success": true,
  "companies": [
    {
      "id": "company_id_123",
      "name": "Tech Corp Inc",
      "email": "hr@techcorp.com",
      "location": "San Francisco, CA",
      "industry": "Technology",
      "logo": "uploads/logo-123.jpg",
      "jobsCount": 15,
      "applicantsCount": 120
    }
  ],
  "pagination": { ... }
}
```

---

### 3. Get Company Details
**GET** `/companies/:companyId`

**Response:**
```json
{
  "success": true,
  "company": {
    "id": "company_id_123",
    "name": "Tech Corp Inc",
    "email": "hr@techcorp.com",
    "phone": "1234567890",
    "website": "https://techcorp.com",
    "location": "San Francisco, CA",
    "industry": "Technology",
    "description": "...",
    "logo": "uploads/logo-123.jpg",
    "recruiters": [ ... ],
    "jobs": [ ... ],
    "jobsCount": 15,
    "applicantsCount": 120
  }
}
```

---

### 4. Update Company
**PUT** `/companies/:companyId`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated Company Name",
  "description": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Company updated successfully",
  "company": { ... }
}
```

---

## ⚙️ Admin Endpoints

### 1. Dashboard Statistics
**GET** `/admin/dashboard/stats`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 1500,
    "totalJobs": 350,
    "totalApplications": 5200,
    "totalCompanies": 45,
    "jobSeekers": 1200,
    "recruiters": 300,
    "openJobs": 280,
    "closedJobs": 70
  }
}
```

---

### 2. Get All Users
**GET** `/admin/users`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Query Parameters:**
```
page=1
limit=10
role=job_seeker
```

---

### 3. Toggle User Status
**PATCH** `/admin/users/:userId/toggle-status`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "message": "User activated/deactivated successfully"
}
```

---

### 4. Get Analytics
**GET** `/admin/analytics`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "analytics": {
    "applicationStats": [
      { "_id": "Applied", "count": 1500 },
      { "_id": "Interview", "count": 300 },
      { "_id": "Rejected", "count": 800 }
    ],
    "jobsByCategory": [ ... ],
    "applicationsByMonth": [ ... ]
  }
}
```

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Rate Limiting & Best Practices

1. **Authentication**: Always include JWT token in Authorization header
2. **File Upload**: Max file size 5MB, allowed types: PDF, DOC, DOCX
3. **Pagination**: Default limit 10, max limit 100
4. **Search**: Use query parameter for best results
5. **Error Handling**: Check success flag and handle errors appropriately

---

**API Documentation Complete! 📚**
