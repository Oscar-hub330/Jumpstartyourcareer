/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Modal,
  Avatar,
  TextField,
  Pagination,
  IconButton,
  Stack,
  Divider,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import axios from "axios";
import Footer from "../components/Footer";

const ACCENT = "#fea434";
const ITEMS_PER_PAGE = 6;

export default function NewsEvents() {
  const [newsletters, setNewsletters] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/newsletters");
        const allData = res.data || [];
        setNewsletters(allData.filter((n) => !n.pdf));
        setPdfs(allData.filter((n) => n.pdf));
      } catch (error) {
        console.error("Failed to fetch newsletters:", error);
        setNewsletters([]);
        setPdfs([]);
      }
    };
    fetch();
  }, []);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return newsletters.filter((n) =>
      `${n.title} ${n.description}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [newsletters, search]);

  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const formatDate = (d) => new Date(d).toLocaleDateString();

  const shareNewsletter = (nl) => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: nl.title, text: nl.description, url });
      return;
    }
    window.open(
      `https://wa.me/?text=${encodeURIComponent(nl.title + " " + url)}`
    );
  };

  return (
    <Box sx={{ bgcolor: "#fff7ed", minHeight: "100vh" }}>
      {/* HERO */}
      <Box
        sx={{
          py: 6,
          textAlign: "center",
          background: `linear-gradient(135deg, ${ACCENT}, #ffb84d)`,
          color: "#fff",
        }}
      >
        <Typography fontSize={26} fontWeight={600}>
          Newsletter & Event Archive
        </Typography>
      </Box>

      {/* SEARCH */}
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search newsletters..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#aaa" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* NEWSLETTER GRID */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, pb: 6 }}>
        <Typography fontSize={20} fontWeight={600} sx={{ mb: 2 }}>
          Newsletters & Events
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: 3,
          }}
        >
          {paginated.map((nl) => (
            <Card key={nl._id} sx={{ borderRadius: 3, display: "flex", flexDirection: "column", height: "100%" }}>
              <CardMedia
                component="img"
                loading="lazy"
                image={`http://localhost:4000/uploads/${nl.image}`}
                sx={{ height: 160, objectFit: "cover" }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography fontSize={16} fontWeight={600}>
                  {nl.title}
                </Typography>
                <Typography fontSize={13} sx={{ mt: 1, color: "#555" }}>
                  {nl.description?.slice(0, 100)}...
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 2, alignItems: "center" }}>
                  <Avatar sx={{ width: 24, height: 24 }}>{(nl.author || "A")[0]}</Avatar>
                  <Typography fontSize={12}>{formatDate(nl.createdAt)}</Typography>
                </Stack>

                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button
                    fullWidth
                    size="small"
                    variant="contained"
                    sx={{ bgcolor: ACCENT }}
                    onClick={() => { setSelected(nl); setOpen(true); }}
                  >
                    View
                  </Button>
                  <IconButton onClick={() => shareNewsletter(nl)}>
                    <ShareIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* PAGINATION */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} />
        </Box>
      </Box>

      {/* PDF GRID (Visually distinct) */}
      {pdfs.length > 0 && (
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, pb: 6 }}>
          <Typography fontSize={20} fontWeight={600} sx={{ mb: 2 }}>
            PDF Downloads
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
              gap: 3,
            }}
          >
            {pdfs.map((pdf) => (
              <Card
                key={pdf._id}
                sx={{
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3,
                  height: 200,
                  bgcolor: "#f2f2f2",
                  textAlign: "center",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <PictureAsPdfIcon sx={{ fontSize: 60, color: ACCENT, mb: 1 }} />
                <Typography fontSize={15} fontWeight={600} sx={{ mb: 1 }}>
                  {pdf.title}
                </Typography>
                <Typography fontSize={12} sx={{ color: "#555", mb: 2 }}>
                  {pdf.description?.slice(0, 60)}...
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ bgcolor: ACCENT }}
                  href={`http://localhost:4000/uploads/${pdf.pdf}`}
                  target="_blank"
                >
                  Open PDF
                </Button>
                <IconButton onClick={() => shareNewsletter(pdf)}>
                  <ShareIcon />
                </IconButton>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      {/* MODAL FOR NEWSLETTERS */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: { xs: "95%", md: 780 },
            height: "88vh",
            bgcolor: "#fff",
            borderRadius: 3,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            boxShadow: 24,
            overflow: "hidden",
          }}
        >
          {selected?.image && (
            <Box sx={{ width: "100%", aspectRatio: "16/7", maxHeight: 160, overflow: "hidden", bgcolor: "#f6f6f6" }}>
              <img
                src={`http://localhost:4000/uploads/${selected.image}`}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          )}

          <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
            <Typography sx={{ fontSize: 17, fontWeight: 600, mb: 1 }}>{selected?.title}</Typography>
            <Typography sx={{ fontSize: 13.5, lineHeight: 1.75, color: "#444", whiteSpace: "pre-line" }}>
              {selected?.description}
            </Typography>
          </Box>

          <Divider />

          <Stack direction="row" spacing={1} sx={{ p: 1.5, justifyContent: "space-between", alignItems: "center", bgcolor: "#fafafa" }}>
            <Stack direction="row" spacing={1}>
              <IconButton href={`https://wa.me/?text=${encodeURIComponent(selected?.title + " " + window.location.href)}`}>
                <WhatsAppIcon />
              </IconButton>
              <IconButton href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}>
                <FacebookIcon />
              </IconButton>
              <IconButton href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}>
                <LinkedInIcon />
              </IconButton>
            </Stack>

            <Stack direction="row" spacing={1}>
              {selected?.pdf && (
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<DownloadIcon />}
                  sx={{ bgcolor: ACCENT }}
                  href={`http://localhost:4000/uploads/${selected.pdf}`}
                  target="_blank"
                >
                  Open PDF
                </Button>
              )}
              <Button size="small" startIcon={<CloseIcon />} onClick={() => setOpen(false)}>
                Close
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>

      <Footer />
    </Box>
  );
}
