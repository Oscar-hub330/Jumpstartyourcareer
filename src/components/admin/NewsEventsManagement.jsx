import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Modal,
  Box,
  CircularProgress,
  Avatar,
  TextField,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  maxWidth: 700,
  width: "90%",
  outline: "none",
  maxHeight: "90vh",
  overflowY: "auto",
};

const NewsEventsManagement = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal & form state
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    _id: null,
    title: "",
    description: "",
    author: "",
    image: null,
    pdf: null,
  });
  const [saving, setSaving] = useState(false);

  // Fetch newsletters on mount
  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/api/newsletters");
      setNewsletters(res.data);
      setError(null);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to fetch newsletters");
    } finally {
      setLoading(false);
    }
  };

  const openForm = (newsletter = null) => {
    if (newsletter) {
      setFormData({
        _id: newsletter._id,
        title: newsletter.title,
        description: newsletter.description,
        author: newsletter.author,
        image: null,
        pdf: null,
      });
    } else {
      setFormData({
        _id: null,
        title: "",
        description: "",
        author: "",
        image: null,
        pdf: null,
      });
    }
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setFormData({
      _id: null,
      title: "",
      description: "",
      author: "",
      image: null,
      pdf: null,
    });
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this newsletter?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/newsletters/${id}`);
      fetchNewsletters();
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Failed to delete newsletter");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.author) {
      alert("Title, description, and author are required.");
      return;
    }
    try {
      setSaving(true);
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("author", formData.author);
      if (formData.image) data.append("image", formData.image);
      if (formData.pdf) data.append("pdf", formData.pdf);

      if (formData._id) {
        // Update
        await axios.put(`http://localhost:4000/api/newsletters/${formData._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Create
        await axios.post("http://localhost:4000/api/newsletters", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      closeModal();
      fetchNewsletters();
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Failed to save newsletter");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#feead8", minHeight: "100vh", paddingBottom: 40 }}>
      <Box
        sx={{
          py: 6,
          textAlign: "center",
          background: "linear-gradient(to right, #fffaf5, #ffa333)",
          color: "#1d1d1d",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Manage Newsletters
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#ffa333", mb: 4 }}
            onClick={() => openForm()}
          >
            Create New Newsletter
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 6 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress sx={{ color: "#ffa333" }} />
          </Box>
        ) : newsletters.length === 0 ? (
          <Typography textAlign="center" mt={4}>
            No newsletters available.
          </Typography>
        ) : (
          newsletters.map((newsletter) => (
            <Card
              key={newsletter._id}
              sx={{
                mb: 4,
                display: "flex",
                flexDirection: "row",
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: "#fffaf5",
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                {newsletter.image && (
                  <Box sx={{ width: 120, height: 100, flexShrink: 0 }}>
                    <img
                      src={`http://localhost:4000/uploads/${newsletter.image}`}
                      alt="Newsletter"
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }}
                    />
                  </Box>
                )}

                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: "#8d4f00" }}
                  >
                    {newsletter.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" noWrap>
                    {newsletter.description}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1} gap={1}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                      {newsletter.author?.[0] || "A"}
                    </Avatar>
                    <Typography variant="caption">
                      {newsletter.author || "Admin"} • {new Date(newsletter.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Box>

              <Stack direction="row" spacing={1} sx={{ pr: 2 }}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#ffa333", color: "white" }}
                  onClick={() => openForm(newsletter)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  sx={{ borderColor: "#ffa333", color: "#ffa333" }}
                  onClick={() => handleDelete(newsletter._id)}
                >
                  Delete
                </Button>
              </Stack>
            </Card>
          ))
        )}
      </Container>

      {/* Modal for Create/Edit */}
      <Modal open={openModal} onClose={closeModal}>
        <Box sx={modalStyle} component="form" onSubmit={handleSubmit} encType="multipart/form-data">
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h5" color="#8d4f00" fontWeight={700}>
              {formData._id ? "Edit Newsletter" : "Create Newsletter"}
            </Typography>
            <IconButton onClick={closeModal} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <TextField
            label="Title"
            name="title"
            fullWidth
            required
            value={formData.title}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Description"
            name="description"
            fullWidth
            required
            multiline
            minRows={3}
            value={formData.description}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Author"
            name="author"
            fullWidth
            required
            value={formData.author}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            helperText="Who wrote this newsletter?"
          />

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" mb={1}>
              Upload Image (optional)
            </Typography>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleFileChange}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" mb={1}>
              Upload PDF (optional)
            </Typography>
            <input
              type="file"
              accept="application/pdf"
              name="pdf"
              onChange={handleFileChange}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              sx={{ backgroundColor: "#ffa333", color: "white", flex: 1 }}
            >
              {saving ? "Saving..." : formData._id ? "Update" : "Create"}
            </Button>
            <Button
              onClick={closeModal}
              variant="outlined"
              sx={{ borderColor: "#ffa333", color: "#ffa333", flex: 1 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default NewsEventsManagement;
