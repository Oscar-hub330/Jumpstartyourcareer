import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";

const ProjectCard = ({ title, description, images }) => (
  <Card
    sx={{
      borderRadius: 3,
      boxShadow: 4,
      minHeight: 400,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      p: 2,
    }}
  >
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" fontWeight="bold" color="#fea434" gutterBottom>
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={2}>
        {description}
      </Typography>

      {/* Image Gallery - Always horizontal format */}
      <Box
        display="flex"
        gap={1}
        flexWrap="nowrap"
        overflow="auto"
        sx={{ mt: 2 }}
      >
        {images.map((img, idx) => (
          <CardMedia
            key={idx}
            component="img"
            image={img}
            alt={`${title} image ${idx + 1}`}
            sx={{
              width: 100,
              height: 90,
              borderRadius: 2,
              border: "1px solid #eee",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ))}
      </Box>
    </CardContent>
  </Card>
);

export default ProjectCard;
