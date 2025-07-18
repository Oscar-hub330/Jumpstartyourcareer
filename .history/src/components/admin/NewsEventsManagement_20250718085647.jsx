import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  Divider,
  Chip,
} from "@mui/material";
import {
  Delete,
  Publish,
  PictureAsPdf,
  CloudUpload,
  Refresh,
} from "@mui/icons-material";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const NewsEventsManagement = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [publishOptions, setPublishOptions] = useState({
    isPublished: true,
    notifySubscribers: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [existingNewsletters, setExistingNewsletters] = useState([]);

  // Fetch existing newsletters
  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/newsletters");
        setExistingNewsletters(response.data);
      } catch (err) {
        setError("Failed to load existing newsletters");
        console.error("Error fetching newsletters:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      setSnackbar({
        open: true,
        message: "Please select a valid PDF file",
        severity: "error",
      });
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePublish = async () => {
    if (!pdfFile) {
      setSnackbar({
        open: true,
        message: "Please upload a PDF file first",
        severity: "error",
      });
      return;
    }

    try {
      setLoading(true);
      
      // In a real implementation, you would upload the file to your server
      const formData = new FormData();
      formData.append("pdf", pdfFile);
      formData.append("publishOptions", JSON.stringify(publishOptions));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll just add it to the local state
      const newNewsletter = {
        id: Date.now(),
        title: pdfFile.name.replace(".pdf", ""),
        fileUrl: URL.createObjectURL(pdfFile),
        publishDate: new Date().toISOString(),
        isPublished: publishOptions.isPublished,
      };

      setExistingNewsletters([newNewsletter, ...existingNewsletters]);
      setPdfFile(null);
      setPublishDialogOpen(false);
      
      setSnackbar({
        open: true,
        message: "Newsletter published successfully!",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to publish newsletter",
        severity: "error",
      });
      console.error("Publish error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setExistingNewsletters(existingNewsletters.filter(nl => nl.id !== id));
      setSnackbar({
        open: true,
        message: "Newsletter deleted successfully",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to delete newsletter",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 2, fontWeight: "bold", color: "#fea434" }}
      >
        Newsletter Management
      </Typography>

      <Card sx={{ p: 3, mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upload New Newsletter
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUpload />}
              sx={{
                backgroundColor: "#fea434",
                "&:hover": { backgroundColor: "#e69420" },
              }}
            >
              Select PDF
              <input
                type="file"
                hidden
                accept="application/pdf"
                onChange={handlePdfUpload}
              />
            </Button>

            {pdfFile ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  label={pdfFile.name}
                  onDelete={() => setPdfFile(null)}
                  deleteIcon={<Delete />}
                  variant="outlined"
                />
                <Button
                  variant="outlined"
                  onClick={() => setPdfFile(null)}
                  size="small"
                >
                  Change
                </Button>
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No file selected
              </Typography>
            )}
          </Box>

          {pdfFile && (
            <>
              <Box sx={{ mb: 3, border: "1px solid #eee", p: 2, borderRadius: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                  PDF Preview
                </Typography>
                <Box sx={{ maxHeight: 300, overflow: "auto" }}>
                  <Document
                    file={pdfFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                        <CircularProgress size={24} />
                      </Box>
                    }
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        width={300}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    ))}
                  </Document>
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={() => setPublishDialogOpen(true)}
                  startIcon={<Publish />}
                  disabled={loading}
                  sx={{
                    backgroundColor: "#4caf50",
                    "&:hover": { backgroundColor: "#388e3c" },
                  }}
                >
                  Publish Newsletter
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>

      {/* Existing Newsletters Section */}
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6">Published Newsletters</Typography>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </Box>

          {loading && existingNewsletters.length === 0 ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : error && existingNewsletters.length === 0 ? (
            <Alert severity="error">{error}</Alert>
          ) : existingNewsletters.length === 0 ? (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", p: 4 }}>
              No newsletters published yet
            </Typography>
          ) : (
            <Box sx={{ maxHeight: 500, overflow: "auto" }}>
              {existingNewsletters.map((newsletter) => (
                <Box
                  key={newsletter.id}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: "1px solid #eee",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    "&:hover": { backgroundColor: "#fff8f0" },
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {newsletter.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Published: {new Date(newsletter.publishDate).toLocaleDateString()}
                    </Typography>
                    {newsletter.isPublished ? (
                      <Chip
                        label="Published"
                        color="success"
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    ) : (
                      <Chip
                        label="Draft"
                        color="warning"
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Box>
                  <Box>
                    <Button
                      variant="outlined"
                      href={newsletter.fileUrl}
                      download
                      target="_blank"
                      size="small"
                      startIcon={<PictureAsPdf />}
                      sx={{ mr: 1 }}
                    >
                      Download
                    </Button>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(newsletter.id)}
                      disabled={loading}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Publish Dialog */}
      <Dialog
        open={publishDialogOpen}
        onClose={() => setPublishDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Publish Newsletter</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            You are about to publish: <strong>{pdfFile?.name}</strong>
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <FormControlLabel
            control={
              <Switch
                checked={publishOptions.isPublished}
                onChange={(e) =>
                  setPublishOptions({
                    ...publishOptions,
                    isPublished: e.target.checked,
                  })
                }
              />
            }
            label="Make newsletter publicly available"
            sx={{ mb: 1 }}
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={publishOptions.notifySubscribers}
                onChange={(e) =>
                  setPublishOptions({
                    ...publishOptions,
                    notifySubscribers: e.target.checked,
                  })
                }
              />
            }
            label="Notify subscribers via email"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setPublishDialogOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePublish}
            variant="contained"
            color="success"
            startIcon={loading ? <CircularProgress size={20} /> : <Publish />}
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewsEventsManagement;