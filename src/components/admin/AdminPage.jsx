/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";

import BlogManager from "../../components/admin/BlogManager";
import NewsEventsManagement from "../../components/admin/NewsEventsManagement";
import ContactAdmin from "../../components/admin/ContactAdmin";
import SubscriberManagement from "../../components/admin/SubscriberManagement";

const AdminPage = () => {
  const [tab, setTab] = useState(0);

  // ✅ Single source of truth (safer than index conditions)
  const tabConfig = [
    { label: "Blog Manager", component: <BlogManager /> },
    { label: "News & Events", component: <NewsEventsManagement /> },
    { label: "Contact Messages", component: <ContactAdmin /> },
    { label: "Subscribers", component: <SubscriberManagement /> },
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      {/* Header */}
      <Box
        sx={{
          px: 4,
          py: 3,
          borderBottom: "1px solid #eee",
          backgroundColor: "#fff",
        }}
      >
        <Box sx={{ fontSize: 24, fontWeight: 700, color: "#fea434" }}>
          Admin Portal
        </Box>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            mt: 2,
            "& .MuiTab-root": {
              fontWeight: 600,
              textTransform: "none",
            },
            "& .Mui-selected": {
              color: "#fea434",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#fea434",
            },
          }}
        >
          {tabConfig.map((t, i) => (
            <Tab key={i} label={t.label} />
          ))}
        </Tabs>
      </Box>

      {/* Active tab content */}
      <Box sx={{ p: 4 }}>{tabConfig[tab].component}</Box>
    </Box>
  );
};

export default AdminPage;
