// src/pages/AdminLogin.jsx

import { useState } from "react";
import api from "../services/api";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ACCENT = "#fea434";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/admin/login", {
        email,
        password,
      });

      if (res.data?.token) {
        localStorage.setItem("adminToken", res.data.token);

        // Hard redirect ensures fresh auth state
        window.location.href = "/admin";
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          mt: 12,
          p: 5,
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          border: `1px solid ${ACCENT}`,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            color: ACCENT,
            fontWeight: 600,
            mb: 3,
          }}
        >
          Admin Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Email"
          type="email"
          fullWidth
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 3 }}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            bgcolor: ACCENT,
            height: 44,
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              bgcolor: "#e5952f",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={22} sx={{ color: "white" }} />
          ) : (
            "Login"
          )}
        </Button>
      </Box>
    </Container>
  );
};

export default AdminLogin;