/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Typography,
  Button,
  IconButton,
  Stack,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const sectionTypes = [
  { value: "text", label: "Text Only" },
  { value: "image", label: "Image Only" },
  { value: "imageText", label: "Image + Text" },
];

const alignments = ["left", "right", "center"];

const NewsletterSectionForm = ({
  section = {},
  index,
  onChange,
  onDelete,
}) => {
  const safeSection = {
    type: section.type || "text",
    text: section.text || "",
    images: section.images || [],
    alignment: section.alignment || "left",
  };

  const [previewUrls, setPreviewUrls] = useState([]);

  const update = (key, value) => {
    onChange(index, { ...safeSection, [key]: value });
  };

  /* =============================
     HANDLE IMAGE PREVIEW SAFELY
  ============================== */
  useEffect(() => {
    const urls = safeSection.images.map((img) =>
      typeof img === "string" ? img : URL.createObjectURL(img)
    );

    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => {
        if (!url.startsWith("http")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [safeSection.images]);

  const handleImages = (files) => {
    if (!files) return;
    const newImages = [...safeSection.images, ...Array.from(files)];
    update("images", newImages);
  };

  const removeImage = (i) => {
    const copy = [...safeSection.images];
    copy.splice(i, 1);
    update("images", copy);
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        p: 3,
        borderRadius: 3,
        mb: 3,
        boxShadow: 2,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography fontWeight={700}>
          Section {index + 1}
        </Typography>

        <IconButton
          onClick={() => onDelete(index)}
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </Stack>

      {/* SECTION TYPE */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Section Type</InputLabel>
        <Select
          value={safeSection.type}
          label="Section Type"
          onChange={(e) => update("type", e.target.value)}
        >
          {sectionTypes.map((t) => (
            <MenuItem key={t.value} value={t.value}>
              {t.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* TEXT */}
      {(safeSection.type === "text" ||
        safeSection.type === "imageText") && (
        <TextField
          multiline
          rows={4}
          fullWidth
          label="Content"
          value={safeSection.text}
          onChange={(e) => update("text", e.target.value)}
          sx={{ mb: 2 }}
        />
      )}

      {/* IMAGES */}
      {(safeSection.type === "image" ||
        safeSection.type === "imageText") && (
        <>
          <Button
            component="label"
            variant="outlined"
            sx={{ mb: 2 }}
          >
            Upload Images
            <input
              hidden
              multiple
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImages(e.target.files)
              }
            />
          </Button>

          {previewUrls.length === 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              No images selected.
            </Typography>
          )}

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
          >
            {previewUrls.map((url, i) => (
              <Box
                key={i}
                sx={{
                  position: "relative",
                  width: 90,
                  height: 90,
                }}
              >
                <img
                  src={url}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />

                <IconButton
                  size="small"
                  onClick={() => removeImage(i)}
                  sx={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    bgcolor: "white",
                  }}
                >
                  ❌
                </IconButton>
              </Box>
            ))}
          </Stack>
        </>
      )}

      {/* ALIGNMENT */}
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Alignment</InputLabel>
        <Select
          value={safeSection.alignment}
          label="Alignment"
          onChange={(e) =>
            update("alignment", e.target.value)
          }
        >
          {alignments.map((a) => (
            <MenuItem key={a} value={a}>
              {a}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default NewsletterSectionForm;
