import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
  Modal,
  Box,
  CircularProgress,
} from "@mui/material";
import Footer from "../components/Footer";
import backgroundImg from "../assets/car.svg";
import axios from "axios"; // Make sure axios is installed

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
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);

  const handleOpen = (newsletter) => {
    setSelectedNewsletter(newsletter);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNewsletter(null);
  };

  // Fetch data from backend
  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const response = await axios.get("/api/newsletters");
        setNewsletters(response.data); // expecting array of {title, image, pdf, description}
      } catch (error) {
        console.error("Failed to fetch newsletters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

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
      {/* Header */}
      <div className="bg-black bg-opacity-70 py-16 text-center text-white">
        <Typography variant="h3" className="font-bold mb-2 text-[#fea434]">
          Newsletters Archive
        </Typography>
        <Typography variant="subtitle1">
          Browse and download our newsletters by month and year.
        </Typography>
      </div>

      <Container sx={{ py: 8 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
            <CircularProgress color="warning" />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {newsletters.map(({ title, image, pdf, description }, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardMedia
                    component="img"
                    image={image}
                    alt={`${title} newsletter image`}
                    sx={{ height: 160 }}
                    loading="lazy"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      color="#fea434"
                      textAlign="center"
                      mb={2}
                    >
                      {title}
                    </Typography>

                    <Box display="flex" justifyContent="space-between" gap={1}>
                      <Button
                        variant="outlined"
                        sx={{ color: "#fea434", borderColor: "#fea434", flexGrow: 1 }}
                        onClick={() => handleOpen({ title, description })}
                      >
                        Read More
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#fea434",
                          flexGrow: 1,
                          "&:hover": { backgroundColor: "#e69420" },
                        }}
                        href={pdf}
                        download
                      >
                        Download PDF
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h5" mb={2} color="#fea434">
            {selectedNewsletter?.title}
          </Typography>
          <Typography variant="body1" mb={4}>
            {selectedNewsletter?.description}
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
