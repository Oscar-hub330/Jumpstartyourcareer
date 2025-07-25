import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import { Delete, Image as ImageIcon } from "@mui/icons-material";

const BlogManager = () => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    author: "",
    publicationDate: "",
    tags: "",
    image: null,
  });

  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/blogs");
      setBlogs(response.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content) {
      alert("Title and content are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("content", newBlog.content);
    formData.append("author", newBlog.author);
    formData.append("publicationDate", newBlog.publicationDate);
    formData.append("tags", newBlog.tags);
    if (newBlog.image) formData.append("image", newBlog.image);

    try {
      await axios.post("http://localhost:4000/api/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNewBlog({
        title: "",
        content: "",
        author: "",
        publicationDate: "",
        tags: "",
        image: null,
      });
      fetchBlogs();
    } catch (err) {
      console.error("Error posting blog:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  React.useEffect(() => {
    fetchBlogs();
  }, []);

  const truncate = (text, maxLength = 150) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <Box p={4} maxWidth="900px" mx="auto">
      <Typography variant="h4" mb={4} fontWeight="bold" letterSpacing={1}>
        Blog Management
      </Typography>

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} mb={6}>
        <Stack spacing={2}>
          <TextField
            label="Blog Title"
            fullWidth
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            required
          />
          <TextField
            label="Blog Content"
            fullWidth
            multiline
            rows={4}
            value={newBlog.content}
            onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
            required
          />
          <TextField
            label="Author"
            fullWidth
            value={newBlog.author}
            onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
            required
          />
          <TextField
            label="Publication Date"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newBlog.publicationDate}
            onChange={(e) =>
              setNewBlog({ ...newBlog, publicationDate: e.target.value })
            }
          />
          <TextField
            label="#Tags (comma-separated)"
            fullWidth
            value={newBlog.tags}
            onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
          />
          <Button
            variant="outlined"
            startIcon={<ImageIcon />}
            component="label"
            sx={{ width: "fit-content" }}
          >
            Upload Picture
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                setNewBlog({ ...newBlog, image: e.target.files[0] })
              }
            />
          </Button>
          <Button variant="contained" color="primary" type="submit" sx={{ maxWidth: 200 }}>
            Publish Blog
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Blog List */}
      <Typography variant="h5" mb={3} fontWeight="medium" letterSpacing={0.5}>
        All Blog Posts
      </Typography>

      {blogs.length === 0 ? (
        <Typography>No blog posts yet.</Typography>
      ) : (
        <Stack spacing={3}>
          {blogs.map((blog) => (
            <Card
              key={blog._id}
              sx={{
                display: "flex",
                alignItems: "center",
                boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
                borderRadius: 2,
                p: 2,
                "&:hover": { boxShadow: "0 4px 15px rgba(0,0,0,0.15)" },
              }}
            >
              {blog.image ? (
                <CardMedia
                  component="img"
                  src={`http://localhost:4000/uploads/${blog.image}`}
                  alt={blog.title}
                  sx={{
                    width: 120,
                    height: 90,
                    borderRadius: 1,
                    objectFit: "cover",
                    mr: 3,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 120,
                    height: 90,
                    backgroundColor: "#ddd",
                    borderRadius: 1,
                    mr: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#888",
                    fontSize: 14,
                  }}
                >
                  No Image
                </Box>
              )}
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {truncate(blog.content, 180)}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                  By {blog.author}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                  Published on {new Date(blog.publicationDate).toLocaleDateString()}
                </Typography>
                {blog.tags && blog.tags.length > 0 && (
                  <Typography variant="caption" color="text.secondary" display="block">
                    Tags: {blog.tags.join(", ")}
                  </Typography>
                )}
              </Box>
              <Box>
                <IconButton
                  onClick={() => handleDelete(blog._id)}
                  aria-label="delete"
                  color="error"
                >
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default BlogManager;
