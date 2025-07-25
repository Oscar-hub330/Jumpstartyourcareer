// src/pages/BlogDetail.jsx

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Container,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress sx={{ color: "#fea434" }} />
      </Box>
    );

  if (!blog)
    return (
      <Typography variant="h2" color="error" align="center" sx={{ mt: 6 }}>
        Blog not found.
      </Typography>
    );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        component="img"
        src={`http://localhost:4000/uploads/${blog.image}`}
        alt={blog.title}
        sx={{ width: "100%", height: 400, objectFit: "cover", borderRadius: 2 }}
      />
      <Typography
        variant="h3"
        sx={{ color: "#fea434", mt: 2, fontWeight: 600 }}
      >
        {blog.title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mt: 1, mb: 1 }}>
        <Avatar sx={{ bgcolor: "#fea434", mr: 2 }}>
          {(blog.author || "U")[0].toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="subtitle2">{blog.author || "Unknown"}</Typography>
          <Typography variant="caption" color="text.secondary">
            {moment(blog.date || blog.createdAt).format("LL")}
          </Typography>
        </Box>
      </Box>

      <Typography
        variant="body1"
        sx={{ fontSize: "1.0rem", lineHeight: 1.8, color: "#333", whiteSpace: "pre-line" }}
      >
        {blog.content}
      </Typography>

      {blog.tags?.length > 0 && (
        <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {blog.tags.map((tag, i) => (
            <Chip
              key={i}
              label={`#${tag}`}
              sx={{
                backgroundColor: "#ffe2c0",
                color: "#b85a00",
                fontWeight: "bold",
              }}
            />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default BlogDetail;
