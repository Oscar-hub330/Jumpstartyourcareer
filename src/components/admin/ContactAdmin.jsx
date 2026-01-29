/* eslint-disable no-undef */
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

import {
  Delete,
  Visibility,
  MarkEmailRead,
  Close,
} from "@mui/icons-material";

import { DataGrid } from "@mui/x-data-grid";

const API = "http://localhost:4000/api/admin/contact";

export default function ContactAdmin() {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  // =========================
  // FETCH
  // =========================
  const fetchContacts = async () => {
    const res = await axios.get(`${API}?page=${page}`, {
      headers: {
        authorization: process.env.REACT_APP_ADMIN_TOKEN,
      },
    });

    setContacts(res.data.contacts);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchContacts();
  }, [page]);

  // =========================
  // ACTIONS
  // =========================
  const markRead = async (id) => {
    await axios.patch(
      `${API}/${id}/read`,
      {},
      {
        headers: {
          authorization: process.env.REACT_APP_ADMIN_TOKEN,
        },
      }
    );
    fetchContacts();
  };

  const deleteContact = async (id) => {
    await axios.delete(`${API}/${id}`, {
      headers: {
        authorization: process.env.REACT_APP_ADMIN_TOKEN,
      },
    });
    fetchContacts();
  };

  const openModal = (row) => {
    setSelected(row);
    setOpen(true);
  };

  // =========================
  // TABLE COLUMNS
  // =========================
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.2,
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: 1.2,
    },
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
      valueGetter: (params) =>
        new Date(params.value).toLocaleDateString(),
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
          rows={contacts}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableRowSelectionOnClick
          sx={{
            border: 0,
            "& .MuiDataGrid-row": {
              fontSize: 14,
            },
          }}
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
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">
                  Message Details
                </Typography>

                <IconButton onClick={() => setOpen(false)}>
                  <Close />
                </IconButton>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={2}>
                <Typography>
                  <b>Name:</b> {selected.name}
                </Typography>

                <Typography>
                  <b>Email:</b> {selected.email}
                </Typography>

                <Typography>
                  <b>Subject:</b> {selected.subject}
                </Typography>

                <Typography
                  sx={{
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.6,
                    fontSize: 14,
                  }}
                >
                  {selected.message}
                </Typography>

                <Button
                  variant="contained"
                  onClick={() => markRead(selected._id)}
                >
                  Mark as Read
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
