import { BASE_URL } from "./BASE_URL";

const DB_KEY = "__aidifys_mock_db_v1";

const defaultImage = "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80";

const seededUsers = [
  {
    id: "u-admin",
    firstName: "Usama",
    lastName: "Admin",
    email: "usama.mang0901@gmail.com",
    password: "admin123",
    phoneNumber: "1234567890",
    likedJobs: [],
  },
  {
    id: "u-demo",
    firstName: "Demo",
    lastName: "User",
    email: "demo@aidifys.com",
    password: "demo123",
    phoneNumber: "9998887777",
    likedJobs: [],
  },
];

const seedJobs = () => {
  const now = new Date();
  const categories = [
    "InformationTechnology",
    "Healthcare-Nursing",
    "Engineering-Technical",
    "Sales-Marketing",
    "Hospitality-Catering",
    "AccountingFinance",
    "Construction-Trades",
  ];
  const locations = ["London", "Manchester", "Birmingham", "Liverpool", "Dubai"];
  const companies = [
    { name: "NovaTech", id: "c-novatech" },
    { name: "CareBridge", id: "c-carebridge" },
    { name: "BuildCore", id: "c-buildcore" },
    { name: "MarketNest", id: "c-marketnest" },
  ];

  return Array.from({ length: 18 }).map((_, i) => {
    const company = companies[i % companies.length];
    const category = categories[i % categories.length];
    const location = locations[i % locations.length];
    const posted = new Date(now);
    posted.setDate(now.getDate() - i * 2);

    return {
      _id: `job-${i + 1}`,
      slug: `job-${i + 1}-${category.toLowerCase()}`,
      jobTitle: [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Engineer",
        "Registered Nurse",
        "Data Analyst",
        "Project Manager",
      ][i % 6],
      companyName: company.name,
      companyId: company.id,
      image: defaultImage,
      minPrice: 25000 + i * 900,
      maxPrice: 35000 + i * 1200,
      salaryType: "Yearly",
      jobLocation: location,
      jobPosting: posted.toISOString(),
      createdAt: posted.toISOString(),
      experienceLevel: ["Fresher", "1-Year", "2-Years", "Mid-Level"][i % 4],
      employmentType: ["Full-time", "Part-time", "Remote", "Hybrid"][i % 4],
      postedBy: i % 2 === 0 ? "usama.mang0901@gmail.com" : "demo@aidifys.com",
      category,
      skills: ["Communication", "React", "Teamwork", "Problem Solving"].slice(0, 2 + (i % 3)),
      description: "We are hiring motivated candidates for this role. Please apply with your latest CV.",
    };
  });
};

const seedBlogs = () => {
  const now = new Date();
  return Array.from({ length: 8 }).map((_, i) => {
    const created = new Date(now);
    created.setDate(now.getDate() - i * 4);
    return {
      _id: `blog-${i + 1}`,
      slug: `career-growth-guide-${i + 1}`,
      title: `Career Growth Guide ${i + 1}`,
      content: `<p>Practical hiring and career advice edition ${i + 1}.</p>`,
      description: "Actionable tips to improve your job search and interview outcomes.",
      alttag: "Career blog",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
      createdAt: created.toISOString(),
      createdBy: i % 2 === 0 ? "usama.mang0901@gmail.com" : "demo@aidifys.com",
    };
  });
};

const seedDB = () => ({
  users: seededUsers,
  jobs: seedJobs(),
  blogs: seedBlogs(),
  applications: [],
  pendingSignups: {},
  resetTokens: {},
});

const readDB = () => {
  const raw = localStorage.getItem(DB_KEY);
  if (!raw) {
    const db = seedDB();
    localStorage.setItem(DB_KEY, JSON.stringify(db));
    return db;
  }
  try {
    return JSON.parse(raw);
  } catch {
    const db = seedDB();
    localStorage.setItem(DB_KEY, JSON.stringify(db));
    return db;
  }
};

const writeDB = (db) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

