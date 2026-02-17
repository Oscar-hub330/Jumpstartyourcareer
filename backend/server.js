/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import fs from "fs";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

// ===== ROUTES =====
import subscriberRoutes from "./routes/subscribers.js";            // public subscribers
import newsletterRoutes from "./routes/newsletterRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminContactRoutes.js";
import adminSubscriberRoutes from "./routes/adminSubscribers.js";  // ✅ admin subscriber management


import { notFound, errorHandler } from "./middleware/errorHandler.js";

// =====================
// Nodemailer imports
// =====================
import transporter from "./utils/mailer.js"; // transporter setup
import { sendEmail } from "./utils/sendEmail.js";

/* =====================
   APP INIT
===================== */
const app = express();

/* =====================
   GLOBAL MIDDLEWARE FIRST
===================== */
app.use(cors());
app.use(express.json()); // ⭐ ALWAYS FIRST
app.use(express.urlencoded({ extended: true }));

/* =====================
   DIRNAME FIX (ES MODULE)
===================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =====================
   ENV VALIDATION
===================== */
const REQUIRED_ENV = [
  "MONGO_URI",
  "PORT",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS"
];
REQUIRED_ENV.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing required env variable: ${key}`);
    process.exit(1);
  }
});

/* =====================
   UPLOAD DIR
===================== */
const uploadDir = path.join(__dirname, process.env.UPLOAD_DIR || "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* =====================
   ROUTES
===================== */

app.use("/api/newsletters", newsletterRoutes);
app.use("/api/subscribe", subscriberRoutes);              // public subscribers
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin/contact", adminRoutes);
app.use("/api/admin/subscribers", adminSubscriberRoutes); // admin subscriber management

// =====================
// SEND EMAIL ROUTE
// =====================
app.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const info = await sendEmail({ to, subject, text, html });
    res.status(200).json({ message: "Email sent successfully", info });
  } catch (err) {
    res.status(500).json({ message: "Failed to send email", error: err.message });
  }
});

/* =====================
   STATIC FILES
===================== */
// Serve newsletter uploads
//app.use("/uploads/newsletters", express.static(path.join(__dirname, "uploads/newsletters")));
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =====================
   ERROR HANDLING (LAST)
===================== */
app.use(notFound);
app.use(errorHandler);

/* =====================
   START SERVER
===================== */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    // Test SMTP connection on server start
    transporter.verify((err, success) => {
      if (err) console.error("SMTP connection error:", err);
      else console.log("SMTP ready to send emails");
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err.message);
    process.exit(1);
  }
};

startServer();
