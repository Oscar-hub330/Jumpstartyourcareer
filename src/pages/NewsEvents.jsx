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
} from "@mui/material";
import Footer from "../components/Footer";
import axios from "axios";
import AOS from "aos";
import DownloadIcon from "@mui/icons-material/Download";
import "aos/dist/aos.css";

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
};

const NewsEvents = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleOpen = (newsletter) => {
    setSelectedNewsletter(newsletter);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNewsletter(null);
  };

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/newsletters");
        setNewsletters(res.data);
      } catch (error) {
        console.error("Failed to fetch newsletters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  return (
    <div style={{ backgroundColor: "#feead8", minHeight: "100vh" }}>
      {/* Hero Section */}
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
            JumpStart Newsletters
          </Typography>
          <Typography sx={{ fontSize: "1.1rem" }}>
            Stay updated with our latest publications and revisit past editions.
          </Typography>
        </Container>
      </Box>

      {/* Newsletter List */}
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
              }}
            >
              {newsletter.image && (
                <Box sx={{ width: "35%", minHeight: 200 }}>
                  <img
                    src={`http://localhost:4000/uploads/${newsletter.image}`}
                    alt="Newsletter"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                <Typography variant="body2" color="textSecondary">
                  {newsletter.description?.slice(0, 100)}...
                </Typography>

                <Box display="flex" alignItems="center" mt={2} gap={1}>
                  <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                    {newsletter.author?.[0] || "A"}
                  </Avatar>
                  <Typography variant="caption">
                    {newsletter.author || "Admin"} •{" "}
                    {new Date(newsletter.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>

                <Box mt={2} display="flex" gap={2}>
                  <Button
                    variant="contained"
                    onClick={() => handleOpen(newsletter)}
                    sx={{ backgroundColor: "#ffa333", color: "white" }}
                  >
                    Read More
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    href={`http://localhost:4000/uploads/${newsletter.pdf}`}
                    download
                    sx={{ borderColor: "#ffa333", color: "#ffa333" }}
                  >
                    Download PDF
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Container>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          {selectedNewsletter?.image && (
            <img
              src={`http://localhost:4000/uploads/${selectedNewsletter.image}`}
              alt="Newsletter Visual"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 8,
                marginBottom: 16,
              }}
            />
          )}
          <Typography variant="h5" mb={1} color="#8d4f00" fontWeight={700}>
            {selectedNewsletter?.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={1}>
            By {selectedNewsletter?.author || "Admin"} •{" "}
            {new Date(selectedNewsletter?.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" mb={2}>
            {selectedNewsletter?.description}
          </Typography>

          {/* PDF Preview */}
          {selectedNewsletter?.pdf && (
            <iframe
              src={`http://localhost:4000/uploads/${selectedNewsletter?.pdf}`}
              title="Newsletter PDF"
              width="100%"
              height="500px"
              style={{ border: "1px solid #ccc", borderRadius: 8, marginBottom: 16 }}
            />
          )}

          {/* Action Buttons */}
          <Box display="flex" justifyContent="flex-start" gap={2}>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              href={`http://localhost:4000/uploads/${selectedNewsletter?.pdf}`}
              download
              sx={{ backgroundColor: "#ffa333", color: "white" }}
            >
              Download PDF
            </Button>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ borderColor: "#ffa333", color: "#ffa333" }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      <Footer />
    </div>
  );
};

export default NewsEvents;
