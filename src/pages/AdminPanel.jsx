// src/pages/AdminPanel.jsx
import React from "react";
import { Container, Typography, Box, Divider } from "@mui/material";
import BlogManager from "../components/admin/BlogManager";
import NewsEventsManagement from "../components/admin/NewsEventsManagement"; // <- adjust path if needed

const AdminPanel = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Box mb={6}>
      <Typography variant="h4" color="#fea434">Admin Dashboard</Typography>
    </Box>

    {/* BLOG MANAGEMENT */}
    <Box mb={8}>
      <BlogManager />
    </Box>

    <Divider sx={{ my: 6 }} />

    {/* NEWS & EVENTS MANAGEMENT */}
    <Box>
      <NewsEventsManagement />
    </Box>
  </Container>
);

export default AdminPanel;
