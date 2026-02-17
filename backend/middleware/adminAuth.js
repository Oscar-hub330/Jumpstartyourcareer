/* eslint-disable no-undef */

export default function adminAuth(req, res, next) {
  try {
    /* =========================
       ENV CHECK
    ========================= */
    const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

    if (!ADMIN_TOKEN) {
      console.error("❌ ADMIN_TOKEN missing in .env");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    /* =========================
       HEADER EXTRACTION
       Node auto-lowercases headers
    ========================= */
    const header = req.headers.authorization;

    // Debug (very helpful during development)
    console.log("🔑 Authorization header:", header);

    if (!header) {
      return res.status(401).json({ message: "No authorization header" });
    }

    /* =========================
       TOKEN PARSE
       Supports:
       Bearer token
       token
    ========================= */
    let token;

    if (header.startsWith("Bearer ")) {
      token = header.replace("Bearer ", "").trim();
    } else {
      token = header.trim();
    }

    /* =========================
       VALIDATION
    ========================= */
    if (token !== ADMIN_TOKEN) {
      console.warn("⚠️ Unauthorized admin access attempt");
      return res.status(401).json({ message: "Unauthorized" });
    }

    /* =========================
       SUCCESS
    ========================= */
    next();
  } catch (err) {
    console.error("AdminAuth error:", err);
    return res.status(500).json({ message: "Auth middleware failed" });
  }
}
