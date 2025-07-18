import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import {
  PhoneInTalk,
  EmailOutlined,
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
} from "@mui/icons-material";

const Contact = () => {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        background: "linear-gradient(135deg, #fff7f0, #fff3e6)",
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 0 },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 6,
        }}
      >
        {/* Left Contact Info */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 4,
            color: "#333",
            textAlign: { xs: "center", md: "left" },
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "#fea434",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            Contact Jumpstart
          </Typography>

          {[
            {
              icon: <PhoneInTalk sx={{ fontSize: 28, color: "#fea434" }} />,
              label: "Phone",
              value: "+27 81 234 5678",
            },
            {
              icon: <EmailOutlined sx={{ fontSize: 28, color: "#fea434" }} />,
              label: "Email",
              value: "info@jumpstart.org.za",
            },
            {
              icon: <LocationOn sx={{ fontSize: 28, color: "#fea434" }} />,
              label: "Address",
              value: "123 JumpStart Lane, RuralTech Park, South Africa",
            },
          ].map(({ icon, label, value }, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                fontSize: 14,
              }}
            >
              {icon}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: "#555",
                    fontSize: 11,
                    letterSpacing: 0.5,
                  }}
                >
                  {label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "#222" }}
                >
                  {value}
                </Typography>
              </Box>
            </Box>
          ))}

          <Box
            sx={{
              display: "flex",
              gap: 3,
              mt: 3,
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
              <Link
                href="#"
                key={i}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#fea434",
                  fontSize: 22,
                  transition: "color 0.3s ease",
                  "&:hover": { color: "#d18e0b" },
                }}
              >
                <Icon />
              </Link>
            ))}
          </Box>
        </Box>

        {/* Right Contact Form */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: 3,
            boxShadow: "0 6px 20px rgba(254, 164, 52, 0.12)",
            p: { xs: 3, md: 5 },
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#fea434",
              mb: 3,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Send Us A Message
          </Typography>

          <form>
            {[
              { label: "Full Name", type: "text", name: "name" },
              { label: "Email Address", type: "email", name: "email" },
              { label: "Subject", type: "text", name: "subject" },
            ].map(({ label, type, name }, i) => (
              <TextField
                key={i}
                label={label}
                variant="outlined"
                type={type}
                name={name}
                fullWidth
                required
                size="small"
                sx={{ mb: 2 }}
              />
            ))}

            <TextField
              label="Message"
              variant="outlined"
              name="message"
              multiline
              rows={4}
              fullWidth
              required
              size="small"
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#fea434",
                fontWeight: 700,
                letterSpacing: 1.5,
                py: 1.3,
                textTransform: "uppercase",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#d18e0b",
                },
              }}
            >
              Send Message
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
