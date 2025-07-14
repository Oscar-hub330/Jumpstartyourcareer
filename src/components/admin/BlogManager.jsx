import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";
import { Delete, Edit, Image as ImageIcon, Preview, Cancel } from "@mui/icons-material";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    image: null,
    imageUrl: "",
  });
  const [previewing, setPreviewing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBlog({
        ...newBlog,
        image: file,
        imageUrl: URL.createObjectURL(file),
      });
    }
  };

  const handlePublish = () => {
    if (!newBlog.title || !newBlog.content || !newBlog.imageUrl) {
      alert("All fields are required before publishing.");
      return;
    }

    if (editingId !== null) {
      const updatedBlogs = blogs.map((blog) =>
        blog.id === editingId ? { ...blog, ...newBlog, id: editingId } : blog
      );
      setBlogs(updatedBlogs);
    } else {
      const blogToAdd = {
        ...newBlog,
        id: Date.now(),
      };
      setBlogs([blogToAdd, ...blogs]);
    }

    resetForm();
  };

  const handleEdit = (blog) => {
    setNewBlog({ ...blog });
    setEditingId(blog.id);
    setPreviewing(true);
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id));
    if (editingId === id) resetForm();
  };

  const resetForm = () => {
    setNewBlog({ title: "", content: "", image: null, imageUrl: "" });
    setPreviewing(false);
    setEditingId(null);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "#fea434" }}>
        Blog Management
      </Typography>

      <Card sx={{ p: 3, mb: 4, backgroundColor: "#fff8f0", borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              name="title"
              label="Blog Title"
              value={newBlog.title}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="content"
              label="Blog Content"
              multiline
              rows={4}
              value={newBlog.content}
              onChange={handleInputChange}
              fullWidth
            />

            <Button
              variant="outlined"
              component="label"
              startIcon={<ImageIcon />}
              sx={{ alignSelf: "start", color: "#fea434", borderColor: "#fea434" }}
            >
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </Button>

            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                sx={{ bgcolor: "#fea434", mr: 2 }}
                onClick={handlePublish}
              >
                {editingId ? "Save Changes" : "Publish"}
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Cancel />}
                onClick={resetForm}
              >
                Cancel
              </Button>
              {!previewing && (
                <Button
                  variant="outlined"
                  startIcon={<Preview />}
                  onClick={() => setPreviewing(true)}
                  sx={{ borderColor: "#fea434", color: "#fea434" }}
                >
                  Preview
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Preview Panel */}
      {previewing && newBlog.title && newBlog.content && newBlog.imageUrl && (
        <Card
          sx={{
            mb: 4,
            backgroundColor: "#fff",
            border: "1px solid #ffe2c0",
            borderRadius: 3,
            boxShadow: 1,
          }}
        >
          <CardContent>
            <Typography variant="h5" color="#fea434" mb={2}>
              Preview
            </Typography>
            <Typography variant="h6">{newBlog.title}</Typography>
            <Typography variant="body2" mb={2}>
              {newBlog.content}
            </Typography>
            {newBlog.imageUrl && (
              <img
                src={newBlog.imageUrl}
                alt="Preview"
                style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 8 }}
              />
            )}
          </CardContent>
        </Card>
      )}

      {/* Existing Blogs */}
      <Typography variant="h5" sx={{ mb: 2, mt: 4, color: "#fea434" }}>
        All Blog Posts
      </Typography>

      {blogs.length === 0 ? (
        <Typography>No blog posts yet.</Typography>
      ) : (
        blogs.map((blog) => (
          <Card
            key={blog.id}
            sx={{ mb: 3, backgroundColor: "#fff", borderRadius: 3, boxShadow: 1 }}
          >
            <CardContent>
              <Typography variant="h6" color="primary">
                {blog.title}
              </Typography>
              <Typography variant="body2" mb={2}>
                {blog.content}
              </Typography>
              {blog.imageUrl && (
                <img
                  src={blog.imageUrl}
                  alt="Blog"
                  style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 8 }}
                />
              )}
              <Divider sx={{ my: 2 }} />
              <Box display="flex" gap={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Edit />}
                  onClick={() => handleEdit(blog)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default BlogManagement;
