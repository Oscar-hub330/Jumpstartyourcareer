import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Local image imports
import ContractSigning from "../assets/contractsigning.jpg";
import ContractSigning2 from "../assets/contractsigning2.jpg";
import ContractSigning3 from "../assets/contractsigning3.jpg";
import Graduates1 from "../assets/graduates1.jpg";
import Graduates2 from "../assets/graduates2.jpg";
import Graduates3 from "../assets/graduates3.jpg";
import Entrepreneurship1 from "../assets/Entrepreneurship1.jpg";
import Entrepreneurship2 from "../assets/Entrepreneurship2.jpg";
import Entrepreneurship3 from "../assets/Entrepreneurship3.jpg";
import PoultryProgramme from "../assets/poultryprogramme.jpg";
import Poultry6 from "../assets/poultry6.jpg";
import PoultryProgramme2 from "../assets/poultryprogramme2.jpg";
import Sewing1 from "../assets/sewing1.jpg";
import Sewing2 from "../assets/sewing2.jpg";
import Sewing3 from "../assets/sewing3.jpg";
import Equip1 from "../assets/equip1.jpg";
import Equip2 from "../assets/equip2.jpg";
import Equip3 from "../assets/equip3.jpg";

const projects = [
  {
    title: "Software & Robotics Development Programme",
    startDate: "March 2023",
    endDate: "Ongoing",
    description:
      "We’re training 200 rural innovators from Maganduzweni and Pienaar in full-stack development, mobile apps, and robotics. This equips youth to launch startups and drive digital innovation in their communities.",
    images: [ContractSigning, ContractSigning2, ContractSigning3],
  },
  {
    title: "Graduates Programme",
    startDate: "January 2022",
    endDate: "December 2023",
    description:
      "The Graduates Programme bridges the gap between academic studies and employment through hands-on experience and mentorship. It equips rural graduates with real-world skills, boosting their confidence and employability.",
    images: [Graduates1, Graduates2, Graduates3],
  },
  {
    title: "Entrepreneurship Training & Support",
    startDate: "July 2021",
    endDate: "Ongoing",
    description:
      "Empowering rural youth and graduates with the skills to build and sustain businesses. Participants receive mentorship, startup toolkits, and links to funding opportunities.",
    images: [Entrepreneurship1, Entrepreneurship2, Entrepreneurship3],
  },
  {
    title: "Poultry Production Programme",
    startDate: "April 2022",
    endDate: "June 2023",
    description:
      "This programme equips rural youth with hands-on skills in poultry farming, combining traditional methods with modern tools. It supports food security and income generation by helping participants launch sustainable poultry businesses in their communities.",
    images: [PoultryProgramme, Poultry6, PoultryProgramme2],
  },
  {
    title: "Equipment Support Programme",
    startDate: "May 2023",
    endDate: "October 2023",
    description:
      "This programme provides rural entrepreneurs with machinery and tools to boost productivity and economic inclusion. It bridges the resource gap and supports startup growth.",
    images: [Equip1, Equip2, Equip3],
  },
  {
    title: "Sewing Learnership",
    startDate: "February 2021",
    endDate: "August 2021",
    description:
      "Jumpstart empowered local women and youth with skills in tailoring and textile production. The programme fostered entrepreneurship and sustainable income generation.",
    images: [Sewing1, Sewing2, Sewing3],
  },
];

const Projects = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fff7f0, #fef6ee, #ffffff)",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight="bold" color="#fea434" mb={1}>
            Our Projects
          </Typography>
          <Typography variant="body1" color="#555" maxWidth="700px" mx="auto">
            Discover how Jumpstart is changing lives through innovation,
            education, and sustainable technology in rural communities.
          </Typography>
        </Box>

        {/* Project Cards */}
        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    color="#fea434"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {project.title}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mb: 1 }}
                  >
                    {project.startDate} – {project.endDate}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {project.description}
                  </Typography>

                  {/* Display 3 horizontal images */}
                  {project.images && (
                    <Box display="flex" gap={1} mt={2}>
                      {project.images.map((img, i) => (
                        <CardMedia
                          key={i}
                          component="img"
                          image={img}
                          alt={`${project.title} ${i}`}
                          sx={{
                            width: "33.33%",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: 2,
                            border: "1px solid #eee",
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Box mt={10} textAlign="center">
          <Typography variant="h4" color="#fea434" mb={2}>
            Want to support or join a project?
          </Typography>
          <Typography
            variant="body1"
            color="#555"
            maxWidth="600px"
            mx="auto"
            mb={4}
          >
            Leaving no one behind!
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
              onClick={() => navigate("/about")}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;
