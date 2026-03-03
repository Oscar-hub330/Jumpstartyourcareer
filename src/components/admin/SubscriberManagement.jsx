/* eslint-disable react/react-in-jsx-scope */
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  TextField,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { useEffect, useState, useMemo } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import api from "../../services/api";

const PAGE_SIZE = 10;

// Format date + time and relative "time ago"
const formatDateTime = (date) => {
  const d = new Date(date);
  const formatted = d.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const now = new Date();
  const diffMs = now - d;
  const diffMinutes = Math.floor(diffMs / 60000);

  let ago = "";
  if (diffMinutes < 60) ago = `${diffMinutes} min ago`;
  else if (diffMinutes < 1440) ago = `${Math.floor(diffMinutes / 60)} hrs ago`;
  else ago = `${Math.floor(diffMinutes / 1440)} days ago`;

  return { formatted, ago };
};

const SubscriberManagement = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("subscribedAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Fetch subscribers
  const fetchSubscribers = async () => {
  setLoading(true);
  setError("");

  try {
    const res = await api.get("/admin/subscribers");
    setSubscribers(res.data);
  } catch (err) {
    console.error(err);
    setError("Unauthorized or failed to fetch subscribers");
    setSubscribers([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Delete single subscriber
  const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this subscriber?")) return;

  try {
    await api.delete(`/admin/subscribers/${id}`);
    fetchSubscribers();
  } catch (err) {
    console.error(err);
  }
};

  // Bulk delete
  const handleBulkDelete = async () => {
  if (selected.length === 0) return;
  if (!confirm(`Delete ${selected.length} subscriber(s)?`)) return;

  try {
    await Promise.all(
      selected.map((id) =>
        api.delete(`/admin/subscribers/${id}`)
      )
    );

    setSelected([]);
    fetchSubscribers();
  } catch (err) {
    console.error(err);
  }
};

  // Export CSV
  const exportCSV = () => {
    const list = selected.length
      ? subscribers.filter((s) => selected.includes(s._id))
      : subscribers;

    if (!list.length) return;

    const csv =
      "Email,Date Subscribed\n" +
      list
        .map(
          (s) =>
            `${s.email},${new Date(s.subscribedAt).toLocaleString()}`
        )
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
  };

  // Filtered & sorted subscribers
  const filteredSubscribers = useMemo(() => {
    let data = subscribers;

    if (search)
      data = data.filter((s) =>
        s.email.toLowerCase().includes(search.toLowerCase())
      );

    if (startDate)
      data = data.filter((s) => new Date(s.subscribedAt) >= startDate);
    if (endDate)
      data = data.filter((s) => new Date(s.subscribedAt) <= endDate);

    // Sorting
    data.sort((a, b) => {
      let valA =
        sortField === "email"
          ? a.email.toLowerCase()
          : new Date(a.subscribedAt);
      let valB =
        sortField === "email"
          ? b.email.toLowerCase()
          : new Date(b.subscribedAt);
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }, [subscribers, search, startDate, endDate, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredSubscribers.length / PAGE_SIZE);
  const paginatedSubscribers = filteredSubscribers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const stats = useMemo(() => {
    const total = subscribers.length;
    const today = new Date();
    const daily = subscribers.filter(
      (s) => new Date(s.subscribedAt).toDateString() === today.toDateString()
    ).length;
    const monthly = subscribers.filter(
      (s) =>
        new Date(s.subscribedAt).getMonth() === today.getMonth() &&
        new Date(s.subscribedAt).getFullYear() === today.getFullYear()
    ).length;
    return { total, daily, monthly };
  }, [subscribers]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Box p={3}>
      {/* ===== HEADER ===== */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
      >
        <Typography variant="h5" fontWeight="bold">
          Subscriber Management
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
          <Button
            startIcon={<DownloadIcon />}
            variant="contained"
            onClick={exportCSV}
          >
            Export CSV
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            variant="outlined"
            color="error"
            onClick={handleBulkDelete}
          >
            Delete Selected
          </Button>
        </Box>
      </Box>

      {/* ===== FILTERS & STATS ===== */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
        gap={2}
      >
        <TextField
          label="Search by email"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{ textField: { size: "small" } }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>

        <Box display="flex" gap={2}>
          <Typography>Total: {stats.total}</Typography>
          <Typography>Today: {stats.daily}</Typography>
          <Typography>This Month: {stats.monthly}</Typography>
        </Box>
      </Box>

      {/* ===== TABLE ===== */}
      <Paper sx={{ borderRadius: 3, overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={
                    selected.length === paginatedSubscribers.length &&
                    paginatedSubscribers.length > 0
                  }
                  onChange={(e) =>
                    setSelected(
                      e.target.checked
                        ? paginatedSubscribers.map((s) => s._id)
                        : []
                    )
                  }
                />
              </TableCell>
              <TableCell
                onClick={() => {
                  setSortField("email");
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                }}
              >
                Email
              </TableCell>
              <TableCell
                onClick={() => {
                  setSortField("subscribedAt");
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                }}
              >
                Date Subscribed
              </TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedSubscribers.map((s) => {
              const { formatted, ago } = formatDateTime(s.subscribedAt);
              return (
                <TableRow key={s._id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(s._id)}
                      onChange={() => toggleSelect(s._id)}
                    />
                  </TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>
                    {formatted}
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      {ago}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(s._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            {paginatedSubscribers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No subscribers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* ===== PAGINATION ===== */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1}>
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </Button>
        <Typography>
          Page {page} / {totalPages}
        </Typography>
        <Button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default SubscriberManagement;
