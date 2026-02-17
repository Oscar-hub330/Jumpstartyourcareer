/* eslint-disable react/display-name */
import React, { useState, useMemo, lazy, Suspense } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

const ImageCarousel = lazy(() => import("../components/ImageCarousel"));

/* ================= FOCUS CARD ================= */
const FocusAreaCard = React.memo(({ title, description }) => (
  <Card sx={{ border: "1px solid #fea434", borderRadius: 2 }}>
    <CardContent sx={{ textAlign: "center", p: 3 }}>
      <Typography variant="h5" color="#fea434" fontWeight="600" mb={2}>
        {title}
      </Typography>
      <Typography variant="body2" color="#444">
        {description}
      </Typography>
    </CardContent>
  </Card>
));

FocusAreaCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

/* ================= HOME ================= */
const Home = () => {
  const navigate = useNavigate();

  /* 🔥 KEEP — subscriber backend state */
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const focusAreas = useMemo(
    () => [
      {
        title: "Skills Development",
        description: "Empowering youth with hands-on training in technology and life skills.",
      },
      {
        title: "Entrepreneurship Training",
        description: "Training rural youth in business models and problem-solving.",
      },
      {
        title: "Digital Skills",
        description:
          "Delivering digital literacy, AI, and robotics education to close digital divides.",
      },
      {
        title: "Renewable & Clean Energy",
        description: "Offering rural youth courses on clean energy.",
      },
      {
        title: "Career Development & STEM",
        description:
          "Exposing learners to diverse professional opportunities beyond traditional roles.",
      },
      {
        title: "Work Placement / Vocational Training",
        description:
          "Providing graduates with real-world experience through workplace training.",
      },
      {
        title: "Youth Center",
        description: "Providing internet access and life skills training to rural communities.",
      },
    ],
    []
  );

  /* 🔥 KEEP — backend subscription functionality */
  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setStatus("Please enter a valid email.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/subscribe", { email });

      if (res.status === 201 || res.status === 200) {
        setEmail("");
        setStatus(res.data.message || "Subscribed successfully!");
      }
    } catch (err) {
      if (err.response) {
        setStatus(err.response.data.message || "Subscription failed.");
      } else {
        setStatus("Server error. Please try again later.");
      }
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        backgroundColor: "#FFFAF5",
        minHeight: "100vh",
        color: "#333",
      }}
    >
      {/* HERO */}
      <Box textAlign="center" mb={8}>
        <Typography variant="h3" color="#fea434" fontWeight="bold" mb={2}>
          Empowering Rural Youth
        </Typography>

        <Typography variant="body1" mb={4} maxWidth="700px" mx="auto" color="#555">
          Through skills development, entrepreneurship training, and ICT education.
        </Typography>

        <Box display="flex" gap={2} justifyContent="center">
          <Button
            variant="contained"
            sx={{ bgcolor: "#fea434", px: 4 }}
            onClick={() => navigate("/projects")}
          >
            Explore Projects
          </Button>

          <Button
            variant="outlined"
            sx={{ borderColor: "#fea434", color: "#fea434", px: 4 }}
            onClick={() => navigate("/contact")}
          >
            Get Involved
          </Button>
        </Box>
      </Box>

      {/* CAROUSEL */}
      <Box mb={10}>
        <Suspense fallback={<div style={{ textAlign: "center", padding: 50 }}>Loading carousel...</div>}>
          <ImageCarousel />
        </Suspense>
      </Box>

      {/* FOCUS AREAS */}
      <Box mb={10}>
        <Typography variant="h4" textAlign="center" color="#fea434" mb={6}>
          Our Focus Areas
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" }}
          gap={4}
        >
          {focusAreas.map((area, idx) => (
            <FocusAreaCard key={idx} title={area.title} description={area.description} />
          ))}
        </Box>
      </Box>

      {/* 🔥 NEWSLETTER (UNCHANGED BACKEND FUNCTIONALITY) */}
      <Box
        textAlign="center"
        p={4}
        bgcolor="rgba(254, 164, 52, 0.05)"
        borderRadius={2}
        border="1px solid rgba(254, 164, 52, 0.2)"
      >
        <Typography variant="h4" color="#fea434" mb={2}>
          Stay Connected
        </Typography>

        <Typography variant="body1" mb={4} maxWidth="600px" mx="auto" color="#555">
          Sign up for our newsletter to get updates.
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
          justifyContent="center"
          maxWidth="600px"
          mx="auto"
        >
          <TextField
            label="Email Address"
            variant="outlined"
            size="small"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ bgcolor: "#fff" }}
          />

          <Button
            variant="contained"
            sx={{ bgcolor: "#fea434", whiteSpace: "nowrap" }}
            onClick={handleSubscribe}
          >
            Subscribe
          </Button>
        </Box>

        {status && (
          <Typography mt={2} color={status.includes("success") ? "success.main" : "error"}>
            {status}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Home;