const jsonResponse = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const paginate = (items, page, limit) => {
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.max(1, Number(limit) || 10);
  const start = (safePage - 1) * safeLimit;
  const end = start + safeLimit;
  const sliced = items.slice(start, end);
  return {
    jobs: sliced,
    totalJobs: items.length,
    totalPages: Math.ceil(items.length / safeLimit) || 1,
  };
};

const getBearerToken = (headers) => {
  const authHeader = headers.get("Authorization") || headers.get("authorization") || "";
  return authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
};

const parseTokenUser = (db, token) => {
  if (!token) return null;
  const tokenUserId = token.replace("mock-token-", "");
  return db.users.find((u) => u.id === tokenUserId) || null;
};

const getRequestBody = async (req) => {
  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return req.json();
  }
  if (contentType.includes("multipart/form-data")) {
    return req.formData();
  }
  return null;
};

const matchesMockUrl = (urlString) => {
  if (urlString === "Add Cloudinary link") return true;
  return urlString.startsWith(BASE_URL);
};

const installMockBackend = () => {
  if (window.__aidifysMockInstalled) return;
  window.__aidifysMockInstalled = true;

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input, init = {}) => {
    const req = input instanceof Request ? input : new Request(input, init);
    const urlString = typeof input === "string" ? input : input.url;

    if (!matchesMockUrl(urlString)) {
      return originalFetch(input, init);
    }

    if (urlString === "Add Cloudinary link") {
      return jsonResponse({ secure_url: defaultImage });
    }

    const url = new URL(req.url, window.location.origin);
    const method = req.method.toUpperCase();
    const path = url.pathname;
    const page = url.searchParams.get("page");
    const limit = url.searchParams.get("limit");

    const db = readDB();

    try {
      if (path === "/login" && method === "POST") {
        const { email, password } = await req.json();
        const user = db.users.find((u) => u.email.toLowerCase() === String(email).toLowerCase() && u.password === password);
        if (!user) return jsonResponse({ message: "Invalid credentials" }, 401);
        return jsonResponse({
          name: `${user.firstName} ${user.lastName}`,
          token: `mock-token-${user.id}`,
          userId: user.id,
          likedJobs: user.likedJobs || [],
        });
      }

      if (path === "/signup" && method === "POST") {
        const payload = await req.json();
        const email = String(payload.email || "").toLowerCase();
        const existing = db.users.some((u) => u.email.toLowerCase() === email);
        if (existing) return jsonResponse({ message: "User already exists" }, 400);
        db.pendingSignups[email] = payload;
        writeDB(db);
        return jsonResponse({ message: "OTP sent" });
      }

      if (path === "/verify-otp" && method === "POST") {
        const payload = await req.json();
        const email = String(payload.email || "").toLowerCase();
        const pending = db.pendingSignups[email];
        if (!pending) return jsonResponse({ message: "No pending signup found" }, 400);
        const newUser = {
          id: `u-${Date.now()}`,
          firstName: pending.firstName,
          lastName: pending.lastName,
          email: pending.email,
          password: pending.password,
          phoneNumber: pending.phoneNumber,
          likedJobs: [],
        };
        db.users.push(newUser);
        delete db.pendingSignups[email];
        writeDB(db);
        return jsonResponse({ message: "Account created" });
      }

      if (path === "/resend-otp" && method === "POST") {
        return jsonResponse({ message: "OTP resent successfully!" });
      }

      if (path === "/forgot-password" && method === "POST") {
        const { email } = await req.json();
        const user = db.users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
        if (!user) return jsonResponse({ message: "Email not found" }, 404);
        const token = `reset-${Date.now()}`;
        db.resetTokens[token] = user.id;
        writeDB(db);
        return jsonResponse({ message: "Password reset email sent", token });
      }

      if (path === "/reset-password" && method === "POST") {
        const { token, newPassword } = await req.json();
        const userId = db.resetTokens[token];
        if (!userId) return jsonResponse({ message: "Invalid token" }, 400);
        const user = db.users.find((u) => u.id === userId);
        if (!user) return jsonResponse({ message: "User not found" }, 404);
        user.password = newPassword;
        delete db.resetTokens[token];
        writeDB(db);
        return jsonResponse({ message: "Password reset successful" });
      }

      if (path === "/all-jobs" && method === "GET") {
        return jsonResponse(db.jobs);
      }

      if (path.startsWith("/all-jobs/") && method === "GET") {
        const id = path.replace("/all-jobs/", "");
        const job = db.jobs.find((j) => j._id === id);
        if (!job) return jsonResponse({ message: "Job not found" }, 404);
        return jsonResponse(job);
      }

      if (path.startsWith("/job/") && method === "GET") {
        const slug = path.replace("/job/", "");
        const job = db.jobs.find((j) => j.slug === slug || j._id === slug);
        if (!job) return jsonResponse({ message: "Job not found" }, 404);
        return jsonResponse(job);
      }

      if (path.startsWith("/job/") && method === "DELETE") {
        const id = path.replace("/job/", "");
        db.jobs = db.jobs.filter((j) => j._id !== id);
        writeDB(db);
        return jsonResponse({ acknowledged: true });
      }

      if (path === "/post-job" && method === "POST") {
        const { data } = await req.json();
        const newId = `job-${Date.now()}`;
        const newJob = {
          _id: newId,
          slug: (data.jobTitle || "job").toLowerCase().replace(/\s+/g, "-") + `-${Date.now()}`,
          createdAt: new Date().toISOString(),
          companyId: `c-${(data.companyName || "company").toLowerCase().replace(/\s+/g, "-")}`,
          ...data,
        };
        db.jobs.unshift(newJob);
        writeDB(db);
        return jsonResponse({ status: true, message: "Job added successfully" });
      }

      if (path === "/update-job" && method === "POST") {
        const payload = await req.json();
        const idx = db.jobs.findIndex((j) => j._id === payload._id);
        if (idx < 0) return jsonResponse({ status: false, message: "Job not found" }, 404);
        db.jobs[idx] = { ...db.jobs[idx], ...payload };
        writeDB(db);
        return jsonResponse({ status: true, message: "Job updated" });
      }

      if (path === "/job/like" && method === "POST") {
        const payload = await req.json();
        const token = getBearerToken(req.headers);
        const tokenUser = parseTokenUser(db, token);
        const user = tokenUser || db.users.find((u) => u.id === payload.userId);
        if (!user) return jsonResponse({ success: false, message: "Unauthorized" }, 401);

        const liked = new Set(user.likedJobs || []);
        if (payload.action === "unlike") liked.delete(payload.slug);
        else liked.add(payload.slug);
        user.likedJobs = Array.from(liked);
        writeDB(db);
        return jsonResponse({ success: true, message: "Updated likes" });
      }

      if (path.startsWith("/myJobs/") && method === "GET") {
        const email = decodeURIComponent(path.replace("/myJobs/", ""));
        const dateRange = url.searchParams.get("dateRange") || "all";
        const now = new Date();
        let jobs = db.jobs.filter((j) => String(j.useremail || j.postedBy || "").toLowerCase() === email.toLowerCase());

        if (dateRange !== "all") {
          const months = Number(String(dateRange).split("-")[0]) || 0;
          if (months > 0) {
            const cutoff = new Date(now);
            cutoff.setMonth(cutoff.getMonth() - months);
            jobs = jobs.filter((j) => new Date(j.createdAt || j.jobPosting) >= cutoff);
          }
        }
        jobs.sort((a, b) => new Date(b.createdAt || b.jobPosting) - new Date(a.createdAt || a.jobPosting));
        return jsonResponse(paginate(jobs, page, limit));
      }

      if (path === "/user-applied-jobs" && method === "GET") {
        const token = getBearerToken(req.headers);
        const user = parseTokenUser(db, token);
        if (!user) return jsonResponse({ jobs: [], totalPages: 1, totalJobs: 0 }, 200);
        const userApps = db.applications.filter((a) => a.userEmail === user.email);
        const jobs = userApps
          .map((app) => {
            const found = db.jobs.find((j) => j._id === app.jobId || j.slug === app.slug);
            return found ? { ...found, appliedAt: app.appliedAt } : null;
          })
          .filter(Boolean);
        return jsonResponse(paginate(jobs, page, limit));
      }

      if (path.startsWith("/company-jobs/") && method === "GET") {
        const companyId = decodeURIComponent(path.replace("/company-jobs/", ""));
        const jobs = db.jobs.filter((j) => j.companyId === companyId);
        return jsonResponse(paginate(jobs, page, limit));
      }

      if (path.startsWith("/location-jobs/") && method === "GET") {
        const location = decodeURIComponent(path.replace("/location-jobs/", ""));
        const jobs = db.jobs.filter((j) => String(j.jobLocation || "").toLowerCase() === location.toLowerCase());
        return jsonResponse(paginate(jobs, page, limit));
      }

      if (path.startsWith("/categories/") && method === "GET") {
        const category = decodeURIComponent(path.replace("/categories/", ""));
        const jobs = db.jobs.filter((j) => String(j.category || "").toLowerCase() === category.toLowerCase());
        return jsonResponse(paginate(jobs, page, limit));
      }

      if (path === "/apply" && method === "POST") {
        const token = getBearerToken(req.headers);
        const user = parseTokenUser(db, token);
        if (!user) return jsonResponse({ message: "Unauthorized" }, 401);
        const form = await getRequestBody(req);
        db.applications.unshift({
          id: `app-${Date.now()}`,
          userEmail: user.email,
          name: form.get("name"),
          email: form.get("email"),
          coverLetter: form.get("coverLetter"),
          jobId: form.get("jobId"),
          slug: db.jobs.find((j) => j._id === form.get("jobId"))?.slug,
          appliedAt: new Date().toISOString(),
        });
        writeDB(db);
        return jsonResponse({ message: "Application submitted successfully" });
      }

      if (path === "/blogs" && method === "GET") {
        const safePage = Math.max(1, Number(page) || 1);
        const safeLimit = Math.max(1, Number(limit) || 9);
        const sorted = [...db.blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const start = (safePage - 1) * safeLimit;
        const paged = sorted.slice(start, start + safeLimit);
        return jsonResponse({
          blogs: paged,
          totalPages: Math.ceil(sorted.length / safeLimit) || 1,
        });
      }

      if (path === "/create-blog" && method === "POST") {
        const form = await getRequestBody(req);
        const title = form.get("title");
        const content = form.get("content");
        const description = form.get("description");
        const alttag = form.get("alttag");
        const id = `blog-${Date.now()}`;
        db.blogs.unshift({
          _id: id,
          slug: String(title || "blog").toLowerCase().replace(/\s+/g, "-") + `-${Date.now()}`,
          title,
          content,
          description,
          alttag,
          imageUrl: defaultImage,
          createdAt: new Date().toISOString(),
        });
        writeDB(db);
        return jsonResponse({ message: "Blog added" });
      }

      if (path.startsWith("/blog-detail/") && method === "GET") {
        const slug = decodeURIComponent(path.replace("/blog-detail/", ""));
        const blog = db.blogs.find((b) => b.slug === slug);
        if (!blog) return jsonResponse({ message: "Blog not found" }, 404);
        return jsonResponse({ blog });
      }

      if (path.startsWith("/delete-blog/") && method === "DELETE") {
        const id = decodeURIComponent(path.replace("/delete-blog/", ""));
        db.blogs = db.blogs.filter((b) => b._id !== id);
        writeDB(db);
        return jsonResponse({ message: "Blog deleted successfully" });
      }

      if (path.startsWith("/user-info/") && method === "GET") {
        const email = decodeURIComponent(path.replace("/user-info/", ""));
        const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (!user) return jsonResponse({ message: "User not found" }, 404);
        return jsonResponse({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          likedJobs: user.likedJobs || [],
        });
      }

      return jsonResponse({ message: `No mock route for ${method} ${path}` }, 404);
    } catch (error) {
      return jsonResponse({ message: error.message || "Mock backend error" }, 500);
    }
  };
};

export default installMockBackend;
