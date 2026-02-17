/* eslint-disable react/prop-types */
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const statusColors = {
  completed: "#4caf50",
  ongoing: "#2196f3",
  planned: "#ff9800",
};

const ProjectCard = ({ project }) => {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 2,
        height: "100%",
      }}
    >
      {/* HEADER (title + status) */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="h6" fontWeight="bold">
          {project.title}
        </Typography>

        <Chip
          label={project.status?.toUpperCase()}
          size="small"
          sx={{
            backgroundColor: statusColors[project.status] || "#999",
            color: "#fff",
            fontWeight: 600,
          }}
        />
      </Box>

      <Box
        display="flex"
        alignItems="center"
        gap={1}
        mb={1}
        color="text.secondary"
      >
        <CalendarTodayIcon sx={{ fontSize: 16 }} />

        <Typography variant="body2">
          {project.startDate} — {project.endDate}
        </Typography>
      </Box>

      {/* DESCRIPTION */}
      <CardContent sx={{ p: 0, mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {project.description}
        </Typography>
      </CardContent>

      {/* IMAGES ROW (your sketch layout) */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        {project.images?.slice(0, 3).map((img, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              height: 180,
              overflow: "hidden",
              borderRadius: 2,
              backgroundColor: "#fea434",
            }}
          >
            <Box
              component="img"
              src={img}
              alt=""
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default ProjectCard;
