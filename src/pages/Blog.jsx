import React, { useEffect, useMemo, useState } from "react";
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
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Blog = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/blogs");

        const list = Array.isArray(res.data)
          ? res.data
          : res.data?.data || res.data?.blogs || [];

        setBlogs(list);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch blogs.");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  /* ========= Filtering ========= */
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) =>
      `${b.title} ${b.content} ${b.author}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [blogs, search]);

  /* ========= Share ========= */
  const sharePost = (post) => {
    const url = `${window.location.origin}/blog/${post._id}`;

    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: "Check out this blog post",
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    }
  };

  /* ========= Loading ========= */
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress sx={{ color: "#fea434" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={10}>
        {error}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        py: 6,
        px: { xs: 2, md: 6 },
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* ================= HEADER ================= */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          color: "#fea434",
          fontWeight: 700,
          mb: 1,
        }}
      >
        Our Blog
      </Typography>

      <Typography
        align="center"
        sx={{
          color: "#666",
          mb: 4,
          fontSize: "0.95rem",
        }}
      >
        Stories, updates and insights.
      </Typography>

      {/* ================= SEARCH ================= */}
      <Box maxWidth={500} mx="auto" mb={4}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* ================= GRID ================= */}
      <Grid container spacing={2} alignItems="stretch">
        {filteredBlogs.length === 0 ? (
          <Typography sx={{ width: "100%", textAlign: "center", mt: 4 }}>
            No blog posts found.
          </Typography>
        ) : (
          filteredBlogs.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  border: "1px solid #f1f1f1",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                  transition: "0.25s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                {/* ===== IMAGE (fixed height, no overflow) ===== */}
                {post.image && (
                  <Box
                    component="img"
                    src={`http://localhost:4000/uploads/${post.image}`}
                    alt={post.title}
                    sx={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                    }}
                  />
                )}

                {/* ===== CONTENT ===== */}
                <CardContent
                  sx={{
                    p: 2, // compact padding (not zero)
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    gap: 1,
                  }}
                >
                  {/* Title */}
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{
                      color: "#fea434",
                      lineHeight: 1.3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {post.title}
                  </Typography>

                  {/* Text clamp */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#333",
                      fontSize: "0.85rem",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      flexGrow: 1,
                    }}
                  >
                    {post.content}
                  </Typography>

                  {/* Buttons */}
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      sx={{ color: "#fea434", textTransform: "none" }}
                      onClick={() => navigate(`/blog/${post._id}`)}
                    >
                      Read
                    </Button>

                    <Button
                      size="small"
                      startIcon={<ShareIcon />}
                      sx={{ textTransform: "none" }}
                      onClick={() => sharePost(post)}
                    >
                      Share
                    </Button>
                  </Stack>

                  {/* Footer */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={1}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar
                        sx={{
                          width: 26,
                          height: 26,
                          fontSize: 12,
                          bgcolor: "#fea434",
                        }}
                      >
                        {(post.author || "A")[0]}
                      </Avatar>

                      <Typography fontSize="0.75rem">
                        {post.author || "Unknown"}
                      </Typography>
                    </Box>

                    <Typography fontSize="0.7rem" color="#888">
                      {moment(post.createdAt).format("LL")}
                    </Typography>
                  </Box>

                  {/* Tags */}
                  {Array.isArray(post.tags) && post.tags.length > 0 && (
                    <Stack direction="row" flexWrap="wrap" gap={0.5}>
                      {post.tags.map((tag, i) => (
                        <Chip
                          key={i}
                          label={`#${tag}`}
                          size="small"
                          sx={{ fontSize: 10 }}
                        />
                      ))}
                    </Stack>
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
