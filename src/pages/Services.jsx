import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Button,
} from "@mui/material";
import {
  Code,
  People,
  School,
  EmojiNature,
  Construction,
  Checkroom,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Coding, AI & Robotics",
    icon: <Code sx={{ fontSize: 40, color: "#fea434" }} />,
    description:
      "We equip rural youth with coding, AI, and robotics skills, preparing them for careers in the digital economy and tech innovation.",
  },
  {
    title: "Graduate Mentorship & Upskilling",
    icon: <School sx={{ fontSize: 40, color: "#fea434" }} />,
    description:
      "Bridging the gap between graduates and employers by providing hands-on work experience.",
  },
  {
    title: "Entrepreneurship Development",
    icon: <People sx={{ fontSize: 40, color: "#fea434" }} />,
    description:
      "Empowering rural youth with entrepreneurship skills, business mentorship and business funding.",
  },
  {
    title: "Poultry Farming & Agri-Tech",
    icon: <EmojiNature sx={{ fontSize: 40, color: "#fea434" }} />,
    description:
      "Empowering rural communities with sustainable poultry farming skills, integrated with smart agriculture solutions.",
  },
  {
    title: "Equipment Support Programmes",
    icon: <Construction sx={{ fontSize: 40, color: "#fea434" }} />,
    description:
      "Supporting rural entrepreneurs with essential tools and machinery to ensure they parcitipate meaningfully in the economy.",
  },
  {
    title: "Clothing Manufacturing Learnerships & Market Access",
    icon: <Checkroom sx={{ fontSize: 40, color: "#fea434" }} />,
    description:
      "Proving Accredited clothing manufacturing programmes that promote economic independence for rural youth and women, ensuring they are integrated into the economy",
  },
  {
    title: "Career Development & STEM",
    icon: <People sx={{ fontSize: 40, color: "#fea434" }} />,
    description:
      "Empowering rural learners to pursue in-demand careers, particularly in STEM (Science, Technology, Engineering, and Mathematics), that align with current and future market needs.",
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fff, #fef6ee)",
        py: 9,
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight="bold" color="#fea434" mb={1}>
            Our Services
          </Typography>
          <Typography variant="body1" color="#555" maxWidth="700px" mx="auto">
            Driving transformation through technology, education, and
            entrepreneurship in underserved communities.
          </Typography>
        </Box>

        {/* Cards Grid */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {services.map((service, index) => (
            <Card
              key={index}
              sx={{
                width: {
                  xs: "100%",
                  sm: "45%",
                  md: "22%", // roughly 4 in a row on medium+ screens
                },
                minWidth: 250,
                borderRadius: 4,
                boxShadow: 6,
                textAlign: "center",
                p: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: 7,
                  transform: "translateY(-6px)",
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "350px",
              }}
            >
              <Box sx={{ mb: 2 }}>{service.icon}</Box>
              <CardContent sx={{ px: 0, flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="#fea434"
                  gutterBottom
                  sx={{ minHeight: "5s0px" }}
                >
                  {service.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflowWrap: "break-word",
                    lineHeight: 1.5,
                  }}
                >
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* CTA */}
        <Box mt={10} textAlign="center">
          <Typography variant="h4" color="#fea434" mb={2}>
            Ready to make a difference?
          </Typography>
          <Typography
            variant="body1"
            color="#555"
            maxWidth="600px"
            mx="auto"
            mb={4}
          >
            We are building a future where no one is left behind.
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
            <Button
              variant="contained"
              sx={{ bgcolor: "#fea434", px: 4 }}
              onClick={() => navigate("/contact")}
            >
              Get Involved
            </Button>
            <Button
              variant="outlined"
              sx={{ borderColor: "#fea434", color: "#fea434", px: 4 }}
              onClick={() => navigate("/projects")}
            >
              View Projects
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;
