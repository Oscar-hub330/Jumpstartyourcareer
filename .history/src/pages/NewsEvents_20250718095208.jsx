import React, { useState, useEffect, useRef } from "react";
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
  Modal,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Badge,
  Tab,
  Tabs,
  Autocomplete,
} from "@mui/material";
import {
  Delete,
  Publish,
  PictureAsPdf,
  CloudUpload,
  Refresh,
  Visibility,
  Close,
  Email,
  PersonAdd,
  Person,
  List,
  Article,
  LocalOffer,
} from "@mui/icons-material";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const NewsEventsManagement = () => {
  // State for newsletter management
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
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
  const fileInputRef = useRef(null);

  // State for subscribers management
  const [subscribers, setSubscribers] = useState([]);
  const [newSubscriberEmail, setNewSubscriberEmail] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // State for blog management
  const [blogPosts, setBlogPosts] = useState([]);
  const [newBlogPost, setNewBlogPost] = useState({
    title: "",
    content: "",
    author: "",
    tags: [],
  });
  const [availableTags, setAvailableTags] = useState([
    "Technology",
    "Business",
    "Health",
    "Education",
    "Sports",
  ]);
  const [availableAuthors, setAvailableAuthors] = useState([
    "John Doe",
    "Jane Smith",
    "Alex Johnson",
  ]);

  // Set mounted state to prevent memory leaks
  useEffect(() => {
    setIsMounted(true);
    fetchInitialData();
    return () => setIsMounted(false);
  }, []);

  // Fetch all initial data
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      
      // Simulate multiple API calls
      await Promise.all([
        fetchNewsletters(),
        fetchSubscribers(),
        fetchBlogPosts(),
      ]);
    } catch (err) {
      setError("Failed to load initial data. Please try again later.");
      console.error("Initial data fetch error:", err);
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  // Fetch existing newsletters
  const fetchNewsletters = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockData = [
        {
          id: 1,
          title: "Monthly Newsletter - June 2023",
          fileUrl: "/sample-newsletter.pdf",
          publishDate: new Date("2023-06-15").toISOString(),
          isPublished: true,
          subscribersNotified: true,
        },
      ];

      if (isMounted) {
        setExistingNewsletters(mockData);
      }
    } catch (err) {
      if (isMounted) {
        console.error("Fetch newsletters error:", err);
      }
    }
  };

  // Fetch subscribers
  const fetchSubscribers = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data
      const mockSubscribers = [
        { id: 1, email: "subscriber1@example.com", subscribedAt: new Date("2023-05-10").toISOString() },
        { id: 2, email: "subscriber2@example.com", subscribedAt: new Date("2023-05-15").toISOString() },
        { id: 3, email: "subscriber3@example.com", subscribedAt: new Date("2023-06-01").toISOString() },
      ];

      if (isMounted) {
        setSubscribers(mockSubscribers);
      }
    } catch (err) {
      if (isMounted) {
        console.error("Fetch subscribers error:", err);
      }
    }
  };

  // Fetch blog posts
  const fetchBlogPosts = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock data
      const mockBlogPosts = [
        {
          id: 1,
          title: "Getting Started with React",
          content: "Lorem ipsum dolor sit amet...",
          author: "John Doe",
          tags: ["Technology", "Programming"],
          createdAt: new Date("2023-06-10").toISOString(),
        },
        {
          id: 2,
          title: "Business Trends in 2023",
          content: "Consectetur adipiscing elit...",
          author: "Jane Smith",
          tags: ["Business"],
          createdAt: new Date("2023-06-15").toISOString(),
        },
      ];

      if (isMounted) {
        setBlogPosts(mockBlogPosts);
      }
    } catch (err) {
      if (isMounted) {
        console.error("Fetch blog posts error:", err);
      }
    }
  };

  // Newsletter functions (same as before)
  const handlePdfUpload = (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      if (file.type !== "application/pdf") {
        throw new Error("Please select a valid PDF file");
      }

      if (file.size > 10 * 1024 * 1024) {
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
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleOpenPreview = () => {
    if (pdfFile) {
      setPreviewOpen(true);
    }
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
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
        subscribersNotified: publishOptions.notifySubscribers,
      };

      if (isMounted) {
        setExistingNewsletters([newNewsletter, ...existingNewsletters]);
        setPdfFile(null);
        setPublishDialogOpen(false);
        
        // If notify subscribers is checked, simulate sending emails
        if (publishOptions.notifySubscribers) {
          // In a real app, you would call your backend API to send emails
          console.log(`Sending newsletter to ${subscribers.length} subscribers`);
        }
        
        setSnackbar({
          open: true,
          message: `Newsletter published successfully${publishOptions.notifySubscribers ? ' and subscribers notified' : ''}!`,
          severity: "success",
        });
        
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
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

  const handleDeleteNewsletter = async (id) => {
    try {
      setLoading(true);
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

  // Subscriber functions
  const handleAddSubscriber = async () => {
    if (!newSubscriberEmail || !validateEmail(newSubscriberEmail)) {
      setSnackbar({
        open: true,
        message: "Please enter a valid email address",
        severity: "error",
      });
      return;
    }

    if (subscribers.some(sub => sub.email === newSubscriberEmail)) {
      setSnackbar({
        open: true,
        message: "This email is already subscribed",
        severity: "warning",
      });
      return;
    }

    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newSubscriber = {
        id: Date.now(),
        email: newSubscriberEmail,
        subscribedAt: new Date().toISOString(),
      };

      if (isMounted) {
        setSubscribers([...subscribers, newSubscriber]);
        setNewSubscriberEmail("");
        setSnackbar({
          open: true,
          message: "Subscriber added successfully",
          severity: "success",
        });
      }
    } catch (err) {
      if (isMounted) {
        setSnackbar({
          open: true,
          message: "Failed to add subscriber",
          severity: "error",
        });
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  const handleDeleteSubscriber = async (id) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (isMounted) {
        setSubscribers(subscribers.filter(sub => sub.id !== id));
        setSnackbar({
          open: true,
          message: "Subscriber removed successfully",
          severity: "success",
        });
      }
    } catch (err) {
      if (isMounted) {
        setSnackbar({
          open: true,
          message: "Failed to remove subscriber",
          severity: "error",
        });
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Blog post functions
  const handleAddBlogPost = async () => {
    if (!newBlogPost.title || !newBlogPost.content || !newBlogPost.author) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields",
        severity: "error",
      });
      return;
    }

    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPost = {
        id: Date.now(),
        ...newBlogPost,
        createdAt: new Date().toISOString(),
      };

      if (isMounted) {
        setBlogPosts([newPost, ...blogPosts]);
        setNewBlogPost({
          title: "",
          content: "",
          author: "",
          tags: [],
        });
        setSnackbar({
          open: true,
          message: "Blog post added successfully",
          severity: "success",
        });
      }
    } catch (err) {
      if (isMounted) {
        setSnackbar({
          open: true,
          message: "Failed to add blog post",
          severity: "error",
        });
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  const handleDeleteBlogPost = async (id) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (isMounted) {
        setBlogPosts(blogPosts.filter(post => post.id !== id));
        setSnackbar({
          open: true,
          message: "Blog post deleted successfully",
          severity: "success",
        });
      }
    } catch (err) {
      if (isMounted) {
        setSnackbar({
          open: true,
          message: "Failed to delete blog post",
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Box sx={{ p: 4, position: "relative" }}>
      {/* Loading overlay */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading && existingNewsletters.length === 0 && subscribers.length === 0 && blogPosts.length === 0}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Typography
        variant="h4"
        sx={{ mb: 2, fontWeight: "bold", color: "#fea434" }}
      >
        Content Management System
      </Typography>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
        variant="fullWidth"
      >
        <Tab icon={<Email />} label="Newsletters" />
        <Tab icon={<List />} label="Subscribers" />
        <Tab icon={<Article />} label="Blog Posts" />
      </Tabs>

      {/* Newsletter Tab */}
      {activeTab === 0 && (
        <>
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
                    ref={fileInputRef}
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
                    <Button
                      variant="outlined"
                      startIcon={<Visibility />}
                      onClick={handleOpenPreview}
                      disabled={loading}
                    >
                      Preview
                    </Button>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    {loading ? "Processing..." : "No file selected"}
                  </Typography>
                )}
              </Box>

              {pdfFile && (
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
              )}
            </CardContent>
          </Card>

          {/* PDF Preview Modal */}
          <Modal
            open={previewOpen}
            onClose={handleClosePreview}
            aria-labelledby="pdf-preview-modal"
            aria-describedby="pdf-preview-modal-description"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              outline: "none",
            }}
          >
            <Box
              sx={{
                backgroundColor: "background.paper",
                boxShadow: 24,
                p: 3,
                width: "90%",
                maxWidth: "900px",
                maxHeight: "90vh",
                overflow: "auto",
                outline: "none",
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" id="pdf-preview-modal">
                  PDF Preview: {pdfFile?.name}
                </Typography>
                <IconButton onClick={handleClosePreview}>
                  <Close />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  height: "70vh",
                  overflow: "auto",
                }}
              >
                <Document
                  file={pdfFile}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  }
                  error={
                    <Alert severity="error" sx={{ my: 2 }}>
                      Failed to load PDF preview
                    </Alert>
                  }
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <Box
                      key={`page_${index + 1}`}
                      sx={{
                        mb: 2,
                        p: 1,
                        border: "1px solid #eee",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Page {index + 1} of {numPages}
                      </Typography>
                      <Page
                        pageNumber={index + 1}
                        width={800}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </Box>
                  ))}
                </Document>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleClosePreview();
                    setPublishDialogOpen(true);
                  }}
                  sx={{
                    backgroundColor: "#fea434",
                    "&:hover": { backgroundColor: "#e69420" },
                  }}
                >
                  Publish This Newsletter
                </Button>
              </Box>
            </Box>
          </Modal>

          {/* Existing Newsletters Section */}
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6">Published Newsletters</Typography>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={fetchNewsletters}
                  disabled={loading}
                >
                  Refresh
                </Button>
              </Box>

              {error ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                  <Button 
                    onClick={fetchNewsletters} 
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
                        {newsletter.subscribersNotified && (
                          <Chip
                            label="Subscribers Notified"
                            color="info"
                            size="small"
                            sx={{ ml: 1 }}
                            icon={<Email fontSize="small" />}
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
                          onClick={() => handleDeleteNewsletter(newsletter.id)}
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
                label={`Notify ${subscribers.length} subscribers via email`}
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
        </>
      )}

      {/* Subscribers Tab */}
      {activeTab === 1 && (
        <Card sx={{ p: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Newsletter Subscribers
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <TextField
                label="Search subscribers"
                variant="outlined"
                size="small"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Email fontSize="small" sx={{ mr: 1, color: "action.active" }} />,
                }}
              />
              <Badge badgeContent={subscribers.length} color="primary">
                <Person fontSize="large" />
              </Badge>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <TextField
                label="Add new subscriber"
                variant="outlined"
                size="small"
                fullWidth
                value={newSubscriberEmail}
                onChange={(e) => setNewSubscriberEmail(e.target.value)}
                placeholder="Enter email address"
                InputProps={{
                  startAdornment: <PersonAdd fontSize="small" sx={{ mr: 1, color: "action.active" }} />,
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddSubscriber}
                disabled={loading}
                sx={{
                  backgroundColor: "#fea434",
                  "&:hover": { backgroundColor: "#e69420" },
                }}
              >
                Add
              </Button>
            </Box>

            {loading && subscribers.length === 0 ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
              </Box>
            ) : filteredSubscribers.length === 0 ? (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", p: 4 }}>
                {searchTerm ? "No matching subscribers found" : "No subscribers yet"}
              </Typography>
            ) : (
              <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>Subscribed On</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredSubscribers.map((subscriber) => (
                      <TableRow key={subscriber.id}>
                        <TableCell>{subscriber.email}</TableCell>
                        <TableCell>
                          {new Date(subscriber.subscribedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteSubscriber(subscriber.id)}
                            disabled={loading}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      )}

      {/* Blog Posts Tab */}
      {activeTab === 2 && (
        <>
          <Card sx={{ p: 3, mb: 4, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Create New Blog Post
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={newBlogPost.title}
                  onChange={(e) => setNewBlogPost({ ...newBlogPost, title: e.target.value })}
                />

                <TextField
                  label="Content"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={newBlogPost.content}
                  onChange={(e) => setNewBlogPost({ ...newBlogPost, content: e.target.value })}
                />

                <Autocomplete
                  options={availableAuthors}
                  freeSolo
                  value={newBlogPost.author}
                  onChange={(event, newValue) => {
                    setNewBlogPost({ ...newBlogPost, author: newValue });
                  }}
                  onInputChange={(event, newInputValue) => {
                    setNewBlogPost({ ...newBlogPost, author: newInputValue });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Author"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />

                <Autocomplete
                  multiple
                  options={availableTags}
                  freeSolo
                  value={newBlogPost.tags}
                  onChange={(event, newValue) => {
                    setNewBlogPost({ ...newBlogPost, tags: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <LocalOffer fontSize="small" sx={{ mr: 1, color: "action.active" }} />
                            {params.InputProps.startAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option}
                        {...getTagProps({ index })}
                        key={index}
                        sx={{ m: 0.5 }}
                      />
                    ))
                  }
                />

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    onClick={handleAddBlogPost}
                    disabled={loading}
                    sx={{
                      backgroundColor: "#fea434",
                      "&:hover": { backgroundColor: "#e69420" },
                    }}
                  >
                    Publish Blog Post
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ p: 3, boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6">Published Blog Posts</Typography>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={fetchBlogPosts}
                  disabled={loading}
                >
                  Refresh
                </Button>
              </Box>

              {loading && blogPosts.length === 0 ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                  <CircularProgress />
                </Box>
              ) : blogPosts.length === 0 ? (
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", p: 4 }}>
                  No blog posts found. Create one to get started.
                </Typography>
              ) : (
                <Box sx={{ maxHeight: 500, overflow: "auto" }}>
                  {blogPosts.map((post) => (
                    <Box
                      key={post.id}
                      sx={{
                        p: 3,
                        mb: 3,
                        border: "1px solid #eee",
                        borderRadius: 1,
                        "&:hover": { backgroundColor: "#fff8f0" },
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Box>
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            {post.title}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              By {post.author}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              • {new Date(post.createdAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                            {post.tags.map((tag, index) => (
                              <Chip
                                key={index}
                                label={tag}
                                size="small"
                                icon={<LocalOffer fontSize="small" />}
                              />
                            ))}
                          </Box>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {post.content.length > 150
                              ? `${post.content.substring(0, 150)}...`
                              : post.content}
                          </Typography>
                        </Box>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteBlogPost(post.id)}
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
        </>
      )}

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