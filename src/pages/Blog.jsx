import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box,
  CircularProgress,
  Chip,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/blogs");

        // 🔒 HARD NORMALIZATION (prevents map crash)
        const list = Array.isArray(res.data)
          ? res.data
          : res.data?.data || res.data?.blogs || [];

        setBlogs(list);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to fetch blogs.");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress sx={{ color: "#fea434" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center" mt={10}>
        {error}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        py: 10,
        px: { xs: 3, md: 10 },
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        sx={{
          color: "#fea434",
          fontWeight: "bold",
          mb: 2,
          letterSpacing: 1.2,
        }}
      >
        Our Blog
      </Typography>

      <Typography
        align="center"
        sx={{
          color: "#555",
          mb: 8,
          maxWidth: 700,
          mx: "auto",
          fontSize: "1.1rem",
          lineHeight: 1.6,
        }}
      >
        Get inspired by real stories, learn from our journey, and discover the
        power of youth innovation.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {blogs.length === 0 ? (
          <Typography
            variant="h6"
            sx={{ color: "#fea434", textAlign: "center", width: "100%" }}
          >
            No blog posts yet.
          </Typography>
        ) : (
          blogs.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <Card
                sx={{
                  cursor: "pointer",
                  borderRadius: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #ffe2c0",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  },
                }}
                onClick={() => navigate(`/blog/${post._id}`)}
              >
                {/* Image (SAFE) */}
                {post.image && (
                  <Box
                    component="img"
                    src={`http://localhost:4000/uploads/${post.image}`}
                    alt={post.title || "Blog image"}
                    sx={{
                      width: "100%",
                      height: 220,
                      objectFit: "cover",
                    }}
                  />
                )}

                <CardContent
                  sx={{
                    p: 3,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#fea434",
                      fontWeight: 700,
                      mb: 1,
                    }}
                    noWrap
                  >
                    {post.title || "Untitled Post"}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#333",
                      lineHeight: 1.5,
                      flexGrow: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      mb: 2,
                    }}
                  >
                    {post.content || "No content available."}
                  </Typography>

                  <Button
                    size="small"
                    sx={{
                      color: "#fea434",
                      textTransform: "none",
                      fontWeight: "bold",
                      alignSelf: "flex-start",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/blog/${post._id}`);
                    }}
                  >
                    Read more →
                  </Button>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 3,
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar
                        sx={{
                          bgcolor: "#fea434",
                          width: 34,
                          height: 34,
                        }}
                      >
                        {(post.author || "A")[0].toUpperCase()}
                      </Avatar>
                      <Typography fontSize="0.9rem" fontWeight={600}>
                        {post.author || "Unknown"}
                      </Typography>
                    </Box>

                    <Typography fontSize="0.8rem" color="#999">
                      {post.createdAt
                        ? moment(post.createdAt).format("LL")
                        : "—"}
                    </Typography>
                  </Box>

                  {Array.isArray(post.tags) && post.tags.length > 0 && (
                    <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                      {post.tags.map((tag, idx) => (
                        <Chip
                          key={idx}
                          label={`#${tag}`}
                          size="small"
                          sx={{
                            backgroundColor: "#fff3e0",
                            color: "#b86a00",
                            fontWeight: "bold",
                            fontSize: "0.75rem",
                            border: "1px solid #b86a00",
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Blog;
