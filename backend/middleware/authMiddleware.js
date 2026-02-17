/* eslint-disable no-undef */
// protectAdmin.js
export const protectAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  // Check against environment variable
  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ msg: "Unauthorized: Invalid token" });
  }

  next();
};
