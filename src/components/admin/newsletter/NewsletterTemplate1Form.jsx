// src/components/admin/newsletter/NewsletterTemplate1Form.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

const NewsletterTemplate1Form = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    sections: [
      { heading: "", paragraph: "", image: null, imageUrl: "" },
      { heading: "", paragraph: "", image: null, imageUrl: "" },
      { heading: "", paragraph: "", image: null, imageUrl: "" },
    ],
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[index][field] = value;
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleImageUpload = (index, file) => {
    const imageUrl = URL.createObjectURL(file);
    const updatedSections = [...formData.sections];
    updatedSections[index].image = file;
    updatedSections[index].imageUrl = imageUrl;
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleSubmit = () => {
    alert("Newsletter saved! (mock action)");
    console.log("Newsletter Data:", formData);
    // You can extend this to send to backend
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" color="#fea434" gutterBottom>
        Fill Out Newsletter Template 1
      </Typography>

      <Card sx={{ p: 3, mb: 4, backgroundColor: "#fffefb", borderRadius: 3 }}>
        <CardContent>
          <TextField
            name="title"
            label="Newsletter Title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="date"
            label="Publish Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 4 }}
          />

          <Divider sx={{ my: 2 }} />

          {formData.sections.map((section, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Section {index + 1}
              </Typography>
              <TextField
                label="Subheading"
                value={section.heading}
                onChange={(e) => handleSectionChange(index, "heading", e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Paragraph"
                multiline
                rows={3}
                value={section.paragraph}
                onChange={(e) => handleSectionChange(index, "paragraph", e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button
                variant="outlined"
                startIcon={<ImageIcon />}
                component="label"
                sx={{ borderColor: "#fea434", color: "#fea434" }}
              >
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImageUpload(index, e.target.files[0])}
                />
              </Button>
            </Box>
          ))}

          <Button
            variant="contained"
            sx={{ backgroundColor: "#fea434" }}
            onClick={handleSubmit}
          >
            Save Newsletter
          </Button>
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card sx={{ p: 3, backgroundColor: "#fdf7ef", borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" color="#fea434" gutterBottom>
            Live Preview
          </Typography>
          <Typography variant="h4">{formData.title}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {formData.date}
          </Typography>
          <Divider sx={{ my: 2 }} />

          {formData.sections.map((section, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                {section.heading}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {section.paragraph}
              </Typography>
              {section.imageUrl && (
                <img
                  src={section.imageUrl}
                  alt={`Section ${index + 1}`}
                  style={{
                    width: "100%",
                    maxHeight: 300,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              )}
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default NewsletterTemplate1Form;
