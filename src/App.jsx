/* eslint-disable react/prop-types */
import React, { useState, Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import api from "./services/api";

/* ========= Lazy Pages ========= */
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Services = lazy(() => import("./pages/Services"));
const Team = lazy(() => import("./pages/Team"));
const NewsEvents = lazy(() => import("./pages/NewsEvents"));
const Blog = lazy(() => import("./pages/Blog"));
const Gallery = lazy(() => import("./pages/Gallery"));
const FAQs = lazy(() => import("./pages/FAQs"));
const Contact = lazy(() => import("./pages/Contact"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));

/* 🔥 ADMIN */
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const BlogManager = lazy(() => import("./components/admin/BlogManager"));
const NewsEventsManagement = lazy(() =>
  import("./components/admin/NewsEventsManagement")
);
const ContactAdmin = lazy(() => import("./components/admin/ContactAdmin"));
const SubscriberManagement = lazy(() =>
  import("./components/admin/SubscriberManagement")
);

/* ========= REAL AUTH GUARD ========= */
function ProtectedAdmin({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          setLoading(false);
          return;
        }

        await api.get("/admin/verify");

        setAuthorized(true);
      } catch {
        localStorage.removeItem("adminToken");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  if (loading) return null;

  return authorized ? children : <Navigate to="/admin-login" replace />;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <>
      {/* Hide public Navbar on admin pages */}
      {!isAdminRoute && <Navbar />}

      <Suspense
        fallback={
          <div style={{ textAlign: "center", marginTop: 50 }}>
            Loading...
          </div>
        }
      >
        <Routes>
          {/* ===== Public ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/news-events" element={<NewsEvents />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />

          {/* ===== Admin Login ===== */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* ===== Protected Admin Routes ===== */}
          <Route
            path="/admin/*"
            element={
              <ProtectedAdmin>
                <AdminLayout />
              </ProtectedAdmin>
            }
          >
            <Route index element={<BlogManager />} />
            <Route path="news-events" element={<NewsEventsManagement />} />
            <Route path="contact-messages" element={<ContactAdmin />} />
            <Route path="subscribers" element={<SubscriberManagement />} />
          </Route>

          {/* Optional 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;