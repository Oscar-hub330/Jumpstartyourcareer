import React, { useEffect, useState } from "react";
import api from "../../services/api";
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
import {
  Delete,
  Visibility,
  MarkEmailRead,
  Close,
  Send,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

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

  // =========================
  // FETCH CONTACTS
  // =========================
  const fetchContacts = async (pageNumber = 0) => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/contact?page=${pageNumber + 1}`);

      const contactsWithDate = (res.data.contacts || []).map((c) => ({
        ...c,
        createdAt: c.createdAt
          ? new Date(c.createdAt).toLocaleString()
          : "Unknown",
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
      await api.patch(`/admin/contact/${id}/read`);
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
      await api.delete(`/admin/contact/${id}`);
      fetchContacts(page);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // SEND REPLY
  // =========================
  const sendReply = async () => {
    if (!replyMessage.trim())
      return alert("Reply message cannot be empty");

    setSending(true);
    try {
      await api.post(`/admin/contact/${selected._id}/reply`, {
        message: replyMessage,
      });

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

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.2 },
    { field: "subject", headerName: "Subject", flex: 1.2 },
    {
      field: "isRead",
      headerName: "Status",
      width: 120,
      renderCell: (params) =>
        params.value ? (
          <Chip label="Read" size="small" />
        ) : (
          <Chip label="Unread" color="error" size="small" />
        ),
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
          <IconButton onClick={() => setSelected(params.row) || setOpen(true)}>
            <Visibility />
          </IconButton>
          <IconButton onClick={() => markRead(params.row._id)}>
            <MarkEmailRead />
          </IconButton>
          <IconButton onClick={() => deleteContact(params.row._id)}>
            <Delete />
          </IconButton>
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
          rowCount={rowCount}
          pagination
          paginationMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          disableRowSelectionOnClick
        />
      </Card>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 600,
            bgcolor: "white",
            p: 3,
            borderRadius: 3,
            mx: "auto",
            mt: "5%",
          }}
        >
          {selected && (
            <>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">Message Details</Typography>
                <IconButton onClick={() => setOpen(false)}>
                  <Close />
                </IconButton>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography><b>Name:</b> {selected.name}</Typography>
              <Typography><b>Email:</b> {selected.email}</Typography>
              <Typography><b>Subject:</b> {selected.subject}</Typography>
              <Typography sx={{ whiteSpace: "pre-wrap" }}>
                {selected.message}
              </Typography>

              <TextField
                label="Reply"
                multiline
                rows={4}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                fullWidth
                sx={{ mt: 2 }}
              />

              <Button
                variant="contained"
                endIcon={<Send />}
                onClick={sendReply}
                disabled={sending || selected.isReplied}
                sx={{ mt: 2 }}
              >
                {sending ? "Sending..." : "Send Reply"}
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}