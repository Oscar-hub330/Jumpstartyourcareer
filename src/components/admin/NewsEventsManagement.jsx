 
/* eslint-disable react/react-in-jsx-scope */

import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  IconButton,
  MenuItem,
  Stack,
  Divider,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogActions,
  Tabs,
  Tab,
  Chip,
} from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const API = `${import.meta.env.VITE_API_URL}/api/newsletters`;
const ACCENT = "#fea434";
const POSITIONS = ["left", "right"];
const TEXT_ALIGN = ["left", "right", "center", "justify"];

export default function NewsEventsManagement() {

  const [tab, setTab] = useState(0);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    author: "",
    coverImage: "",
    published: false,
    sections: [{ text: "", image: "", imagePosition: "left", textAlign: "left" }],
  });

  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setList(Array.isArray(data) ? data : []);
    } catch {
      setToast({ open: true, message: "Failed to fetch newsletters", severity: "error" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= SEARCH ================= */
  const filteredList = list.filter((n) =>
    n.title?.toLowerCase().includes(search.toLowerCase())
  );

  const total = list.length;
  const publishedCount = list.filter((n) => n.published).length;
  const draftCount = total - publishedCount;

  /* ================= IMAGE RESOLVER ================= */
  const resolveImage = (img) => {
    if (!img) return "";
    if (img.startsWith("blob:")) return img;
    if (img.startsWith("http")) return img;
    return `${import.meta.env.VITE_API_URL}${img}`;
  };

  /* ================= IMAGE UPLOAD ================= */
  const upload = (file, sectionIndex = null) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);

    if (sectionIndex === null) {
      setForm((prev) => ({
        ...prev,
        coverImage: previewUrl,
        _coverFile: file,
      }));
    } else {
      const copy = [...form.sections];
      copy[sectionIndex].image = previewUrl;
      copy[sectionIndex]._imageFile = file;
      setForm({ ...form, sections: copy });
    }
  };

  /* ================= SECTION ================= */
  const addSection = () =>
    setForm((prev) => ({
      ...prev,
      sections: [...prev.sections, { text: "", image: "", imagePosition: "left", textAlign: "left" }],
    }));

  const updateSection = (i, key, val) => {
    const copy = [...form.sections];
    copy[i][key] = val;
    setForm({ ...form, sections: copy });
  };

  const removeSection = (index) => {
    const copy = [...form.sections];
    copy.splice(index, 1);
    setForm({ ...form, sections: copy });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const copy = Array.from(form.sections);
    const [moved] = copy.splice(result.source.index, 1);
    copy.splice(result.destination.index, 0, moved);
    setForm({ ...form, sections: copy });
  };

  /* ================= SAVE ================= */
  const save = async () => {
    if (!form.title || !form.author) {
      setToast({ open: true, message: "Title & Author required", severity: "warning" });
      return;
    }

    try {
      const fd = new FormData();

      fd.append("title", form.title);
      fd.append("author", form.author);
      fd.append("published", form.published);

      fd.append(
        "sections",
        JSON.stringify(
          form.sections.map((s) => ({
            text: s.text,
            imagePosition: s.imagePosition,
            textAlign: s.textAlign,
          }))
        )
      );

      if (form._coverFile) {
        fd.append("coverImage", form._coverFile);
      }

      form.sections.forEach((s) => {
        if (s._imageFile) {
          fd.append("sectionImages", s._imageFile);
        }
      });

      const res = await fetch(
        editingId ? `${API}/${editingId}` : API,
        {
          method: editingId ? "PUT" : "POST",
          body: fd,
        }
      );

      if (!res.ok) throw new Error("Save failed");

      fetchData();

      setToast({
        open: true,
        message: editingId ? "Updated" : "Saved",
        severity: "success",
      });

      setEditingId(null);

      setForm({
        title: "",
        author: "",
        coverImage: "",
        published: false,
        sections: [{ text: "", image: "", imagePosition: "left", textAlign: "left" }],
      });

    } catch (err) {
      setToast({ open: true, message: err.message, severity: "error" });
    }
  };

  /* ================= PUBLISH ================= */
  const publishNewsletter = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          published: true,
          publishedAt: new Date(),
        }),
      });

      if (!res.ok) throw new Error("Publish failed");

      fetchData();
      setToast({ open: true, message: "Published", severity: "success" });

    } catch (err) {
      setToast({ open: true, message: err.message, severity: "error" });
    }
  };

  /* ================= EDIT ================= */
  const editNewsletter = (newsletter) => {
    setForm({
      ...newsletter,
      sections: newsletter.sections?.map((s) => ({
        text: s.text || "",
        image: s.image || "",
        imagePosition: s.imagePosition || "left",
        textAlign: s.textAlign || "left",
      })) || [],
    });

    setEditingId(newsletter._id);
    setTab(0);
  };

  /* ================= DELETE ================= */
  const confirmDelete = (id) => setDeleteDialog({ open: true, id });

  const del = async () => {
    try {
      const res = await fetch(`${API}/${deleteDialog.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      fetchData();
      setToast({ open: true, message: "Deleted", severity: "success" });
      setDeleteDialog({ open: false, id: null });
    } catch (err) {
      setToast({ open: true, message: err.message, severity: "error" });
    }
  };

  /* ================= UI ================= */
  return (
    <Box p={4} bgcolor="#f6f7f9" minHeight="100vh">
      <Typography variant="h5" mb={3}>
        Newsletter Management
      </Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Create / Edit Newsletter" />
        <Tab label="Manage Newsletters" />
      </Tabs>

      {/* CREATE TAB */}
      {tab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={2}>
                <TextField label="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                <TextField label="Author"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                />

                <Button startIcon={<AddPhotoAlternateIcon />} component="label">
                  Upload Cover Image
                  <input hidden type="file"
                    onChange={(e) => upload(e.target.files[0], null)}
                  />
                </Button>

                <Divider />

                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="sections">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {form.sections.map((s, i) => (
                          <Draggable key={i} draggableId={`section-${i}`} index={i}>
                            {(prov) => (
                              <Card
                                ref={prov.innerRef}
                                {...prov.draggableProps}
                                {...prov.dragHandleProps}
                                sx={{ p: 2, mb: 2 }}
                              >
                                <Stack spacing={1}>
                                  <TextField multiline
                                    label={`Section ${i + 1} Text`}
                                    value={s.text}
                                    onChange={(e) => updateSection(i, "text", e.target.value)}
                                  />

                                  <Button size="small" component="label">
                                    Add Image
                                    <input hidden type="file"
                                      onChange={(e) => upload(e.target.files[0], i)}
                                    />
                                  </Button>

                                  <TextField select label="Image Position"
                                    value={s.imagePosition}
                                    onChange={(e) => updateSection(i, "imagePosition", e.target.value)}>
                                    {POSITIONS.map((p) => (
                                      <MenuItem key={p} value={p}>{p}</MenuItem>
                                    ))}
                                  </TextField>

                                  <TextField select label="Text Align"
                                    value={s.textAlign}
                                    onChange={(e) => updateSection(i, "textAlign", e.target.value)}>
                                    {TEXT_ALIGN.map((t) => (
                                      <MenuItem key={t} value={t}>{t}</MenuItem>
                                    ))}
                                  </TextField>

                                  <Button color="error" onClick={() => removeSection(i)}>
                                    Remove Section
                                  </Button>
                                </Stack>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                <Button onClick={addSection}>Add Section</Button>

                <Button variant="contained"
                  sx={{ bgcolor: ACCENT }}
                  onClick={save}>
                  {editingId ? "Update Newsletter" : "Save Newsletter"}
                </Button>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" mb={2}>Live Preview</Typography>
            <Card sx={{ p: 3 }}>
              {form.coverImage && (
                <img
                  src={resolveImage(form.coverImage)}
                  alt="cover"
                  style={{ width: "100%", borderRadius: 8, marginBottom: 15 }}
                />
              )}
              <Typography variant="h5">{form.title || "Newsletter Title"}</Typography>
              <Typography variant="caption" color="text.secondary">
                By {form.author || "Author"}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* MANAGE TAB */}
      {tab === 1 && (
        <>
          <TextField fullWidth label="Search"
            sx={{ mb: 2 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Stack direction="row" spacing={2} mb={2}>
            <Chip label={`Total: ${total}`} />
            <Chip label={`Published: ${publishedCount}`} color="success" />
            <Chip label={`Drafts: ${draftCount}`} color="warning" />
          </Stack>

          {filteredList.map((n) => (
            <Card key={n._id} sx={{ mt: 2 }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between">
                  <Stack>
                    <Typography>{n.title}</Typography>
                    <Typography variant="caption">
                      {n.published
                        ? `Published on ${
                            n.publishedAt
                              ? new Date(n.publishedAt).toLocaleDateString()
                              : "Recently"
                          }`
                        : "Draft"}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    {!n.published && (
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ bgcolor: ACCENT }}
                        onClick={() => publishNewsletter(n._id)}
                      >
                        Publish
                      </Button>
                    )}
                    <IconButton onClick={() => editNewsletter(n)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => confirmDelete(n._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </>
      )}

      {/* DELETE DIALOG */}
      <Dialog open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, id: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, id: null })}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={del}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={toast.open} autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}>
        <Alert severity={toast.severity}>{toast.message}</Alert>
      </Snackbar>
    </Box>
  );
}
