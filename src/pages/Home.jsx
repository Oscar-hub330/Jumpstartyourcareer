import React, { useState, useMemo, lazy, Suspense } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Box,
  TextField,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

const ImageCarousel = lazy(() => import("../components/ImageCarousel"));

const generateSuccessStories = (count = 6) => {
  // ... your existing success story generator code ...
  const locations = ["Limpopo", "Mpumalanga", "KwaZulu-Natal", "Free State"];
  const names = ["Thabo", "Nomsa", "Sipho", "Lerato", "Mpho", "Bongani"];
  const businessTypes = ["tech startup", "agricultural business", "online store"];
  const skills = ["web development", "digital marketing", "coding"];
  const impacts = [
    "created 3 local jobs",
    "increased income by 200%",
    "trained 50 community members",
  ];

  const stories = [];
  for (let i = 0; i < count; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const business = businessTypes[Math.floor(Math.random() * businessTypes.length)];
    const skill = skills[Math.floor(Math.random() * skills.length)];
    const impact = impacts[Math.floor(Math.random() * impacts.length)];

    const templates = [
      `${name} from ${location} launched a ${business} after our ${skill} program`,
      `After learning ${skill}, ${name} started a ${business} that ${impact}`,
      `${name}'s ${business} ${impact} after our training`,
    ];

    const title = `${name}'s Success`;
    const description = templates[Math.floor(Math.random() * templates.length)];

    stories.push({
      title: title.charAt(0).toUpperCase() + title.slice(1),
      description: description.charAt(0).toUpperCase() + description.slice(1),
      impact: impact.charAt(0).toUpperCase() + impact.slice(1),
    });
  }

  return stories;
};

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

const SuccessStoryCard = React.memo(({ title, description, impact }) => (
  <Card sx={{ border: "1px solid #ddd", "&:hover": { borderColor: "#fea434" } }}>
    <CardContent sx={{ textAlign: "left", p: 3 }}>
      <Typography variant="h5" color="#fea434" mb={1}>
        {title}
      </Typography>
      <Typography variant="body1" mb={2} color="#333">
        {description}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" color="#fea434">
        Impact: {impact}
      </Typography>
    </CardContent>
  </Card>
));

FocusAreaCard.displayName = "FocusAreaCard";
SuccessStoryCard.displayName = "SuccessStoryCard";

FocusAreaCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

SuccessStoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  impact: PropTypes.string.isRequired,
};

const Home = () => {
  const navigate = useNavigate();

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
        description: "Training rural youth in problem-solving, business models and business packages.",
      },
      {
        title: "Digital Skills",
        description:
          "Delivering digital literacy, AI, and robotics education to close digital divides, cultivate future-ready talent, and accelerate innovation through emerging technologies.",
      },
      {
        title: "Renewable & Clean Energy",
        description: "Offering rural youth on courses on clean energy",
      },
      {
        title: "Career Development & STEM",
        description:
          "Strengthening career development to expose rural learners to a diverse array of professional opportunities beyond traditional roles.",
      },
      {
        title: "Work Placement/Vocational Work/In-Service Training",
        description:
          "Providing graduates with integrated, job-readiness learning opportunities to gain real-world experience.",
      },
      {
        title: "Youth Center",
        description: "We provide internet access and life skills training to rural communities.",
      },
    ],
    []
  );

  const [successStories, setSuccessStories] = useState(() => generateSuccessStories(6));

  const refreshStories = () => setSuccessStories(generateSuccessStories(6));

  const handleSubscribe = async () => {
  if (!email || !email.includes("@")) {
    setStatus("❌ Please enter a valid email.");
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
    <Container maxWidth="xl" sx={{ py: 4, backgroundColor: "#FFFAF5", minHeight: "100vh", color: "#333" }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={8}>
        <Typography variant="h3" color="#fea434" fontWeight="bold" mb={2}>
          Empowering Rural Youth
        </Typography>
        <Typography variant="body1" mb={4} maxWidth="700px" mx="auto" color="#555">
          Through skills development, entrepreneurship training, and ICT education.
        </Typography>
        <Box display="flex" gap={2} justifyContent="center">
          <Button variant="contained" sx={{ bgcolor: "#fea434", px: 4 }} onClick={() => navigate("/projects")}>
            Explore Projects
          </Button>
          <Button variant="outlined" sx={{ borderColor: "#fea434", color: "#fea434", px: 4 }} onClick={() => navigate("/contact")}>
            Get Involved
          </Button>
        </Box>
      </Box>

      {/* Carousel */}
      <Box mb={10}>
        <Suspense fallback={<div style={{ textAlign: "center", padding: 50 }}>Loading carousel...</div>}>
          <ImageCarousel />
        </Suspense>
      </Box>

      {/* Focus Areas */}
      <Box mb={10}>
        <Typography variant="h4" textAlign="center" color="#fea434" mb={6}>
          Our Focus Areas
        </Typography>
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" }} gap={4}>
          {focusAreas.map((area, idx) => (
            <FocusAreaCard key={idx} title={area.title} description={area.description} />
          ))}
        </Box>
      </Box>

      {/* Success Stories */}
      <Box mb={10} textAlign="center">
        <Typography variant="h4" color="#fea434" mb={2}>
          Success Stories
        </Typography>
        <Typography variant="body1" mb={4} color="#555">
          See how we are making an impact
        </Typography>

        <Button
          variant="outlined"
          onClick={refreshStories}
          sx={{ mb: 4, borderColor: "#fea434", color: "#fea434" }}
        >
          Generate New Stories
        </Button>

        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" }} gap={4}>
          {successStories.map((story, i) => (
            <SuccessStoryCard
              key={i}
              title={story.title}
              description={story.description}
              impact={story.impact}
            />
          ))}
        </Box>
      </Box>

      {/* Newsletter Section */}
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

        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2} justifyContent="center" maxWidth="600px" mx="auto">
          <TextField
            label="Email Address"
            variant="outlined"
            size="small"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ bgcolor: "#fff" }}
          />
          <Button variant="contained" sx={{ bgcolor: "#fea434", whiteSpace: "nowrap" }} onClick={handleSubscribe}>
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
