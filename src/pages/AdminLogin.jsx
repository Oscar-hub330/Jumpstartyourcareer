// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "password123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Invalid credentials. Use admin/password123.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} border="1px solid #fea434" borderRadius={2}>
        <Typography variant="h5" color="#fea434" mb={3} align="center">
          Admin Login
        </Typography>
        <TextField label="Username" variant="outlined" fullWidth value={username}
          onChange={(e) => setUsername(e.target.value)} sx={{ mb: 2 }} />
        <TextField label="Password" variant="outlined" fullWidth type="password"
          value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />
        <Button variant="contained" fullWidth sx={{ bgcolor: "#fea434" }}
          onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default AdminLogin;
