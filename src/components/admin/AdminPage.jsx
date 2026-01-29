// src/pages/admin/AdminPage.jsx
import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";

// ✅ Correct relative paths
import BlogManager from "../../components/admin/BlogManager";
import NewsEventsManagement from "../../components/admin/NewsEventsManagement";
import ContactAdmin from "../../components/admin/ContactAdmin";

const AdminPage = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      <Box sx={{ px: 4, py: 3, borderBottom: "1px solid #eee", backgroundColor: "#fff" }}>
        <Box sx={{ fontSize: 24, fontWeight: 700, color: "#fea434" }}>Admin Portal</Box>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
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

      <Box sx={{ p: 4 }}>
        {tab === 0 && <BlogManager />}
        {tab === 1 && <NewsEventsManagement />}
        {tab === 2 && <ContactAdmin />}
      </Box>
    </Box>
  );
};

export default AdminPage;
