import React, { useEffect, useState, useMemo } from "react";
import { Container, Box, Typography, Button } from "@mui/material";

import HeroSection from "../components/HeroSection";
import ImageCarousel from "../components/ImageCarousel"; // Placeholder - you can replace this
import FocusAreas from "../components/FocusAreas";
import SuccessStories from "../components/SuccessStories";
import NewsletterSignup from "../components/NewsletterSignup";
import { generateSuccessStories } from "../utils/storyGenerator";

const Home = () => {
  const [successStories, setSuccessStories] = useState([]);

  // Only generate stories once per mount
  const stories = useMemo(() => generateSuccessStories(6), []);
  useEffect(() => setSuccessStories(stories), [stories]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        backgroundColor: "#FFFAF5",
        minHeight: "100vh",
        color: "text.primary",
      }}
    >
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Image Carousel (placeholder or your actual component) */}
      <Box mb={10}>
        <ImageCarousel />
      </Box>

      {/* 3. Focus Areas Section */}
      <FocusAreas />

      {/* 4. Success Stories Section */}
      <SuccessStories
        stories={successStories}
        onRefresh={() => setSuccessStories(generateSuccessStories(6))}
      />

      {/* 5. Newsletter Signup */}
      <NewsletterSignup />
    </Container>
  );
};

export default Home;
