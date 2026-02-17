/* eslint-disable no-unused-vars */
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
} from "@mui/material";
import { Delete, Visibility, MarkEmailRead, Close } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

// API endpoint
const API = "http://localhost:4000/api/admin/contact";

export default function ContactAdmin() {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  // ✅ Vite-safe admin token
  const token = import.meta.env.VITE_ADMIN_TOKEN;

  // =========================
  // FETCH CONTACTS
  // =========================
  const fetchContacts = async () => {
    try {
      if (!token) {
        console.error("Admin token missing!");
        return;
      }

      const res = await axios.get(`${API}?page=${page}`, {
        headers: { Authorization: token },
      });

      const dataArray = Array.isArray(res.data.contacts)
        ? res.data.contacts
        : [];

      setContacts(
        dataArray.map((item) => ({
          _id: item._id || item.id || Math.random(), // fallback
          name: item.name || "No Name",
          email: item.email || "No Email",
          subject: item.subject || "No Subject",
          message: item.message || "No Message",
          isRead: item.isRead || false,
          createdAt: item.createdAt || new Date().toISOString(),
        }))
      );

      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch contacts:", err.response?.data || err.message);
      setContacts([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [page]);

  // =========================
  // ACTIONS
  // =========================
  const markRead = async (id) => {
    try {
      await axios.patch(`${API}/${id}/read`, {}, { headers: { Authorization: token } });
      fetchContacts();
      if (selected?._id === id) setSelected({ ...selected, isRead: true });
    } catch (err) {
      console.error("Failed to mark read:", err.response?.data || err.message);
    }
  };

  const deleteContact = async (id) => {
    try {
      if (!window.confirm("Delete this message?")) return;
      await axios.delete(`${API}/${id}`, { headers: { Authorization: token } });
      fetchContacts();
      if (selected?._id === id) setOpen(false);
    } catch (err) {
      console.error("Failed to delete contact:", err.response?.data || err.message);
    }
  };

  const openModal = (row) => {
    if (!row) return;
    setSelected(row);
    setOpen(true);
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
      valueGetter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => openModal(params.row)}>
            <Visibility />
          </IconButton>
          <IconButton onClick={() => markRead(params.row._id)}>
            <MarkEmailRead />
          </IconButton>
          <IconButton onClick={() => deleteContact(params.row._id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  // =========================
  // UI
  // =========================
  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Contact Messages
      </Typography>

      <Card sx={{ height: 600 }}>
        <DataGrid
          rows={contacts || []}
          columns={columns}
          getRowId={(row) => row._id || Math.random()}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableRowSelectionOnClick
          sx={{ border: 0, "& .MuiDataGrid-row": { fontSize: 14 } }}
        />
      </Card>

      {/* ================= MODAL ================= */}
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
                <IconButton onClick={() => setOpen(false)}>
                  <Close />
                </IconButton>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={2}>
                <Typography><b>Name:</b> {selected?.name || "N/A"}</Typography>
                <Typography><b>Email:</b> {selected?.email || "N/A"}</Typography>
                <Typography><b>Subject:</b> {selected?.subject || "N/A"}</Typography>
                <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.6, fontSize: 14 }}>
                  {selected?.message || "No message content"}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => markRead(selected._id)}
                  disabled={selected?.isRead}
                >
                  {selected?.isRead ? "Already Read" : "Mark as Read"}
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
