import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import { MyJobs } from "../Pages/MyJobs";
import Updatejob from "../Pages/Updatejob";
import Contact from "../Pages/Contact";
import CvBuilder from "../Pages/CvBuilder";
import TermsConditions from "../Pages/Term";
import Privacy from "../Pages/Privacy";
import Browsejobs from "../Pages/Browsejobs";
import JobDetails from "../Pages/Jobdetails";
import Companyjobs from "../Pages/Companyjobs";
import Jobloction from "../Pages/Jobloction";
import Companydetails from "../Pages/Companydetails";
import Categories from "../Pages/Categories";
import UserProfile from "../Pages/Userprofile";
import PrivateRouter from "./PrivateRouter"
import AppliedJobs from "../Pages/AppliedJobs";
import Savedjob from "../Pages/Savedjob";
import { BASE_URL } from "../utils/BASE_URL";
import ResertPass from "../Pages/ResertPass";
import Blog from "../Pages/Blog";
import Addblog from "../Pages/Addblog";
import Blogdetail from "../Pages/Blogdetail";
import About from "../Pages/Aboutus";
import Sitemap from "../Pages/Sitemap";
import NotFound from "../Pages/Notfound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "post-job",
        element: <PrivateRouter />,
        children: [
          { path: "", element: <CreateJob /> }
        ]
      },
      {
        path: "my-job",
        element: <PrivateRouter />,
        children: [
          { path: "", element: <MyJobs /> }
        ]
      },
      {
        path: "edit-job/:id",
        element: <Updatejob />,
        loader: ({ params }) => fetch(`${BASE_URL}/all-jobs/${params.id}`)
      },
      {
        path: "faq",
        element: <Companydetails />
      },
      {
        path: "contact",
        element: <Contact />
      },

      // {
      //   path: "cvbuilder",
      //   element: <CvBuilder />
      // },
      {
        path: "terms-conditions",
        element: <TermsConditions />
      },

      {
        path: "privacy",
        element: <Privacy />
      },
      {
        path: "browsejobs",
        element: <Browsejobs />
      },
      {
        path: "userprofile",
        element: <UserProfile />
      },
      {
        path: "job/:slug",
        element: <JobDetails />,
      },
      {
        path: "company-jobs/:companyId",
        element: <Companyjobs />,
      },
      {
        path: "location-jobs/:jobLocation",
        element: <Jobloction />,
      },
      {
        path: "categories/:category",
        element: <Categories />,
      },
      {
        path: "user-applied-jobs",
        element: <AppliedJobs />,
      },
      {
        path: "saved-jobs",
        element: <Savedjob />,
      },
      {
        path: "reset-password",
        element: <ResertPass />,
      },
      {
        path: "blog",
        element: <Blog />
      },
      {
        path: "add-blog",
        element: <Addblog />
      },
      {
        path: "blog-detail/:slug",
        element: <Blogdetail />,
      },
      {
        path: "about-us",
        element: <About />
      },
      {
        path: "sitemap",
        element: <Sitemap />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]

  },
]);

export default router;