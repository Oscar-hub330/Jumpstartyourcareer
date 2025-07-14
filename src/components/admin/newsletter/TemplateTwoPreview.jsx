// src/components/admin/TemplateTwoPreview.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const TemplateTwoPreview = ({ sections, logo }) => {
  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        backgroundColor: "#fff",
        border: "1px solid #ffe2c0",
        borderRadius: 3,
        boxShadow: 1,
        maxWidth: 1000,
        margin: "auto",
      }}
    >
      {/* Header with Logo + Title */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <img
          src={logo}
          alt="Jumpstart Logo"
          style={{ height: 60, marginBottom: 10 }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#fea434",
            letterSpacing: 3,
            mb: 1,
          }}
        >
          JUMPSTART — Spotlight Edition
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontStyle: "italic", color: "#666" }}
        >
          {new Date().toLocaleDateString("en-ZA", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
      </Box>

      {/* Section content */}
      {sections.map((section, idx) => (
        <Box
          key={idx}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            mb: 5,
            borderBottom: "1px solid #eee",
            pb: 3,
          }}
        >
          {/* Left column: title + paragraph */}
          <Box sx={{ flex: 2 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", mb: 1, color: "#d35400" }}
            >
              {section.title}
            </Typography>

            {idx === 0 && section.writerName && (
              <Typography
                variant="subtitle2"
                sx={{ color: "#444", fontStyle: "italic", mb: 1 }}
              >
                By {section.writerName}
              </Typography>
            )}

            <Typography
              variant="body2"
              sx={{ color: "#333", lineHeight: 1.7, mb: 1 }}
            >
              {section.paragraph}
            </Typography>

            {section.date && (
              <Typography
                variant="caption"
                sx={{ fontStyle: "italic", color: "#999" }}
              >
                Published:{" "}
                {new Date(section.date).toLocaleDateString("en-ZA", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
            )}
          </Box>

          {/* Right column: image gallery */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            {section.images.length > 0 ? (
              section.images.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={`Template 2 image ${i + 1}`}
                  style={{
                    width: "100%",
                    maxHeight: 150,
                    objectFit: "cover",
                    borderRadius: 6,
                    boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                  }}
                />
              ))
            ) : (
              <Typography
                variant="caption"
                sx={{ color: "#aaa", fontStyle: "italic" }}
              >
                No images uploaded
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TemplateTwoPreview;
