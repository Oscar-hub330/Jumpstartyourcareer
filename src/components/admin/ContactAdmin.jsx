import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  IconButton,
  Modal,
  Stack,
  Button,
  Chip,
  Divider,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Delete, Visibility, MarkEmailRead, Close, Send } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

const API = "http://localhost:4000/api/admin/contact";

export default function ContactAdmin() {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);

  const token = import.meta.env.VITE_ADMIN_TOKEN;

  // =========================
  // FETCH CONTACTS
  // =========================
  const fetchContacts = async (pageNumber = 0) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}?page=${pageNumber + 1}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Ensure dates are valid
      const contactsWithDate = (res.data.contacts || []).map((c) => ({
        ...c,
        createdAt: c.createdAt ? new Date(c.createdAt).toLocaleString() : "Unknown",
      }));

      setContacts(contactsWithDate);
      setRowCount(res.data.totalMessages || 0);
    } catch (err) {
      console.error("Failed to fetch contacts:", err.response?.data || err.message);
      setContacts([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(page);
  }, [page]);

  // =========================
  // MARK READ
  // =========================
  const markRead = async (id) => {
    try {
      await axios.patch(`${API}/${id}/read`, {}, { headers: { Authorization: `Bearer ${token}` } });
      fetchContacts(page);
      if (selected?._id === id) setSelected({ ...selected, isRead: true });
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // DELETE
  // =========================
  const deleteContact = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await axios.delete(`${API}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchContacts(page);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // OPEN MODAL
  // =========================
  const openModal = (row) => {
    setSelected(row);
    setOpen(true);
    setReplyMessage("");
  };

  // =========================
  // SEND REPLY
  // =========================
  const sendReply = async () => {
    if (!replyMessage.trim()) return alert("Reply message cannot be empty");
    setSending(true);
    try {
      await axios.post(
        `${API}/${selected._id}/reply`,
        { message: replyMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchContacts(page);
      setSelected({ ...selected, isReplied: true, isRead: true });
      setReplyMessage("");
      alert("Reply sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  // =========================
  // TABLE COLUMNS
  // =========================
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.2 },
    { field: "subject", headerName: "Subject", flex: 1.2 },
    {
      field: "isRead",
      headerName: "Status",
      width: 120,
      renderCell: (params) =>
        params.value ? <Chip label="Read" size="small" /> : <Chip label="Unread" color="error" size="small" />,
    },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 230,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5}>
          <IconButton onClick={() => openModal(params.row)}><Visibility /></IconButton>
          <IconButton onClick={() => markRead(params.row._id)}><MarkEmailRead /></IconButton>
          <IconButton onClick={() => deleteContact(params.row._id)}><Delete /></IconButton>
          <Button
            variant="contained"
            size="small"
            onClick={() => openModal(params.row)}
            disabled={params.row.isReplied}
          >
            {params.row.isReplied ? "Replied" : "Reply"}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={1}>
        Contact Messages ({rowCount})
      </Typography>

      <Card sx={{ height: 600, position: "relative" }}>
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "rgba(255,255,255,0.6)",
              zIndex: 10,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <DataGrid
          rows={contacts}
          columns={columns}
          getRowId={(row) => row._id}
          page={page}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 20, 50]}
          rowCount={rowCount}
          pagination
          paginationMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
          disableRowSelectionOnClick
          sx={{ border: 0, "& .MuiDataGrid-row": { fontSize: 14 } }}
        />
      </Card>

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 600,
            maxHeight: "80vh",
            overflowY: "auto",
            bgcolor: "white",
            p: 3,
            borderRadius: 3,
            mx: "auto",
            mt: "5%",
            boxShadow: 24,
          }}
        >
          {selected && (
            <>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Message Details</Typography>
                <IconButton onClick={() => setOpen(false)}><Close /></IconButton>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={2}>
                <Typography><b>Name:</b> {selected.name}</Typography>
                <Typography><b>Email:</b> {selected.email}</Typography>
                <Typography><b>Subject:</b> {selected.subject}</Typography>
                <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.6, fontSize: 14 }}>{selected.message}</Typography>

                <TextField
                  label="Reply to user"
                  multiline
                  rows={4}
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  endIcon={<Send />}
                  onClick={sendReply}
                  disabled={sending || selected.isReplied}
                >
                  {selected.isReplied ? "Already Replied" : sending ? "Sending..." : "Send Reply"}
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
