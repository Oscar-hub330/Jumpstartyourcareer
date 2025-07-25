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
import moment from "moment";
import axios from "axios";

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/blogs");
        setBlogs(res.data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress sx={{ color: "#fea434" }} />
      </Box>
    );

  if (error)
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 10 }}>
        {error}
      </Typography>
    );

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
          mb: 4,
          letterSpacing: 1.2,
        }}
      >
        Our Blog
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{
          color: "#555",
          mb: 6,
          maxWidth: "700px",
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
                onClick={() => navigate(`/blog/${post._id}`)}
                sx={{
                  cursor: "pointer",
                  borderRadius: 4,
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  border: "1px solid #ffe2c0",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                  "&:hover": {
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    transform: "translateY(-8px)",
                  },
                }}
                elevation={3}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") navigate(`/blog/${post._id}`);
                }}
              >
                <Box
                  component="img"
                  src={`http://localhost:4000/uploads/${post.image}`}
                  alt={post.title}
                  sx={{
                    width: "100%",
                    height: { xs: "180px", md: "220px" },
                    objectFit: "cover",
                    objectPosition: "center",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />

                <CardContent
                  sx={{
                    padding: 3,
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
                      letterSpacing: 0.5,
                    }}
                    component="h2"
                    noWrap
                  >
                    {post.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#333",
                      fontSize: "0.95rem",
                      lineHeight: 1.5,
                      flexGrow: 1,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      mb: 2,
                    }}
                  >
                    {post.content}
                  </Typography>

                  <Button
                    size="small"
                    sx={{
                      color: "#fea434",
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
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
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.2,
                        minWidth: 0,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "#fea434",
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: "1rem",
                          width: 34,
                          height: 34,
                          flexShrink: 0,
                        }}
                      >
                        {(post.author || "U")[0].toUpperCase()}
                      </Avatar>
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          color: "#444",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          maxWidth: 120,
                        }}
                        title={post.author}
                      >
                        {post.author || "Unknown"}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color: "#999",
                        whiteSpace: "nowrap",
                        userSelect: "none",
                      }}
                    >
                      {moment(post.publicationDate || post.createdAt).format(
                        "LL"
                      )}
                    </Typography>
                  </Box>

                  {post.tags?.length > 0 && (
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
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
                            cursor: "default",
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
