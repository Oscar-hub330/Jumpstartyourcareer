import React from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const blogPosts = [
  {
    id: 1,
    title: "Empowering Youth Through Digital Skills",
    excerpt:
      "How rural youth are learning to code and lead in the tech world...",
    author: "Thabo Mokoena",
    date: "2025-06-20",
    image: "https://source.unsplash.com/featured/?technology",
    tags: ["ICT Education", "Youth Empowerment"],
  },
  {
    id: 2,
    title: "Stories of Transformation from Jumpstart Graduates",
    excerpt:
      "Meet our graduates who’ve launched businesses, joined startups, and changed their communities.",
    author: "Nomsa Dlamini",
    date: "2025-06-15",
    image: "https://source.unsplash.com/featured/?community",
    tags: ["Entrepreneurship", "Impact Stories"],
  },
];

const Blog = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "white", py: 10, px: { xs: 3, md: 10 } }}>
      <Typography variant="h3" align="center" sx={{ color: "#fea434", fontWeight: "bold", mb: 4 }}>
        Our Blog
      </Typography>
      <Typography variant="body1" align="center" sx={{ color: "gray.700", mb: 6, maxWidth: "700px", mx: "auto" }}>
        Stay updated with the latest stories, insights, and innovations from our community and beyond.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {blogPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card
              onClick={() => navigate(`/blog/${post.id}`)}
              sx={{
                cursor: "pointer",
                border: "1px solid #fea434",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
            >
              <img
                src={post.image}
                alt={post.title}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ color: "#fea434", fontWeight: "bold", mb: 1 }}>
                  {post.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#444", mb: 2 }}>
                  {post.excerpt}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "gray" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar>{post.author[0]}</Avatar>
                    <span>{post.author}</span>
                  </Box>
                  <span>{moment(post.date).format("LL")}</span>
                </Box>
                <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {post.tags.map((tag, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        fontSize: "12px",
                        px: 1,
                        py: 0.5,
                        borderRadius: "9999px",
                        backgroundColor: "#fea43422",
                        color: "#fea434",
                      }}
                    >
                      #{tag}
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Blog;
