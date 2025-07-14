import React from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const mockSubscribers = [
  { id: 1, email: "thabo@example.com", subscribedAt: "2025-06-15" },
  { id: 2, email: "lerato@domain.com", subscribedAt: "2025-06-20" },
  { id: 3, email: "sipho@gmail.com", subscribedAt: "2025-06-21" },
];

const SubscriberList = () => {
  return (
    <Box mt={6}>
      <Typography variant="h5" color="#fea434" gutterBottom>
        <EmailIcon fontSize="medium" sx={{ mr: 1 }} />
        Newsletter Subscribers
      </Typography>

      <Paper elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#fea434" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>#</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Subscribed On</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockSubscribers.map((sub, index) => (
              <TableRow key={sub.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{sub.email}</TableCell>
                <TableCell>{sub.subscribedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default SubscriberList;
