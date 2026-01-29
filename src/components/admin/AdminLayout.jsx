/* eslint-disable react/prop-types */
import React from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const ACCENT = "#fea434";

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const currentTab = location.pathname.includes("news-events")
    ? 1
    : 0;

  return (
    <Box minHeight="100vh" bgcolor="#f6f7f9">
      {/* ===== HEADER ===== */}
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
        <Typography fontWeight={700} fontSize={20} color={ACCENT}>
          Admin Portal
        </Typography>

        <Typography fontSize={13} color="text.secondary">
          Content Management System
        </Typography>
      </Box>

      {/* ===== NAV TABS ===== */}
      <Box bgcolor="white" px={4} borderBottom="1px solid #e0e0e0">
        <Tabs
          value={currentTab}
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: ACCENT } }}
        >
          <Tab
            label="Blog Manager"
            component={Link}
            to="/admin"
            sx={{ color: ACCENT, fontWeight: 600 }}
          />
          <Tab
            label="News & Events"
            component={Link}
            to="/admin/news-events"
            sx={{ color: ACCENT, fontWeight: 600 }}
          />
          <Tab
            label="Contact Messages"
            component={Link}
            to="/admin/contact-messages"
            sx={{ color: ACCENT, fontWeight: 600 }}
          />

        </Tabs>
      </Box>

      {/* ===== CONTENT ===== */}
      <Box px={4} py={5}>
        {children}
      </Box>

      {/* ===== FOOTER ===== */}
      <Box
        textAlign="center"
        py={2}
        fontSize={12}
        color="text.secondary"
      >
      </Box>
    </Box>
  );
};

export default AdminLayout;
