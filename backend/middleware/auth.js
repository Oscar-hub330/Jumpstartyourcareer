/* eslint-disable no-undef */
// middleware/auth.js


// Simple admin auth for testing purposes
// You can later replace with JWT or proper auth
export const adminAuth = (req, res, next) => {
  const token = req.headers["x-admin-token"];

  // Replace this token with something secure or environment variable
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "secret_admin_token";

  if (!token || token !== ADMIN_TOKEN) {
    return res.status(403).json({ message: "Forbidden: Admin access only" });
  }

  next();
};
