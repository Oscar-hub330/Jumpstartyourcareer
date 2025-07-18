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
  Backdrop,
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

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const NewsEventsManagement = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [publishOptions, setPublishOptions] = useState({
    isPublished: true,
    notifySubscribers: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [existingNewsletters, setExistingNewsletters] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state to prevent memory leaks
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Fetch existing newsletters
  useEffect(() => {
    if (!isMounted) return;

    const fetchNewsletters = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call - replace with actual fetch
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with your actual API response
        const mockData = [
          {
            id: 1,
            title: "Monthly Newsletter - June 2023",
            fileUrl: "/sample-newsletter.pdf",
            publishDate: new Date("2023-06-15").toISOString(),
            isPublished: true,
          },
          {
            id: 2,
            title: "Special Edition - Spring 2023",
            fileUrl: "/spring-newsletter.pdf",
            publishDate: new Date("2023-03-20").toISOString(),
            isPublished: true,
          },
        ];

        if (isMounted) {
          setExistingNewsletters(mockData);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load newsletters. Please try again later.");
          console.error("Fetch error:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNewsletters();
  }, [isMounted]);

  const handlePdfUpload = (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      if (file.type !== "application/pdf") {
        throw new Error("Please select a valid PDF file");
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error("File size must be less than 10MB");
      }

      setPdfFile(file);
      setError(null);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message,
        severity: "error",
      });
      console.error("Upload error:", err);
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
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create new newsletter object
      const newNewsletter = {
        id: Date.now(),
        title: pdfFile.name.replace(".pdf", ""),
        fileUrl: URL.createObjectURL(pdfFile),
        publishDate: new Date().toISOString(),
        isPublished: publishOptions.isPublished,
      };

      if (isMounted) {
        setExistingNewsletters([newNewsletter, ...existingNewsletters]);
        setPdfFile(null);
        setPublishDialogOpen(false);
        
        setSnackbar({
          open: true,
          message: "Newsletter published successfully!",
          severity: "success",
        });
      }
    } catch (err) {
      if (isMounted) {
        setSnackbar({
          open: true,
          message: "Failed to publish newsletter",
          severity: "error",
        });
        console.error("Publish error:", err);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (isMounted) {
        setExistingNewsletters(existingNewsletters.filter(nl => nl.id !== id));
        setSnackbar({
          open: true,
          message: "Newsletter deleted successfully",
          severity: "success",
        });
      }
    } catch (err) {
      if (isMounted) {
        setSnackbar({
          open: true,
          message: "Failed to delete newsletter",
          severity: "error",
        });
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (!isMounted) {
    return null; // Or a loading spinner
  }

  return (
    <Box sx={{ p: 4, position: "relative" }}>
      {/* Loading overlay */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading && existingNewsletters.length === 0}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Typography
        variant="h4"
        sx={{ mb: 2, fontWeight: "bold", color: "#fea434" }}
      >
        Newsletter Management
      </Typography>

      {/* Upload Section */}
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
              disabled={loading}
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
                disabled={loading}
              />
            </Button>

            {pdfFile ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  label={pdfFile.name}
                  onDelete={() => !loading && setPdfFile(null)}
                  deleteIcon={<Delete />}
                  variant="outlined"
                />
                <Button
                  variant="outlined"
                  onClick={() => setPdfFile(null)}
                  size="small"
                  disabled={loading}
                >
                  Change
                </Button>
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                {loading ? "Processing..." : "No file selected"}
              </Typography>
            )}
          </Box>

          {pdfFile && (
            <>
              <Box sx={{ mb: 3, border: "1px solid #eee", p: 2, borderRadius: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                  PDF Preview (First Page)
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
                    error={
                      <Alert severity="error">Failed to load PDF preview</Alert>
                    }
                  >
                    <Page
                      pageNumber={1}
                      width={300}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
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
              disabled={loading}
            >
              Refresh
            </Button>
          </Box>

          {error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
              <Button 
                onClick={() => window.location.reload()} 
                color="inherit"
                size="small"
                sx={{ ml: 1 }}
              >
                Retry
              </Button>
            </Alert>
          ) : null}

          {loading && existingNewsletters.length === 0 ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : existingNewsletters.length === 0 ? (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", p: 4 }}>
              No newsletters found. Upload one to get started.
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
                  <Box sx={{ overflow: "hidden" }}>
                    <Typography 
                      variant="subtitle1" 
                      fontWeight="bold"
                      noWrap
                      sx={{ maxWidth: "300px", textOverflow: "ellipsis" }}
                    >
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
                      disabled={loading}
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
        onClose={() => !loading && setPublishDialogOpen(false)}
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
                disabled={loading}
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
                disabled={loading}
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