/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Box, Tabs, Tab } from "@mui/material";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { ErrorBoundary } from "react-error-boundary";

import BlogManager from "../../components/admin/BlogManager";
import NewsEventsManagement from "../../components/admin/NewsEventsManagement";
import ContactAdmin from "../../components/admin/ContactAdmin";

// ===== Error Fallback Component =====
function AdminErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Box sx={{ p: 3, bgcolor: "#ffeeee", borderRadius: 2 }}>
      <Box sx={{ color: "red", fontWeight: 700, mb: 1 }}>
        Something went wrong in the Admin section.
      </Box>
      <Box sx={{ mb: 2 }}>
        <pre style={{ fontSize: 12 }}>{error?.message}</pre>
      </Box>
      <Box>
        <button onClick={resetErrorBoundary}>Reload</button>
      </Box>
    </Box>
  );
}

export default function AdminPage() {
  const navigate = useNavigate();
  const location = useLocation();

  /* ========= Route → Tab mapping ========= */
  const routes = [
    "/admin/blog",
    "/admin/news-events",
    "/admin/contact-messages",
  ];

  const currentTab = routes.indexOf(location.pathname);

  const handleTabChange = (_, newValue) => {
    navigate(routes[newValue]);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      {/* ===== Header ===== */}
      <Box sx={{ px: 4, py: 3, borderBottom: "1px solid #eee" }}>
        <Box sx={{ fontSize: 24, fontWeight: 700, color: "#fea434" }}>
          Admin Portal
        </Box>

        <Tabs
          value={currentTab === -1 ? 0 : currentTab}
          onChange={handleTabChange}
          sx={{
            mt: 2,
            "& .MuiTab-root": { fontWeight: 600, textTransform: "none" },
            "& .Mui-selected": { color: "#fea434" },
            "& .MuiTabs-indicator": { backgroundColor: "#fea434" },
          }}
        >
          <Tab label="Blog Manager" />
          <Tab label="News & Events" />
          <Tab label="Contact Messages" />
        </Tabs>
      </Box>

      {/* ===== Content ===== */}
      <Box sx={{ p: 4 }}>
        <Routes>
          <Route path="blog" element={<BlogManager />} />
          <Route path="news-events" element={<NewsEventsManagement />} />

          {/* Wrap ContactAdmin with Error Boundary */}
          <Route
            path="contact-messages"
            element={
              <ErrorBoundary
                FallbackComponent={AdminErrorFallback}
                onReset={() => window.location.reload()}
              >
                <ContactAdmin />
              </ErrorBoundary>
            }
          />

          {/* default route */}
          <Route path="/" element={<BlogManager />} />
        </Routes>
      </Box>
    </Box>
  );
}
