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

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api/admin/subscribers";

const SubscriberList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axios.get(`${API}/subscribers`);
        setSubscribers(res.data);
        setError(null);
      } catch (err) {
        console.error(err);
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

  if (!subscribers.length) {
    return (
      <Typography align="center" mt={4}>
        No subscribers found.
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography
        variant="h5"
        sx={{ mb: 3, color: "#ffa333" }}
        align="center"
      >
        Subscriber Emails
      </Typography>

      <List sx={{ bgcolor: "#fffaf5", borderRadius: 2, boxShadow: 3 }}>
        {subscribers.map((subscriber) => (
          <ListItem key={subscriber._id} divider>
            <ListItemText
              primary={subscriber.email}
              secondary={new Date(
                subscriber.subscribedAt
              ).toLocaleDateString()}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default SubscriberList;
