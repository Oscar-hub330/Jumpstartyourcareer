import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
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
  const contactDetails = [
    {
      icon: <PhoneInTalk sx={{ fontSize: 24, color: "#fea434" }} />,
      label: "Phone",
      value: "+27 63 964 7736",
    },
    {
      icon: <EmailOutlined sx={{ fontSize: 24, color: "#fea434" }} />,
      label: "Email",
      value: "info@jumpstartyourcareer.org.za",
    },
    {
      icon: <LocationOn sx={{ fontSize: 24, color: "#fea434" }} />,
      label: "Address",
      value: "01 Bafana Bafana Road, Mbombela, South Africa",
    },
  ];

  const socialIcons = [Facebook, Twitter, Instagram];

  return (
    <Box
      sx={{
        minHeight: "70vh",
        backgroundColor: "#fef7f0",
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 0 },
        display: "flex",
        alignItems: "center",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 6 },
        }}
      >
        {/* Left Contact Info */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#fea434",
              textTransform: "uppercase",
              letterSpacing: 1.2,
            }}
          >
            Contact Jumpstart
          </Typography>

          {contactDetails.map(({ icon, label, value }, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                py: 0.5,
              }}
            >
              {icon}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    textTransform: "uppercase",
                    fontSize: 11,
                    color: "#555",
                  }}
                >
                  {label}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: "#222" }}>
                  {value}
                </Typography>
              </Box>
            </Box>
          ))}

          <Divider sx={{ my: 1.5, borderColor: "#ffd89b" }} />

          <Box
            sx={{
              display: "flex",
              gap: 2.5,
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            {socialIcons.map((Icon, i) => (
              <Link
                href="https://www.facebook.com/JumpstartYourCareer"
                key={i}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#fea434",
                  fontSize: 20,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "#fea434",
                    borderRadius: "50%",
                    p: 0.5,
                  },
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
            boxShadow: "0 4px 15px rgba(254, 164, 52, 0.12)",
            p: { xs: 3, md: 4 },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#fea434",
              mb: 3,
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: 1.2,
            }}
          >
            Send Us a Message
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
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": { borderRadius: 2.5 },
                  "& .MuiInputLabel-root": { fontWeight: 500 },
                }}
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
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": { borderRadius: 2.5 },
                "& .MuiInputLabel-root": { fontWeight: 500 },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#fea434",
                color: "#fff",
                fontWeight: 700,
                letterSpacing: 1.2,
                py: 1.2,
                textTransform: "uppercase",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#fea434",
                  border: "1px solid #fea434",
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
