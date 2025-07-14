// src/components/admin/BlogManager.jsx
import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const BlogManager = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Create and Manage Blog Posts</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Add, edit, and delete blog content.
        </Typography>
        <Button variant="contained" color="primary">Add New Post</Button>
        {/* Blog List Rendering Goes Here */}
      </CardContent>
    </Card>
  );
};

export default BlogManager;
