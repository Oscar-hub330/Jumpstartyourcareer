/* eslint-disable no-unused-vars */
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
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

const API_URL = "http://localhost:4000/api/newsletters";
const ACCENT = "#fea434";

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
  maxHeight: "90vh",
  overflowY: "auto",
};

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

const NewsEventsManagement = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [pdfText, setPdfText] = useState("");

  const [formData, setFormData] = useState({
    _id: null,
    title: "",
    description: "",
    author: "",
    image: null,
    pdf: null,
    imagePosition: "top",
  });

  /* ================= FETCH ================= */
  const fetchNewsletters = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      const list = Array.isArray(res.data)
        ? res.data
        : res.data?.newsletters || res.data?.data || [];
      setNewsletters(list);
    } catch {
      setError("Failed to fetch newsletters.");
      setNewsletters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  /* ================= FORM ================= */
  const openForm = (n = null) => {
    setFormData(
      n
        ? {
            _id: n._id,
            title: n.title || "",
            description: n.description || "",
            author: n.author || "",
            image: null,
            pdf: null,
            imagePosition: "top",
          }
        : {
            _id: null,
            title: "",
            description: "",
            author: "",
            image: null,
            pdf: null,
            imagePosition: "top",
          }
    );
    setOpenModal(true);
  };

  const closeModal = () => setOpenModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (!files?.[0]) return;
    if (name === "image") {
      if (files[0].size > MAX_IMAGE_SIZE) {
        alert("Image file is too large. Maximum allowed size is 2MB.");
        return;
      }
      setFormData((p) => ({ ...p, image: files[0], pdf: null }));
      setPdfText("");
    } else if (name === "pdf") {
      setFormData((p) => ({ ...p, pdf: files[0], image: null }));
      // Extract PDF text
      const file = files[0];
      const reader = new FileReader();
      reader.onload = async function (ev) {
        const typedarray = new Uint8Array(ev.target.result);
        try {
          const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((item) => item.str).join(" ") + "\n";
          }
          setPdfText(text);
        } catch {
          setPdfText("(Failed to extract PDF text)");
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleRemoveFile = (type) => {
    if (type === "image") setFormData((p) => ({ ...p, image: null }));
    if (type === "pdf") {
      setFormData((p) => ({ ...p, pdf: null }));
      setPdfText("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => v && data.append(k, v));
      if (formData.pdf && pdfText) data.append("pdfText", pdfText);

      formData._id
        ? await axios.put(`${API_URL}/${formData._id}`, data)
        : await axios.post(API_URL, data);

      closeModal();
      fetchNewsletters();
    } catch (err) {
      console.error("Failed to save newsletter:", err?.response?.data || err.message || err);
      alert("Failed to save newsletter. " + (err?.response?.data?.error || err.message || ""));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* ===== HEADER ===== */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={700}>
            News & Events Management
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: ACCENT,
              textTransform: "none",
              fontWeight: 100,
            }}
            onClick={() => openForm()}
          >
            + Create Newsletter
          </Button>
        </Box>
      </Container>

      <Divider />

      {/* ===== CONTENT ===== */}
      <Container maxWidth="lg" sx={{ py: 6, flex: 1 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress sx={{ color: ACCENT }} />
          </Box>
        ) : newsletters.length === 0 ? (
          <Card
            sx={{
              maxWidth: 720,
              mx: "auto",
              py: 6,
              textAlign: "center",
              borderRadius: 2,
            }}
          >
            <Typography color="text.secondary">
              No newsletters available. Create your first one!
            </Typography>
          </Card>
        ) : (
          newsletters.map((n) => (
            <Card key={n._id} sx={{ mb: 3, p: 2 }}>
              <CardContent>
                <Typography fontWeight={200}>{n.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {n.description}
                </Typography>
                {n.pdf && (
                  <Box mt={2}>
                    <Button
                      variant="outlined"
                      sx={{ mr: 1, borderColor: ACCENT, color: ACCENT }}
                      onClick={() => window.open(`/uploads/${n.pdf}`, "_blank")}
                    >
                      View PDF
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ mr: 1, borderColor: ACCENT, color: ACCENT }}
                      onClick={() => {
                        navigator.clipboard.writeText(
                          window.location.origin + `/uploads/${n.pdf}`
                        );
                        alert("PDF link copied!");
                      }}
                    >
                      Share PDF
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ borderColor: ACCENT, color: ACCENT }}
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = `/uploads/${n.pdf}`;
                        link.download = n.pdf;
                        link.click();
                      }}
                    >
                      Download PDF
                    </Button>
                  </Box>
                )}
                {n.pdfText && (
                  <Box mt={2}>
                    <Typography variant="caption" color="text.secondary">
                      PDF Extracted Content:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ whiteSpace: "pre-wrap", fontSize: 13 }}
                    >
                      {n.pdfText}
                    </Typography>
                  </Box>
                )}
                <Box mt={2} display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ bgcolor: ACCENT }}>
                    {n.author?.[0] || "A"}
                  </Avatar>
                  <Typography variant="caption">{n.author}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Container>

      {/* ===== FOOTER ===== */}
      <Box
        sx={{
          py: 2,
          textAlign: "center",
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          © 2026 Admin Portal. All rights reserved.
        </Typography>
      </Box>

      {/* ===== MODAL ===== */}
      <Modal open={openModal} onClose={closeModal}>
        <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography fontWeight={200}>
              {formData._id ? "Edit Newsletter" : "Create Newsletter"}
            </Typography>
            <IconButton onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Preview Mode Toggle */}
          <Stack direction="row" spacing={2} mb={2}>
            <Button
              variant={previewMode ? "outlined" : "contained"}
              sx={{
                backgroundColor: !previewMode ? ACCENT : undefined,
                color: previewMode ? ACCENT : "#fff",
                borderColor: ACCENT,
                flex: 1,
              }}
              onClick={() => setPreviewMode(false)}
            >
              Edit
            </Button>
            <Button
              variant={previewMode ? "contained" : "outlined"}
              sx={{
                backgroundColor: previewMode ? ACCENT : undefined,
                color: previewMode ? "#fff" : ACCENT,
                borderColor: ACCENT,
                flex: 1,
              }}
              onClick={() => setPreviewMode(true)}
            >
              Preview
            </Button>
          </Stack>

          {previewMode ? (
            <Box
              sx={{
                p: 2,
                border: `1px solid ${ACCENT}`,
                borderRadius: 2,
                background: "#fff",
                mb: 2,
              }}
            >
              {/* Render image in selected position */}
              {formData.image &&
                formData.imagePosition === "top" &&
                typeof formData.image !== "string" && (
                  <Box mb={2}>
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: 200,
                        borderRadius: 8,
                      }}
                    />
                  </Box>
                )}
              <Typography
                variant="h6"
                color={ACCENT}
                fontWeight={700}
                mb={1}
              >
                {formData.title || "Untitled Newsletter"}
              </Typography>
              {formData.image &&
                formData.imagePosition === "middle" &&
                typeof formData.image !== "string" && (
                  <Box mb={2}>
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: 200,
                        borderRadius: 8,
                      }}
                    />
                  </Box>
                )}
              <Typography
                variant="subtitle2"
                color="text.secondary"
                mb={1}
              >
                {formData.author || "No author"}
              </Typography>
              <Typography variant="body1" mb={2}>
                {formData.description || "No description provided."}
              </Typography>
              {formData.image &&
                formData.imagePosition === "bottom" &&
                typeof formData.image !== "string" && (
                  <Box mb={2}>
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: 200,
                        borderRadius: 8,
                      }}
                    />
                  </Box>
                )}
              {formData.pdf && typeof formData.pdf !== "string" && (
                <Box mb={2}>
                  <Typography color={ACCENT}>
                    PDF attached: {formData.pdf.name}
                  </Typography>
                </Box>
              )}
              {pdfText && (
                <Box mb={2}>
                  <Typography variant="caption" color="text.secondary">
                    PDF Extracted Content:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ whiteSpace: "pre-wrap", fontSize: 13 }}
                  >
                    {pdfText}
                  </Typography>
                </Box>
              )}
            </Box>
          ) : (
            <>
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
                value={formData.author}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              {/* File Uploads - Usable, Accessible, Responsive */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mb: 2 }}
              >
                <Box sx={{ flex: 1 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      borderColor: ACCENT,
                      color: ACCENT,
                      textTransform: "none",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                    startIcon={
                      <img
                        src="/jump.svg"
                        alt="Upload"
                        style={{ width: 20, height: 20 }}
                      />
                    }
                    aria-label="Upload newsletter image"
                    disabled={!!formData.pdf}
                  >
                    {formData.image
                      ? formData.image.name
                      : "Upload Image (JPG, PNG)"}
                    <input
                      hidden
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                  {formData.image && (
                    <Button
                      size="small"
                      color="error"
                      sx={{ ml: 1 }}
                      onClick={() => handleRemoveFile("image")}
                    >
                      Remove
                    </Button>
                  )}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      borderColor: ACCENT,
                      color: ACCENT,
                      textTransform: "none",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                    startIcon={
                      <img
                        src="/jump.svg"
                        alt="Upload"
                        style={{ width: 20, height: 20 }}
                      />
                    }
                    aria-label="Upload newsletter PDF"
                    disabled={!!formData.image}
                  >
                    {formData.pdf
                      ? formData.pdf.name
                      : "Upload PDF (PDF only)"}
                    <input
                      hidden
                      type="file"
                      name="pdf"
                      accept="application/pdf"
                      onChange={handleFileChange}
                    />
                  </Button>
                  {formData.pdf && (
                    <Button
                      size="small"
                      color="error"
                      sx={{ ml: 1 }}
                      onClick={() => handleRemoveFile("pdf")}
                    >
                      Remove
                    </Button>
                  )}
                </Box>
              </Stack>
              {/* Image Position Selector */}
              {formData.image && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    fontSize={14}
                    fontWeight={500}
                    mb={1}
                    color={ACCENT}
                  >
                    Image Position in Newsletter
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant={
                        formData.imagePosition === "top"
                          ? "contained"
                          : "outlined"
                      }
                      sx={{
                        backgroundColor:
                          formData.imagePosition === "top"
                            ? ACCENT
                            : undefined,
                        color:
                          formData.imagePosition === "top"
                            ? "#fff"
                            : ACCENT,
                        borderColor: ACCENT,
                        flex: 1,
                      }}
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          imagePosition: "top",
                        }))
                      }
                    >
                      Top
                    </Button>
                    <Button
                      variant={
                        formData.imagePosition === "middle"
                          ? "contained"
                          : "outlined"
                      }
                      sx={{
                        backgroundColor:
                          formData.imagePosition === "middle"
                            ? ACCENT
                            : undefined,
                        color:
                          formData.imagePosition === "middle"
                            ? "#fff"
                            : ACCENT,
                        borderColor: ACCENT,
                        flex: 1,
                      }}
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          imagePosition: "middle",
                        }))
                      }
                    >
                      Middle
                    </Button>
                    <Button
                      variant={
                        formData.imagePosition === "bottom"
                          ? "contained"
                          : "outlined"
                      }
                      sx={{
                        backgroundColor:
                          formData.imagePosition === "bottom"
                            ? ACCENT
                            : undefined,
                        color:
                          formData.imagePosition === "bottom"
                            ? "#fff"
                            : ACCENT,
                        borderColor: ACCENT,
                        flex: 1,
                      }}
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          imagePosition: "bottom",
                        }))
                      }
                    >
                      Bottom
                    </Button>
                  </Stack>
                </Box>
              )}
            </>
          )}

          <Stack direction="row" spacing={2} mt={3}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: ACCENT, flex: 1 }}
              disabled={saving || previewMode}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              sx={{ borderColor: ACCENT, color: ACCENT, flex: 1 }}
              onClick={closeModal}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default NewsEventsManagement;
