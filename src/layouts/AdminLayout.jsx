/* eslint-disable react/react-in-jsx-scope */
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useMemo } from "react";

const ACCENT = "#fea434";

/* -------------------------------------------------------
   ROUTES (static → no re-creation each render)
------------------------------------------------------- */
const routes = [
  { label: "Blog Manager", path: "/admin" },
  { label: "News & Events", path: "/admin/news-events" },
  { label: "Contact Messages", path: "/admin/contact-messages" },
  { label: "Subscribers", path: "/admin/subscribers" },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  /* -------------------------------------------------------
     SAFER PATH MATCHING
     Prevents "/admin" hijacking other routes
  ------------------------------------------------------- */
  const currentTab = useMemo(() => {
    const sorted = [...routes].sort(
      (a, b) => b.path.length - a.path.length
    );

    const match = sorted.find(
      (r) =>
        location.pathname === r.path ||
        location.pathname.startsWith(r.path + "/")
    );

    return match?.path || false;
  }, [location.pathname]);

  /* -------------------------------------------------------
     LOGOUT HANDLER
  ------------------------------------------------------- */
  const handleLogout = () => {
    localStorage.removeItem("adminToken");

    // Hard redirect ensures full state reset
    window.location.href = "/admin-login";
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f6f7f9",
      }}
    >
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          px: 4,
          py: 2,
          bgcolor: "white",
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          fontWeight={600}
          fontSize={20}
          color={ACCENT}
        >
          Admin Portal
        </Typography>

        <Box display="flex" alignItems="center" gap={3}>
          <Typography fontSize={13} color="text.secondary">
            JumpStart Your Career CMS
          </Typography>

          <Button
            variant="outlined"
            size="small"
            onClick={handleLogout}
            sx={{
              borderColor: ACCENT,
              color: ACCENT,
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "rgba(254,164,52,0.12)",
                borderColor: ACCENT,
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* ================= TABS ================= */}
      <Box
        sx={{
          bgcolor: "white",
          borderBottom: "1px solid #e0e0e0",
          px: 3,
        }}
      >
        <Tabs
          value={currentTab}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          TabIndicatorProps={{
            style: {
              backgroundColor: ACCENT,
              height: 3,
              borderRadius: 3,
            },
          }}
          sx={{
            minHeight: 48,

            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              fontSize: 14,
              color: "#666",
              borderRadius: 2,
              mx: 0.5,
              minHeight: 42,
              cursor: "pointer",
              transition:
                "background-color .18s ease, color .18s ease, transform .05s ease",

              "&:hover": {
                color: ACCENT,
                backgroundColor: "rgba(254,164,52,0.10)",
              },

              "&:active": {
                transform: "scale(0.97)",
              },
            },

            "& .Mui-selected": {
              color: `${ACCENT} !important`,
              backgroundColor: "rgba(254,164,52,0.14)",
            },

            "& .Mui-selected:hover": {
              backgroundColor: "rgba(254,164,52,0.22)",
            },
          }}
        >
          {routes.map((r) => (
            <Tab
              key={r.path}
              label={r.label}
              value={r.path}
              component={Link}
              to={r.path}
            />
          ))}
        </Tabs>
      </Box>

      {/* ================= CONTENT ================= */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          px: 4,
          py: 4,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;