/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Modal,
  CircularProgress,
  Avatar,
  Chip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import ArticleIcon from "@mui/icons-material/Article";
import axios from "axios";
import Footer from "../components/Footer";

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

const NewsEvents = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/newsletters");
        const list = Array.isArray(res.data)
          ? res.data
          : res.data?.data || res.data?.newsletters || [];
        setNewsletters(list);
      } catch (error) {
        console.error("Failed to fetch newsletters:", error);
        setNewsletters([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsletters();
  }, []);

  const handleOpen = (newsletter) => {
    setSelectedNewsletter(newsletter);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNewsletter(null);
  };

  const formatDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "—";

  return (
    <Box sx={{ minHeight: "50vh", backgroundColor: "#fff7ed" }}>
      {/* Hero */}
      <Box
        sx={{
          py: 7,
          textAlign: "center",
          color: "#fff",
          background: `linear-gradient(135deg, ${ACCENT}, #ffb84d)`,
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 1, display: "inline-flex", alignItems: "center", gap: 1 }}
        >
          <ArticleIcon fontSize="small" /> Publications
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Newsletter Archive
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, mx: "auto" }}>
          Stay informed with our latest organizational updates and publications.
        </Typography>
      </Box>

      {/* List */}
      <Box sx={{ maxWidth: 1000, mx: "auto", py: 0, px: 2 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 20 }}>
            <CircularProgress sx={{ color: ACCENT }} />
          </Box>
        ) : newsletters.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 20 }}>
            <ArticleIcon sx={{ fontSize: 60, mb: 2, color: ACCENT }} />
            <Typography variant="h6">No newsletters available</Typography>
            <Typography>Check back later.</Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {newsletters.map((nl) => (
              <Card
                key={nl._id}
                sx={{
                  display: "flex",
                  overflow: "hidden",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                {nl.image && (
                  <CardMedia
                    component="img"
                    sx={{ width: 250, objectFit: "cover" }}
                    image={`http://localhost:4000/uploads/${nl.image}`}
                    alt={nl.title}
                  />
                )}
                <CardContent sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                      {nl.title}
                    </Typography>
                    {nl.pdf && <Chip label="PDF" sx={{ borderColor: ACCENT, color: ACCENT }} />}
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {nl.description ? `${nl.description.slice(0, 120)}...` : "No description available."}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
                    <Avatar sx={{ width: 24, height: 24 }}>{(nl.author || "A")[0]}</Avatar>
                    <Typography variant="caption">
                      {nl.author || "Admin"} • {formatDate(nl.createdAt)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: ACCENT }}
                      onClick={() => handleOpen(nl)}
                    >
                      Read More
                    </Button>
                    {nl.pdf && (
                      <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        sx={{ borderColor: ACCENT, color: ACCENT }}
                        href={`http://localhost:4000/uploads/${nl.pdf}`}
                        download
                      >
                        Download PDF
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          {selectedNewsletter?.image && (
            <img
              src={`http://localhost:4000/uploads/${selectedNewsletter.image}`}
              alt=""
              style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
            />
          )}
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1, color: ACCENT }}>
            {selectedNewsletter?.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            By {selectedNewsletter?.author || "Admin"} • {formatDate(selectedNewsletter?.createdAt)}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {selectedNewsletter?.description}
          </Typography>
          {selectedNewsletter?.pdf && (
            <iframe
              src={`http://localhost:4000/uploads/${selectedNewsletter.pdf}`}
              title="Newsletter PDF"
              style={{ width: "100%", height: 500, border: "1px solid #ccc", borderRadius: 8, marginBottom: 16 }}
            />
          )}
          <Box sx={{ display: "flex", gap: 2 }}>
            {selectedNewsletter?.pdf && (
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                sx={{ backgroundColor: ACCENT }}
                href={`http://localhost:4000/uploads/${selectedNewsletter.pdf}`}
                download
              >
                Download PDF
              </Button>
            )}
            <Button variant="outlined" onClick={handleClose} sx={{ borderColor: ACCENT, color: ACCENT }}>
              <CloseIcon sx={{ fontSize: 18, mr: 1 }} />
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      <Footer />
    </Box>
  );
};

export default NewsEvents;
