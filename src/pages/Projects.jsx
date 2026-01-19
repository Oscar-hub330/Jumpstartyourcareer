/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography, TextField, Tabs, Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/projects/ProjectCard";
import { projects } from "../data/projectData";

const Projects = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Preload images
  useEffect(() => {
    projects.forEach((project) => {
      project.images?.forEach((src) => new Image().src = src);
    });
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ py: 4, backgroundColor: "#fff" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box mb={4}>
          <Typography variant="h4" fontWeight="bold" color="#fea434" >
            Our Projects
          </Typography>
          <Typography variant="body2" color="#555">
            Explore our portfolio of innovative projects and initiatives. From completed successes to ongoing developments, discover how we are making an impact.
          </Typography>
        </Box>

        {/* Search + Tabs */}
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} justifyContent="space-between" mb={3} gap={2}>
          <TextField
            placeholder="Search projects..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flexGrow: 1 }}
          />

          <Tabs
            value={filterStatus}
            onChange={(e, newValue) => setFilterStatus(newValue)}
            textColor="primary"
            indicatorColor="primary"
            sx={{ mt: { xs: 1, sm: 0 } }}
          >
            <Tab label={`All Projects (${projects.length})`} value="all" />
            <Tab label={`Completed (${projects.filter(p => p.status==="completed").length})`} value="completed" />
            <Tab label={`Ongoing (${projects.filter(p => p.status==="ongoing").length})`} value="ongoing" />
            <Tab label={`Planned (${projects.filter(p => p.status==="planned").length})`} value="planned" />
          </Tabs>
        </Box>

        {/* Projects Grid */}
        <Grid container spacing={3}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ProjectCard project={project} />
              </Grid>
            ))
          ) : (
            <Box textAlign="center" py={6} width="100%">
              <Typography>No projects found matching your criteria.</Typography>
            </Box>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects;
