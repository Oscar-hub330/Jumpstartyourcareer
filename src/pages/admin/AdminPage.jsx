// src/pages/AdminPanel.jsx
import React from "react";
import { Typography, Box } from "@mui/material";
import BlogManager from "../../components/admin/BlogManager";
import NewsEventsManagement from "../../components/admin/NewsEventsManagement";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminPanel = () => {
  const location = window.location.pathname;
  const isNewsEvents = location.includes("news-events");

  return (
    <AdminLayout>
      <Box mb={4}>
        <Typography
          variant="h5"
          color="#fea434"
          fontWeight={700}
          sx={{ fontSize: { xs: 22, sm: 28 }, textAlign: { xs: 'center', sm: 'left' } }}
        >
          {isNewsEvents ? "News & Events Management" : "Blog Manager"}
        </Typography>
      </Box>
      <Box mb={4} sx={{ width: '100%', maxWidth: 900, mx: 'auto' }}>
        {isNewsEvents ? (
          <NewsEventsManagement hideTitle />
        ) : (
          <BlogManager />
        )}
      </Box>
    </AdminLayout>
  );
};

export default AdminPanel;
