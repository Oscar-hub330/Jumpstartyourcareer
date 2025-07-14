import React from "react";
import { Container, Typography } from "@mui/material";
import Footer from "../components/Footer";

const FAQ = () => {
  return (
    <div className="bg-white min-h-screen py-12">
      <Container>
        <Typography variant="h4" className="text-[#fea434] font-bold mb-4">
          Frequently Asked Questions
        </Typography>
        <Typography variant="body1">
          This page will include commonly asked questions about Jumpstart.
        </Typography>
      </Container>
      <Footer />
    </div>
  );
};

export default FAQ;
