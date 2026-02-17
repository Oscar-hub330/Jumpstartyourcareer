/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Modal,
  Stack,
  Divider,
  IconButton,
  Container,
  CircularProgress,
  TextField,
  MenuItem,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const ACCENT = "#fea434";
const API_URL = `${import.meta.env.VITE_API_URL}/api/newsletters`;
const BASE_URL = import.meta.env.VITE_API_URL;

const StyledButton = ({ children, ...props }) => (
  <Button
    {...props}
    variant="contained"
    sx={{
      bgcolor: ACCENT,
      color: "#fff",
      fontWeight: 600,
      fontSize: { xs: 12, sm: 14, md: 15 },
      py: { xs: 0.8, sm: 1, md: 1.1 },
      px: { xs: 1.5, sm: 2, md: 3 },
      minWidth: { xs: 80, sm: 100, md: 120 },
      whiteSpace: "nowrap",
      "&:hover": { bgcolor: ACCENT },
      textTransform: "none",
    }}
  >
    {children}
  </Button>
);

export default function NewsEvents() {
  const [newsletters, setNewsletters] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6); 
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL);
        setNewsletters(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to fetch newsletters:", error.response?.data || error.message);
        setNewsletters([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const shareNewsletter = (nl) => {
    const shareUrl = `${window.location.origin}/news/${nl.slug || nl._id}`;
    if (navigator.share) navigator.share({ title: nl.title, url: shareUrl });
    else window.open(`https://wa.me/?text=${encodeURIComponent(nl.title + " " + shareUrl)}`);
  };

  const renderSection = (sec, index) => {
    if (!sec.text && !sec.image) return null;
    return (
      <Box key={index} sx={{ mb: 3, width: "100%" }}>
        <Stack
          direction={{
            xs: "column",
            md:
              sec.imagePosition === "left"
                ? "row"
                : sec.imagePosition === "right"
                ? "row-reverse"
                : "column",
          }}
          spacing={2}
          alignItems="center"
        >
          {sec.image && (
            <Box
              component="img"
              src={`${BASE_URL}${sec.image}`}
              alt="Newsletter"
              loading="lazy"
              sx={{
                width: sec.imagePosition === "center" ? "100%" : { xs: "100%", md: "45%" },
                maxHeight: 350,
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: 2,
              }}
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
          {sec.text && (
            <Typography sx={{ flex: 1, textAlign: sec.textAlign || "left", lineHeight: 1.8, color: "#444" }}>
              {sec.text}
            </Typography>
          )}
        </Stack>
      </Box>
    );
  };

  const filteredNewsletters = useMemo(() => {
    let arr = newsletters.filter((nl) => {
      const titleMatch = nl.title.toLowerCase().includes(search.toLowerCase());
      let dateMatch = true;
      if (startDate) dateMatch = new Date(nl.publishedAt) >= new Date(startDate);
      if (dateMatch && endDate) dateMatch = new Date(nl.publishedAt) <= new Date(endDate);
      return titleMatch && dateMatch;
    });

    arr.sort((a, b) => {
      const aDate = new Date(a.publishedAt);
      const bDate = new Date(b.publishedAt);
      return sortOrder === "newest" ? bDate - aDate : aDate - bDate;
    });

    return arr;
  }, [newsletters, search, startDate, endDate, sortOrder]);

  const paginatedNewsletters = useMemo(() => filteredNewsletters.slice(0, visibleCount), [filteredNewsletters, visibleCount]);

  const isNew = (nl) => {
    if (!nl.publishedAt) return false;
    const diffDays = (new Date() - new Date(nl.publishedAt)) / (1000 * 3600 * 24);
    return diffDays <= 7;
  };

  const NewsletterCard = ({ nl }) => (
    <Card
      sx={{
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "0.3s",
        "&:hover": { transform: "translateY(-5px)", boxShadow: 5 },
        border: isNew(nl) ? `2px solid ${ACCENT}` : "none",
      }}
    >
      {nl.coverImage && (
        <CardMedia
          component="img"
          image={`${BASE_URL}${nl.coverImage}`}
          alt={nl.title}
          sx={{ height: 200, objectFit: "cover" }}
          onError={(e) => (e.target.style.display = "none")}
        />
      )}

      <CardContent sx={{ flex: 1 }}>
        <Typography fontSize={18} fontWeight={700} mb={0.5}>
          {nl.title} {isNew(nl) && <Typography component="span" color={ACCENT}>New</Typography>}
        </Typography>

        {nl.author && (
          <Typography fontSize={12} color="text.secondary" mb={1}>
            By: {nl.author.name || nl.author}
          </Typography>
        )}

        <Typography fontSize={14} sx={{ color: "#555", lineHeight: 1.6 }}>
          {nl.sections?.[0]?.text?.length > 120 ? nl.sections[0].text.slice(0, 120) + "..." : nl.sections?.[0]?.text}
        </Typography>

        <Typography fontSize={12} color="text.secondary" mt={1}>
          {nl.publishedAt ? new Date(nl.publishedAt).toLocaleDateString() : ""}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <StyledButton fullWidth onClick={() => { setSelected(nl); setOpen(true); }}>
            Read More
          </StyledButton>
          <IconButton sx={{ color: ACCENT }} onClick={() => shareNewsletter(nl)} aria-label="share">
            <ShareIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ bgcolor: "#fff7ed", minHeight: "100vh" }}>
      {/* HERO */}
      <Box
        sx={{
          py: 3,
          textAlign: "center",
          background: `linear-gradient(135deg, ${ACCENT}, #ffb84d)`,
          color: "#fff",
          mb: 3,
        }}
      >
        <Typography fontSize={{ xs: 22, sm: 26, md: 30 }} fontWeight={700}>
          Newsletter & Events
        </Typography>
      </Box>

      {/* FILTERS */}
      <Container maxWidth="lg" sx={{ mb: 3 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
          <TextField
            placeholder="Search by title..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setVisibleCount(6); }}
            sx={{ flex: 1, minWidth: 150 }}
          />
          <TextField
            type="date"
            value={startDate}
            onChange={(e) => { setStartDate(e.target.value); setVisibleCount(6); }}
            sx={{ minWidth: 120 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="date"
            value={endDate}
            onChange={(e) => { setEndDate(e.target.value); setVisibleCount(6); }}
            sx={{ minWidth: 120 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            select
            label="Sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="oldest">Oldest First</MenuItem>
          </TextField>
        </Stack>
      </Container>

      {/* NEWSLETTERS GRID */}
      <Container maxWidth="lg" sx={{ py: 0 }}>
        {loading ? (
          <Box textAlign="center"><CircularProgress /></Box>
        ) : filteredNewsletters.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">No newsletters found.</Typography>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                gap: 3,
              }}
            >
              {paginatedNewsletters.map((nl) => <NewsletterCard key={nl._id} nl={nl} />)}
            </Box>

            {visibleCount < filteredNewsletters.length && (
              <Stack alignItems="center" mt={4}>
                <StyledButton onClick={() => setVisibleCount((prev) => prev + 6)}>
                  Load More
                </StyledButton>
              </Stack>
            )}
          </>
        )}
      </Container>

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: { xs: "95%", md: 800 },
            maxHeight: "90vh",
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
          <Box sx={{ flex: 1, overflowY: "auto", p: 3, maxWidth: 720, mx: "auto" }}>
            <Typography fontSize={{ xs: 18, sm: 20, md: 24 }} fontWeight={700} mb={2}>
              {selected?.title}
            </Typography>

            {selected?.sections?.map((sec, i) => renderSection(sec, i))}

            {selected?.author && (
              <Typography fontSize={12} color="text.secondary" mt={2}>
                By: {selected.author.name || selected.author}
              </Typography>
            )}

            {selected?.publishedAt && (
              <Typography fontSize={12} color="text.secondary" mt={1} textAlign="right">
                Published: {new Date(selected.publishedAt).toLocaleDateString()}
              </Typography>
            )}
          </Box>

          <Divider />
          <Stack direction="row" justifyContent="flex-end" sx={{ p: 2 }}>
            <StyledButton onClick={() => setOpen(false)}>
              <CloseIcon sx={{ mr: 1 }} /> Close
            </StyledButton>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}
