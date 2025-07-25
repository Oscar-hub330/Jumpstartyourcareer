import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Container,
} from "@mui/material";
import axios from "axios";

const SubscriberList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/subscribers");
        setSubscribers(res.data);
        setError(null);
      } catch {
        setError("Failed to fetch subscribers.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress sx={{ color: "#ffa333" }} />
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

  if (subscribers.length === 0) {
    return (
      <Typography align="center" mt={4}>
        No subscribers found.
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, color: "#ffa333" }} align="center">
        Subscriber Emails
      </Typography>
      <List sx={{ bgcolor: "#fffaf5", borderRadius: 2, boxShadow: 3 }}>
        {subscribers.map(({ email, subscribedAt }, idx) => (
          <ListItem key={idx} divider>
            <ListItemText
              primary={email}
              secondary={new Date(subscribedAt).toLocaleDateString()}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default SubscriberList;