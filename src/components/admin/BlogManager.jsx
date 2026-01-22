/* eslint-disable react/prop-types */
// src/components/admin/BlogManager.jsx
import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import { Delete, Image as ImageIcon } from "@mui/icons-material";

const API_URL = "http://localhost:4000/api/blogs";
const ACCENT = "#fea434";

const BlogManager = ({ hideTitle }) => {
  const [newBlog, setNewBlog] = useState({ title: "", content: "", author: "", publicationDate: "", tags: "", image: null });
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(API_URL);
      setBlogs(Array.isArray(res.data) ? res.data : res.data?.blogs || []);
    } catch {
      setError("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content) { setError("Title and content are required."); return; }

    try {
      setSubmitting(true);
      const data = new FormData();
      Object.entries(newBlog).forEach(([k, v]) => v && data.append(k, v));
      await axios.post(API_URL, data);
      setSuccess("Blog published successfully.");
      setNewBlog({ title: "", content: "", author: "", publicationDate: "", tags: "", image: null });
      fetchBlogs();
    } catch { setError("Failed to publish blog."); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => { if (!window.confirm("Delete this blog?")) return; await axios.delete(`${API_URL}/${id}`); fetchBlogs(); };

  if (loading) return <Box display="flex" justifyContent="center" mt={6}><CircularProgress sx={{ color: ACCENT }} /></Box>;

  return (
    <Box maxWidth={900} mx="auto">
      {!hideTitle && (
        <Typography variant="h5" fontWeight={700} mb={3} color={ACCENT} sx={{ fontSize: { xs: 22, sm: 28 }, textAlign: { xs: 'center', sm: 'left' } }}>
          Blog Management
        </Typography>
      )}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Card sx={{ p: 3, mb: 4 }}>
        <Typography fontWeight={600} mb={2}>Create New Blog Post</Typography>
        <Stack spacing={2} component="form" onSubmit={handleSubmit}>
          <TextField label="Blog Title *" fullWidth value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} />
          <TextField label="Blog Content *" multiline rows={5} fullWidth value={newBlog.content} onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })} />
          <Stack direction="row" spacing={2}>
            <TextField label="Author" fullWidth value={newBlog.author} onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })} />
            <TextField type="date" label="Publication Date" InputLabelProps={{ shrink: true }} fullWidth value={newBlog.publicationDate} onChange={(e) => setNewBlog({ ...newBlog, publicationDate: e.target.value })} />
          </Stack>
          <TextField label="Tags (comma separated)" fullWidth value={newBlog.tags} onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })} />
          <Button variant="outlined" component="label" startIcon={<ImageIcon />} sx={{ borderColor: ACCENT, color: ACCENT }}>
            Upload Image
            <input hidden type="file" accept="image/*" onChange={(e) => setNewBlog({ ...newBlog, image: e.target.files[0] })} />
          </Button>
          <Button type="submit" variant="contained" sx={{ bgcolor: ACCENT }} disabled={submitting}>
            {submitting ? "Publishing…" : "Publish Blog"}
          </Button>
        </Stack>
      </Card>

      <Divider sx={{ my: 4 }} />
      <Typography fontWeight={600} mb={2}>Published Blog Posts</Typography>
      {blogs.length === 0 ? <Typography color="text.secondary">No blog posts yet.</Typography> :
        <Stack spacing={2}>{blogs.map((b) => (
          <Card key={b._id} sx={{ p: 2, display: "flex", alignItems: "center" }}>
            {b.image && <CardMedia component="img" src={`http://localhost:4000/uploads/${b.image}`} sx={{ width: 120, height: 80, mr: 2 }} />}
            <Box flexGrow={1}>
              <Typography fontWeight={600}>{b.title}</Typography>
              <Typography variant="body2" color="text.secondary">{b.content?.slice(0, 120)}…</Typography>
            </Box>
            <IconButton color="error" onClick={() => handleDelete(b._id)}><Delete /></IconButton>
          </Card>
        ))}</Stack>}
    </Box>
  );
};

export default BlogManager;
