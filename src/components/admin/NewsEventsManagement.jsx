/* eslint-disable react/prop-types */
import React from "react";
import { Box, Typography } from "@mui/material";

const ACCENT = "#fea434";

const NewsEventsManagement = ({ hideTitle }) => {
  return (
    <Box>
      {!hideTitle && (
        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
          color={ACCENT}
          sx={{ fontSize: { xs: 18, sm: 22 }, textAlign: { xs: 'center', sm: 'left' } }}
        >
          News & Events Management
        </Typography>
      )}
      <Typography sx={{ fontSize: { xs: 14, sm: 16 } }}>
        Here you can create, edit, and manage newsletters and events.
      </Typography>
    </Box>
  );
};

export default NewsEventsManagement;
