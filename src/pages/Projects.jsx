/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import ProjectCard from "../components/projects/ProjectCard";
import { projects } from "../data/projectData";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // ✅ filter only (NO image preloading)
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ py: 4, backgroundColor: "#fff" }}>
      <Container maxWidth="lg">
        {/* ================= HEADER ================= */}
        <Box mb={4}>
          <Typography variant="h4" fontWeight="bold" color="#fea434">
            Our Projects
          </Typography>

          <Typography variant="body2" color="#555">
            Explore our portfolio of innovative projects and initiatives.
          </Typography>
        </Box>

        {/* ================= SEARCH + FILTER ================= */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          mb={3}
          gap={2}
        >
          {/* ✅ hover color added here */}
          <TextField
            placeholder="Search projects..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              flexGrow: 1,

              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#fea434",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#fea434",
                },
              },
            }}
          />

          <Tabs
          value={filterStatus}
          onChange={(e, newValue) => setFilterStatus(newValue)}
          sx={{
          "& .MuiTab-root": {
          textTransform: "none",
          fontWeight: 100,
          color: "#666",

          "&:hover": {
        color: "#fea434",
      },
    },

    "& .Mui-selected": {
      color: "#fea434 !important",
    },

    "& .MuiTabs-indicator": {
      backgroundColor: "#fea434",
    },
  }}
>
  <Tab label="All" value="all" />
  <Tab label="Completed" value="completed" />
  <Tab label="Ongoing" value="ongoing" />
  <Tab label="Planned" value="planned" />
</Tabs>

        </Box>

        {/* ================= GRID ================= */}
        <Grid container spacing={3}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ProjectCard project={project} />
              </Grid>
            ))
          ) : (
            <Box textAlign="center" py={6} width="100%">
              <Typography>No projects found.</Typography>
            </Box>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects;
