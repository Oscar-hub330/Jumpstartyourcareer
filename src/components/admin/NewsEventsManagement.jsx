import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Delete,
  Image as ImageIcon,
  Add,
  Preview,
  Cancel,
  Publish,
  PictureAsPdf,
} from "@mui/icons-material";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import jumpstartLogo from "../../assets/jumpstartLogo.png";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const defaultSection = () => ({
  title: "",
  date: "",
  paragraph: "",
  images: [],
  writerName: "",
  paragraphAlign: "left",
  imageAlign: "left",
});

const NewsEventsManagement = () => {
  const [templateIndex, setTemplateIndex] = useState(0);
  const [newsletterTemplates, setNewsletterTemplates] = useState(
    Array.from({ length: 10 }, () => [defaultSection()])
  );
  const [previewing, setPreviewing] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [publishOptions, setPublishOptions] = useState({
    publishContent: true,
    publishPdf: false,
    sendEmail: true,
  });

  const handleSectionChange = (sectionIdx, field, value) => {
    const updated = [...newsletterTemplates];
    updated[templateIndex][sectionIdx][field] = value;
    setNewsletterTemplates(updated);
  };

  const addSection = () => {
    const updated = [...newsletterTemplates];
    updated[templateIndex].push(defaultSection());
    setNewsletterTemplates(updated);
  };

  const removeSection = (sectionIdx) => {
    const updated = [...newsletterTemplates];
    updated[templateIndex].splice(sectionIdx, 1);
    setNewsletterTemplates(updated);
  };

  const addImageToSection = (e, sectionIdx) => {
    const file = e.target.files[0];
    if (!file) return;

    const updated = [...newsletterTemplates];
    const url = URL.createObjectURL(file);
    updated[templateIndex][sectionIdx].images.push({ file, url });
    setNewsletterTemplates(updated);
  };

  const removeImageFromSection = (sectionIdx, imageIdx) => {
    const updated = [...newsletterTemplates];
    updated[templateIndex][sectionIdx].images.splice(imageIdx, 1);
    setNewsletterTemplates(updated);
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const validateTemplate = () => {
    const sections = newsletterTemplates[templateIndex];
    if (!sections.length) return false;
    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      if (!sec.title.trim() || !sec.paragraph.trim()) return false;
      if (i === 0 && !sec.writerName.trim()) return false;
      if (!sec.date) return false;
    }
    return true;
  };

  const handlePublish = () => {
    if (!publishOptions.publishContent && !publishOptions.publishPdf) {
      alert("Please select at least one publishing option");
      return;
    }

    if (publishOptions.publishPdf && !pdfFile) {
      alert("Please upload a PDF file if you want to publish PDF");
      return;
    }

    if (publishOptions.publishContent && !validateTemplate()) {
      alert(
        "Please fill in title, date, paragraph for all sections, and writer's name on the first section."
      );
      return;
    }

    // Here you would typically make an API call to publish the newsletter
    console.log("Publishing with options:", publishOptions);
    alert("Newsletter published successfully!");
    setPublishDialogOpen(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 2, fontWeight: "bold", color: "#fea434" }}
      >
        News & Events Management
      </Typography>

      <Card
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: "#fff8f0",
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Choose Template</InputLabel>
            <Select
              value={templateIndex}
              label="Choose Template"
              onChange={(e) => {
                setTemplateIndex(e.target.value);
                setPreviewing(false);
              }}
            >
              {newsletterTemplates.map((_, idx) => (
                <MenuItem key={idx} value={idx}>
                  Template {idx + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mb: 3 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<PictureAsPdf />}
              sx={{ color: "#fea434", borderColor: "#fea434" }}
            >
              Upload PDF Version
              <input
                type="file"
                hidden
                accept="application/pdf"
                onChange={handlePdfUpload}
              />
            </Button>
            {pdfFile && (
              <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  {pdfFile.name}
                </Typography>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => setPdfFile(null)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Box>

          {pdfFile && (
            <Box sx={{ mb: 3, border: "1px solid #ddd", p: 2, borderRadius: 1 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                PDF Preview
              </Typography>
              <Box sx={{ maxHeight: 300, overflow: "auto" }}>
                <Document
                  file={pdfFile}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={<Typography>Loading PDF...</Typography>}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      width={300}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  ))}
                </Document>
              </Box>
            </Box>
          )}

          {newsletterTemplates[templateIndex].map((section, secIdx) => (
            <Card
              key={secIdx}
              sx={{ mb: 3, p: 2, backgroundColor: "#fff", position: "relative" }}
            >
              <Typography variant="h6" sx={{ color: "#fea434" }}>
                Section {secIdx + 1}
              </Typography>

              <TextField
                label="Title"
                value={section.title}
                onChange={(e) =>
                  handleSectionChange(secIdx, "title", e.target.value)
                }
                fullWidth
                sx={{ mt: 2 }}
              />

              {secIdx === 0 && (
                <TextField
                  label="Editor's Name"
                  value={section.writerName}
                  onChange={(e) =>
                    handleSectionChange(secIdx, "writerName", e.target.value)
                  }
                  fullWidth
                  sx={{ mt: 2 }}
                />
              )}

              <TextField
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={section.date}
                onChange={(e) =>
                  handleSectionChange(secIdx, "date", e.target.value)
                }
                fullWidth
                sx={{ mt: 2 }}
              />

              <TextField
                label="Paragraph"
                multiline
                rows={4}
                value={section.paragraph}
                onChange={(e) =>
                  handleSectionChange(secIdx, "paragraph", e.target.value)
                }
                fullWidth
                sx={{ mt: 2 }}
              />

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Paragraph Alignment</InputLabel>
                <Select
                  value={section.paragraphAlign}
                  label="Paragraph Alignment"
                  onChange={(e) =>
                    handleSectionChange(secIdx, "paragraphAlign", e.target.value)
                  }
                >
                  <MenuItem value="left">Left</MenuItem>
                  <MenuItem value="center">Center</MenuItem>
                  <MenuItem value="right">Right</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<ImageIcon />}
                  sx={{ color: "#fea434", borderColor: "#fea434" }}
                >
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => addImageToSection(e, secIdx)}
                  />
                </Button>
              </Box>

              {section.images.length > 0 && (
                <>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Image Alignment</InputLabel>
                    <Select
                      value={section.imageAlign}
                      label="Image Alignment"
                      onChange={(e) =>
                        handleSectionChange(secIdx, "imageAlign", e.target.value)
                      }
                    >
                      <MenuItem value="left">Left</MenuItem>
                      <MenuItem value="center">Center</MenuItem>
                      <MenuItem value="right">Right</MenuItem>
                    </Select>
                  </FormControl>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mt: 2,
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    {section.images.map((img, imgIdx) => (
                      <Box key={imgIdx} sx={{ position: "relative" }}>
                        <img
                          src={img.url}
                          alt={`Section ${secIdx + 1} image ${imgIdx + 1}`}
                          style={{
                            width: 120,
                            height: 80,
                            objectFit: "cover",
                            borderRadius: 6,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                          }}
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeImageFromSection(secIdx, imgIdx)}
                          sx={{
                            position: "absolute",
                            top: -8,
                            right: -8,
                            backgroundColor: "white",
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </>
              )}

              <Button
                onClick={() => removeSection(secIdx)}
                color="error"
                variant="outlined"
                startIcon={<Delete />}
                sx={{ mt: 2 }}
                disabled={newsletterTemplates[templateIndex].length === 1}
              >
                Remove Section
              </Button>
            </Card>
          ))}

          <Button
            onClick={addSection}
            variant="contained"
            startIcon={<Add />}
            sx={{ bgcolor: "#fea434", mt: 2 }}
          >
            Add New Section
          </Button>

          <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              sx={{ bgcolor: "#fea434" }}
              onClick={() => {
                if (!validateTemplate()) {
                  alert(
                    "Please fill in title, date, paragraph for all sections, and writer's name on the first section."
                  );
                  return;
                }
                setPreviewing(true);
              }}
              startIcon={<Preview />}
            >
              Preview Newsletter
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setPreviewing(false)}
              startIcon={<Cancel />}
              disabled={!previewing}
            >
              Cancel Preview
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => setPublishDialogOpen(true)}
              startIcon={<Publish />}
              sx={{ ml: "auto" }}
            >
              Publish Newsletter
            </Button>
          </Box>
        </CardContent>
      </Card>

      {previewing && (
        <Card
          sx={{
            mt: 4,
            p: 3,
            backgroundColor: "#fff",
            border: "1px solid #ffe2c0",
            borderRadius: 3,
            boxShadow: 1,
            maxWidth: 900,
            margin: "auto",
          }}
        >
          <Box
            sx={{
              borderBottom: "2px solid #fea434",
              mb: 4,
              textAlign: "center",
              py: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                flexWrap: "wrap",
                mb: 1,
              }}
            >
              <img
                src={jumpstartLogo}
                alt="Jumpstart Logo"
                style={{ height: 60, objectFit: "contain" }}
              />
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  color: "#d35400",
                  letterSpacing: 4,
                  textAlign: "center",
                }}
              >
                JUMPSTART NEWSLETTER
              </Typography>
            </Box>
            <Typography
              variant="subtitle2"
              sx={{ fontStyle: "italic", color: "#555", mt: 0.5 }}
            >
              {new Date().toLocaleDateString("en-ZA", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Box>

          {newsletterTemplates[templateIndex].map((section, idx) => (
            <Box
              key={idx}
              mb={6}
              sx={{
                borderBottom:
                  idx !== newsletterTemplates[templateIndex].length - 1
                    ? "1px solid #eee"
                    : "none",
                pb: 3,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "900",
                  textTransform: "uppercase",
                  mb: 1,
                  color: "#d35400",
                  letterSpacing: 2,
                }}
              >
                {section.title}
              </Typography>

              {idx === 0 && section.writerName && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    fontStyle: "italic",
                    color: "#444",
                    mb: 1,
                  }}
                >
                  By {section.writerName}
                </Typography>
              )}

              <Typography
                variant="subtitle2"
                sx={{ fontStyle: "italic", color: "#666", mb: 2 }}
              >
                {section.date
                  ? new Date(section.date).toLocaleDateString("en-ZA", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </Typography>

              {section.images.length > 0 ? (
                <Box
                  sx={{
                    display:
                      section.imageAlign === "center" ? "block" : "flex",
                    flexDirection:
                      section.imageAlign === "left" ? "row-reverse" : "row",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  {section.imageAlign === "center" && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 2,
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      {section.images.map((img, i) => (
                        <img
                          key={i}
                          src={img.url}
                          alt={`Section image ${i + 1}`}
                          style={{
                            width: "100%",
                            maxWidth: 400,
                            borderRadius: 8,
                            objectFit: "cover",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          }}
                        />
                      ))}
                    </Box>
                  )}

                  <Box
                    sx={{
                      flex: 1,
                      fontSize: "1.1rem",
                      lineHeight: 1.6,
                      fontStyle: "italic",
                      textAlign: section.paragraphAlign || "left",
                    }}
                  >
                    {section.paragraph}
                  </Box>

                  {section.imageAlign !== "center" && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        maxWidth: 250,
                        flexShrink: 0,
                      }}
                    >
                      {section.images.map((img, i) => (
                        <img
                          key={i}
                          src={img.url}
                          alt={`Section image ${i + 1}`}
                          style={{
                            width: "100%",
                            borderRadius: 8,
                            objectFit: "cover",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              ) : (
                <Box
                  sx={{
                    fontSize: "1.1rem",
                    lineHeight: 1.6,
                    fontStyle: "italic",
                    textAlign: section.paragraphAlign || "left",
                  }}
                >
                  {section.paragraph}
                </Box>
              )}
            </Box>
          ))}
        </Card>
      )}

      <Dialog
        open={publishDialogOpen}
        onClose={() => setPublishDialogOpen(false)}
      >
        <DialogTitle>Publish Newsletter</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={publishOptions.publishContent}
                  onChange={(e) =>
                    setPublishOptions({
                      ...publishOptions,
                      publishContent: e.target.checked,
                    })
                  }
                />
              }
              label="Publish Content (HTML)"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={publishOptions.publishPdf}
                  onChange={(e) =>
                    setPublishOptions({
                      ...publishOptions,
                      publishPdf: e.target.checked,
                    })
                  }
                />
              }
              label="Publish PDF Version"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={publishOptions.sendEmail}
                  onChange={(e) =>
                    setPublishOptions({
                      ...publishOptions,
                      sendEmail: e.target.checked,
                    })
                  }
                />
              }
              label="Send Email Notification to Subscribers"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPublishDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handlePublish}
            variant="contained"
            color="success"
            startIcon={<Publish />}
          >
            Publish
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewsEventsManagement;