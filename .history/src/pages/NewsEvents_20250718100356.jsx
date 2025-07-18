// Main Admin Page Layout
import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Snackbar,
  CircularProgress,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ListIcon from "@mui/icons-material/List";
import ArticleIcon from "@mui/icons-material/Article";
import NewslettersTab from "./tabs/NewslettersTab";
import SubscribersTab from "./tabs/SubscribersTab";
import BlogPostsTab from "./tabs/BlogPostsTab";

export default function AdminDashboard() {
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Portal
      </Typography>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab icon={<EmailIcon />} label="Newsletters" />
        <Tab icon={<ListIcon />} label="Subscribers" />
        <Tab icon={<ArticleIcon />} label="Blog Posts" />
      </Tabs>

      <Box sx={{ mt: 4 }}>
        {tabIndex === 0 && <NewslettersTab setLoading={setLoading} setSnackbar={setSnackbar} />}
        {tabIndex === 1 && <SubscribersTab setLoading={setLoading} setSnackbar={setSnackbar} />}
        {tabIndex === 2 && <BlogPostsTab setLoading={setLoading} setSnackbar={setSnackbar} />}
      </Box>

      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0,0,0,0.4)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
      />
    </Box>
  );
}
