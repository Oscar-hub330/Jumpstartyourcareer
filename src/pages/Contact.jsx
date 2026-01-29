/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";

import {
  PhoneInTalk,
  EmailOutlined,
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
} from "@mui/icons-material";

const ACCENT = "#fea434";

export default function Contact() {
  /* ================= STATE ================= */
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    /* -------- simple validation -------- */
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:4000/api/contact", form);

      setSuccess("Message sent successfully ✓");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= CONTACT INFO ================= */
  const contactDetails = [
    {
      icon: <PhoneInTalk sx={{ color: ACCENT }} />,
      label: "Phone",
      value: "+27 63 964 7736",
    },
    {
      icon: <EmailOutlined sx={{ color: ACCENT }} />,
      label: "Email",
      value: "info@jumpstartyourcareer.org.za",
    },
    {
      icon: <LocationOn sx={{ color: ACCENT }} />,
      label: "Address",
      value: "01 Bafana Bafana Road, Mbombela, South Africa",
    },
  ];

  const socialIcons = [
    { Icon: Facebook, url: "https://facebook.com" },
    { Icon: Twitter, url: "https://twitter.com" },
    { Icon: Instagram, url: "https://instagram.com" },
  ];

  /* ================= UI ================= */
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff7ed",
        display: "flex",
        alignItems: "center",
        py: 6,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
        }}
      >
        {/* ================= LEFT INFO ================= */}
        <Box display="flex" flexDirection="column" gap={3}>
          <Typography fontSize={24} fontWeight={700} color={ACCENT}>
            Contact Us
          </Typography>

          {contactDetails.map((item, i) => (
            <Stack key={i} direction="row" spacing={2} alignItems="center">
              {item.icon}
              <Box>
                <Typography fontSize={12} fontWeight={600} color="#666">
                  {item.label}
                </Typography>
                <Typography fontSize={14}>{item.value}</Typography>
              </Box>
            </Stack>
          ))}

          <Divider />

          <Stack direction="row" spacing={2}>
            {socialIcons.map(({ Icon, url }, i) => (
              <Link key={i} href={url} target="_blank">
                <Icon
                  sx={{
                    color: ACCENT,
                    "&:hover": {
                      transform: "scale(1.15)",
                    },
                  }}
                />
              </Link>
            ))}
          </Stack>
        </Box>

        {/* ================= FORM ================= */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            bgcolor: "#fff",
            borderRadius: 3,
            p: 4,
            boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            fontSize={18}
            fontWeight={700}
            color={ACCENT}
            textAlign="center"
          >
            Send a Message
          </Typography>

          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Full Name"
            name="name"
            size="small"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Email Address"
            name="email"
            type="email"
            size="small"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Subject"
            name="subject"
            size="small"
            value={form.subject}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Message"
            name="message"
            multiline
            rows={4}
            size="small"
            value={form.message}
            onChange={handleChange}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              bgcolor: ACCENT,
              py: 1.2,
              fontWeight: 600,
              "&:hover": {
                bgcolor: "#fff",
                color: ACCENT,
                border: `1px solid ${ACCENT}`,
              },
            }}
          >
            {loading ? <CircularProgress size={20} /> : "Send Message"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
