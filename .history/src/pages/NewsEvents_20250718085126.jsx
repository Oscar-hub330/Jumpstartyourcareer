import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import Footer from "../components/Footer";
import backgroundImg from "../assets/car.svg";
import axios from "axios";

const NewsEvents = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Fetch newsletters from API
  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get("/api/newsletters");
        setNewsletters(response.data);
      } catch (err) {
        setError("Failed to load newsletters");
        console.error("Error fetching newsletters:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  const handleDownload = async (id, title) => {
    try {
      // Track download in your backend
      await axios.post(`/api/newsletters/${id}/download`);
      
      setSnackbar({
        open: true,
        message: `Downloading ${title}`,
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to track download",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Hero Section */}
      <div className="bg-black bg-opacity-70 py-20 text-white text-center">
        <Typography
          variant="h3"
          className="font-bold mb-4 text-[#fea434] text-3xl sm:text-4xl md:text-5xl"
        >
          Our Newsletters
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            maxWidth: "640px",
            mx: "auto",
            textAlign: "center",
            fontSize: { xs: "1rem", sm: "1.125rem" },
          }}
        >
          Access all our published newsletters
        </Typography>
      </div>

      {/* Newsletter Grid */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {newsletters.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Typography variant="h6" color="textSecondary">
              No newsletters available yet
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {newsletters.map((newsletter) => (
              <Grid item key={newsletter.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={newsletter.thumbnailUrl || "/default-newsletter-thumbnail.jpg"}
                    alt={newsletter.title}
                    sx={{ height: 200, objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3" color="#fea434">
                      {newsletter.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {newsletter.description || "Monthly newsletter"}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      Published: {new Date(newsletter.publishDate).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, textAlign: "center" }}>
                    <Button
                      variant="contained"
                      href={newsletter.fileUrl}
                      download
                      onClick={() => handleDownload(newsletter.id, newsletter.title)}
                      startIcon={<DownloadIcon />}
                      fullWidth
                      sx={{
                        backgroundColor: "#fea434",
                        "&:hover": {
                          backgroundColor: "#e69420",
                        },
                      }}
                    >
                      Download PDF
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

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

      <Footer />
    </div>
  );
};

export default NewsEvents;