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

// Newsletter metadata
const newsletters = [
  {
    title: "March 2022",
    image: `${process.env.PUBLIC_URL}/newsletters/images/march-2022.jpg`,
    pdf: `${process.env.PUBLIC_URL}/newsletters/newsletter-march-2022.pdf`,
    description: "This edition covers our latest programs on youth digital skills training.",
  },
  {
    title: "February 2022",
    image: `${process.env.PUBLIC_URL}/newsletters/images/february-2022.jpg`,
    pdf: `${process.env.PUBLIC_URL}/newsletters/newsletter-february-2022.pdf`,
    description: "Highlights from the Entrepreneurship Bootcamp held in January.",
  },
  {
    title: "January 2022",
    image: `${process.env.PUBLIC_URL}/newsletters/images/january-2022.jpg`,
    pdf: `${process.env.PUBLIC_URL}/newsletters/newsletter-january-2022.pdf`,
    description: "Kickstarting the year with new community outreach projects.",
  },
];

// Modal style config
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
  textAlign: "center",
  maxHeight: "90vh",
  overflowY: "auto",
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

  const handleDownload = (pdf, title) => {
    const link = document.createElement("a");
    link.href = pdf;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Hero Section */}
      <div className="bg-black bg-opacity-70 py-11 px-2 text-white text-center">
        <Typography
          variant="h3"
          className="font-bold mb-4 text-[#fea434] text-3xl sm:text-4xl md:text-5xl"
        >
          Newsletters Archive
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
          Browse and download our newsletters by month and year.
        </Typography>
      </div>

      {/* Newsletter Grid */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          {newsletters.map(({ title, image, pdf, description }, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: 3,
                  textAlign: "center",
                }}
              >
                <CardMedia
                  component="img"
                  image={image}
                  alt={`${title} newsletter`}
                  loading="lazy"
                  sx={{ height: 160, objectFit: "cover" }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flexGrow: 1,
                    gap: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    color="#fea434"
                    fontWeight={600}
                  >
                    {title}
                  </Typography>

                  <Box display="flex" flexDirection="column" gap={1}>
                    <Button
                      variant="outlined"
                      onClick={() => handleOpen({ title, description })}
                      sx={{
                        color: "#fea434",
                        borderColor: "#fea434",
                        "&:hover": {
                          backgroundColor: "#fff8f0",
                          borderColor: "#fea434",
                        },
                      }}
                    >
                      Read More
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleDownload(pdf, title)}
                      sx={{
                        backgroundColor: "#fea434",
                        "&:hover": {
                          backgroundColor: "#e69420",
                        },
                      }}
                    >
                      Download
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
          <Typography
            variant="h5"
            mb={2}
            color="#fea434"
            fontWeight={700}
          >
            {selectedNewsletter?.title}
          </Typography>
          <Typography variant="body1" mb={4}>
            {selectedNewsletter?.description}
          </Typography>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              backgroundColor: "#fea434",
              "&:hover": { backgroundColor: "#e69420" },
            }}
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
