import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Modal,
  Box,
} from "@mui/material";
import Footer from "../components/Footer";
import backgroundImg from "../assets/car.svg";
import axios from "axios";

// Styles for modal box
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  maxWidth: 600,
  width: "90%",
  outline: "none",
};

const NewsEvents = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);

  // 🔁 Fetch newsletters from backend
  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/newsletters");
        setNewsletters(res.data);
      } catch (err) {
        console.error("Failed to fetch newsletters:", err);
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

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="bg-black bg-opacity-70 py-16 text-center text-white">
        <Typography variant="h3" className="font-bold mb-2 text-[#fea434]">
          Newsletters Archive
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Browse and download our newsletters by month and year.
        </Typography>
      </div>

      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {newsletters.length === 0 ? (
            <Typography variant="h6" color="textSecondary">
              No newsletters found.
            </Typography>
          ) : (
            newsletters.map((newsletter, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      color="#fea434"
                      textAlign="center"
                      mb={2}
                    >
                      Newsletter #{newsletter.templateIndex}
                    </Typography>

                    {newsletter.sections.length > 0 && (
                      <Typography variant="body2" mb={2}>
                        {newsletter.sections[0].title}: {newsletter.sections[0].content}
                      </Typography>
                    )}

                    <Box display="flex" justifyContent="space-between" gap={1}>
                      <Button
                        variant="outlined"
                        sx={{ color: "#fea434", borderColor: "#fea434", flexGrow: 1 }}
                        onClick={() => handleOpen(newsletter)}
                      >
                        Read More
                      </Button>

                      {newsletter.pdfUrl && (
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "#fea434", flexGrow: 1, "&:hover": { backgroundColor: "#e69420" } }}
                          href={newsletter.pdfUrl}
                          download
                        >
                          Download PDF
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      {/* Modal for Read More */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h5" mb={2} color="#fea434">
            {selectedNewsletter?.sections[0]?.title}
          </Typography>
          <Typography id="modal-description" variant="body1" mb={4}>
            {selectedNewsletter?.sections[0]?.content}
          </Typography>
          <Button variant="contained" onClick={handleClose} sx={{ backgroundColor: "#fea434" }}>
            Close
          </Button>
        </Box>
      </Modal>

      <Footer />
    </div>
  );
};

export default NewsEvents;
