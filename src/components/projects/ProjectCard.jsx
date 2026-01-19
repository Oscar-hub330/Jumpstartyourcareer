/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Card, CardContent, CardHeader, Typography, Box, Chip } from "@mui/material";
import { Calendar } from "lucide-react";
import { useInView } from "react-intersection-observer";

const ImageWithSkeleton = ({ src, alt, visible }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box position="relative" width="100%" height="100px" borderRadius={1} overflow="hidden" bgcolor="#f0f0f0">
      {!loaded && <Box position="absolute" top={0} left={0} width="100%" height="100%" bgcolor="#ddd" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: loaded && visible ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />
    </Box>
  );
};

const ProjectCard = ({ project }) => {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });

  const statusColors = {
    completed: { bg: "#d4edda", color: "#155724" },
    ongoing: { bg: "#cce5ff", color: "#004085" },
    planned: { bg: "#fff3cd", color: "#856404" },
  };

  return (
    <Card ref={ref} sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 2, py: 1 }}>
      <CardHeader
        title={
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" fontWeight="bold">{project.title}</Typography>
            {project.status && (
              <Chip
                label={project.status.toUpperCase()}
                sx={{
                  bgcolor: statusColors[project.status].bg,
                  color: statusColors[project.status].color,
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  height: 22,
                }}
              />
            )}
          </Box>
        }
        subheader={
          <Box display="flex" alignItems="center" gap={1} mt={0.5}>
            <Calendar size={14} />
            <Typography variant="caption" color="text.secondary">
              {project.startDate} – {project.endDate}
            </Typography>
          </Box>
        }
        sx={{ pb: 0 }}
      />

      <CardContent sx={{ flex: 1, py: 1 }}>
        {project.category && <Chip label={project.category} size="small" sx={{ mb: 1, fontSize: "0.65rem" }} />}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {project.description}
        </Typography>

        {/* Images */}
        {project.images?.length > 0 && (
          <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={1} minHeight={80}>
            {project.images.slice(0, 4).map((img, i) => (
              <ImageWithSkeleton key={i} src={img} alt={`${project.title} ${i + 1}`} visible={inView} />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
