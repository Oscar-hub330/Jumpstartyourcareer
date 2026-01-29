import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  Modal,
  Button,
  Pagination,
  Stack,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  maxHeight: "80vh",
  overflowY: "auto",
};

export default function ContactAdmin() {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchContacts = async (pageNum = 1) => {
    const res = await axios.get(
      `http://localhost:4000/api/admin/contact?page=${pageNum}`,
      {
        headers: {
          Authorization: import.meta.env.VITE_ADMIN_TOKEN,
        },
      }
    );

    setContacts(res.data.contacts);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchContacts(page);
  }, [page]);

  const markAsRead = async (id) => {
    await axios.patch(
      `http://localhost:4000/api/admin/contact/${id}/read`,
      {},
      {
        headers: {
          Authorization: import.meta.env.VITE_ADMIN_TOKEN,
        },
      }
    );
    fetchContacts(page);
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    await axios.delete(`http://localhost:4000/api/admin/contact/${id}`, {
      headers: {
        Authorization: import.meta.env.VITE_ADMIN_TOKEN,
      },
    });
    fetchContacts(page);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Contact Messages
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {contacts.map((c) => (
            <TableRow key={c._id} hover>
              <TableCell sx={{ whiteSpace: "nowrap" }}>{c.name}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell
                sx={{
                  maxWidth: 200,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {c.subject}
              </TableCell>

              <TableCell>
                <Chip
                  size="small"
                  label={c.isRead ? "Read" : "Unread"}
                  color={c.isRead ? "default" : "primary"}
                />
              </TableCell>

              <TableCell align="right">
                <IconButton
                  size="small"
                  onClick={() => {
                    setSelected(c);
                    if (!c.isRead) markAsRead(c._id);
                  }}
                >
                  <VisibilityIcon />
                </IconButton>

                <IconButton
                  size="small"
                  color="error"
                  onClick={() => deleteContact(c._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Stack alignItems="center" mt={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, val) => setPage(val)}
        />
      </Stack>

      {/* VIEW MODAL */}
      <Modal open={!!selected} onClose={() => setSelected(null)}>
        <Box sx={modalStyle}>
          {selected && (
            <>
              <Typography variant="h6" fontWeight={600}>
                {selected.subject}
              </Typography>

              <Typography variant="body2" color="text.secondary" mt={0.5}>
                {selected.name} • {selected.email}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                }}
              >
                {selected.message}
              </Typography>

              <Stack direction="row" justifyContent="flex-end" mt={3}>
                <Button onClick={() => setSelected(null)}>Close</Button>
              </Stack>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
