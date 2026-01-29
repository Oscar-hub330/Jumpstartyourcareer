import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Avatar,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/blogs/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const sharePost = () => {
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: "Check out this blog post",
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress sx={{ color: "#fea434" }} />
      </Box>
    );
  }

  if (!post) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        px: 2,
        py: 6,
      }}
    >
      {/* ================= Container (prevents stretching/overlap) ================= */}
      <Box
        sx={{
          maxWidth: 850, // 🔑 critical for readability
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* Back */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ alignSelf: "flex-start", textTransform: "none" }}
        >
          Back
        </Button>

        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            lineHeight: 1.3,
            color: "#fea434",
            wordBreak: "break-word",
          }}
        >
          {post.title}
        </Typography>

        {/* Author row */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar sx={{ bgcolor: "#fea434", width: 32, height: 32 }}>
            {(post.author || "A")[0]}
          </Avatar>

          <Typography fontSize="0.9rem">{post.author || "Unknown"}</Typography>

          <Typography fontSize="0.8rem" color="#888">
            {moment(post.createdAt).format("LL")}
          </Typography>

          <Button
            size="small"
            startIcon={<ShareIcon />}
            onClick={sharePost}
            sx={{ ml: "auto", textTransform: "none" }}
          >
            Share
          </Button>
        </Stack>

        <Divider />

        {/* ================= IMAGE BLOCK ================= */}
        {post.image && (
          <Box
            component="img"
            src={`http://localhost:4000/uploads/${post.image}`}
            alt={post.title}
            sx={{
              width: "100%",
              maxHeight: 420,
              objectFit: "cover",
              borderRadius: 2,
              display: "block", // 🔑 prevents overlay
            }}
          />
        )}

        {/* ================= CONTENT ================= */}
        <Typography
          sx={{
            fontSize: "1rem",
            lineHeight: 1.8, // 🔑 prevents crowding
            color: "#333",
            whiteSpace: "pre-line",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
          }}
        >
          {post.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default BlogDetails;
