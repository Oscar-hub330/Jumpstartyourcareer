/* eslint-disable no-unused-vars */
// src/pages/AdminPanel.jsx
import React from "react";
import { Typography, Box } from "@mui/material";
import BlogManager from "../../components/admin/BlogManager";
import NewsEventsManagement from "../../components/admin/NewsEventsManagement";
import ContactAdmin from "../../components/admin/ContactAdmin";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminPanel = () => {
  const location = window.location.pathname;

  const getTitle = () => {
    if (location.includes("news-events")) return "News & Events Management";
    if (location.includes("contact")) return "Contact Admin";
    return "Blog Manager";
  };

  const renderComponent = () => {
    if (location.includes("news-events")) return <NewsEventsManagement hideTitle />;
    if (location.includes("contact")) return <ContactAdmin />;
    return <BlogManager />;
  };

  return (
    <AdminLayout>
      <Box mb={4}>
        <Typography
          variant="h5"
          color="#fea434"
          fontWeight={700}
          sx={{ fontSize: { xs: 22, sm: 28 }, textAlign: { xs: 'center', sm: 'left' } }}
        >
          {getTitle()}
        </Typography>
      </Box>
      <Box mb={4} sx={{ width: '100%', maxWidth: 900, mx: 'auto' }}>
        {renderComponent()}
      </Box>
    </AdminLayout>
  );
};

export default AdminPanel;
