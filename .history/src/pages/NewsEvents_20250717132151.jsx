import React, { useState } from "react";
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
} from "@mui/material";
import Footer from "../components/Footer";
import backgroundImg from "../assets/car.svg";

// Local static data
const newsletters = [
  {
    title: "March 2022",
    image: "/newsletters/images/march-2022.jpg",
    pdf: "/newsletters/newsletter-march-2022.pdf",
    description: "This edition covers our latest programs on youth digital skills training.",
  },
  {
    title: "February 2022",
    image: "/newsletters/images/february-2022.jpg",
    pdf: "/newsletters/newsletter-february-2022.pdf",
    description: "Highlights from the Entrepreneurship Bootcamp held in January.",
  },
  {
    title: "January 2022",
    image: "/newsletters/images/january-2022.jpg",
    pdf: "/newsletters/newsletter-january-2022.pdf",
    description: "Kickstarting the year with new community outreach projects.",
  },
  // You can add more here
];

// Modal style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  width: "90%",
  maxWidth: 600,
  outline: "none",
};

const NewsEvents = () => {
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
      {/* Hero Banner */}
      <div className="bg-black bg-opacity-70 py-16 text-center text-white px-4">
        <Typography
          variant="h3"
          className="font-bold mb-4 text-[#fea434] text-3xl sm:text-4xl md:text-5xl"
        >
          Newsletters Archive
        </Typography>
        <Typography
          variant="subtitle1"
          className="max-w-2xl mx-auto text-base sm:text-lg"
        >
          Browse and download our newsletters by month and year.
        </Typography>
      </div>

      {/* Grid Content */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {newsletters.map(({ title, image, pdf, description }, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                elevation={4}
              >
                <CardMedia
                  component="img"
                  src={image}
                  alt={`${title} newsletter image`}
                  loading="lazy"
                  sx={{ height: 160, objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="h2"
                    color="#fea434"
                    textAlign="center"
                    gutterBottom
                  >
                    {title}
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    justifyContent="center"
                    alignItems="center"
                    gap={1}
                    mt={2}
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        color: "#fea434",
                        borderColor: "#fea434",
                        "&:hover": {
                          backgroundColor: "#fff7ed",
                          borderColor: "#fea434",
                        },
                      }}
                      onClick={() => handleOpen({ title, description })}
                    >
                      Read More
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: "#fea434",
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
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{ backgroundColor: "#fea434", "&:hover": { backgroundColor: "#e69420" } }}
          >
            Close
          </Button>
        </Box>
      </Modal>

      <Footer />
    </div>
  );
};

export default NewsEvents;
