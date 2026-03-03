/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

/* ===== ROUTES ===== */
import subscriberRoutes from "./routes/subscribers.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminContactRoutes.js";
import adminSubscriberRoutes from "./routes/adminSubscribers.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";

/* ===== MIDDLEWARE ===== */
import { requireAdmin } from "./middleware/requireAdmin.js";

/* ===== EMAIL ===== */
import transporter from "./utils/mailer.js";
import { sendEmail } from "./utils/sendEmail.js";

/* ===== ERROR HANDLERS ===== */
import { notFound, errorHandler } from "./middleware/errorHandler.js";

/* =====================
   APP INIT
===================== */

const app = express();

/* =====================
   DIRNAME FIX
===================== */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =====================
   SECURITY
===================== */

app.use(helmet());

/* =====================
   LOGGING (DEV ONLY)
===================== */

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

/* =====================
   CORS
===================== */

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://jumpstartyourcareer.org.za",
  "http://jumpstartyourcareer.org.za",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

/* =====================
   BODY PARSER
===================== */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =====================
   UPLOAD DIRECTORY
===================== */

const uploadDir = path.join(
  __dirname,
  process.env.UPLOAD_DIR || "uploads"
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* =====================
   STATIC FILES
===================== */

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* =====================
   API ROUTES
===================== */

/* ---- Public Routes ---- */

app.use("/api/newsletters", newsletterRoutes);
app.use("/api/subscribe", subscriberRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);

/* ---- Admin Auth Routes ---- */
/* Handles:
   POST   /api/admin/login
   GET    /api/admin/verify
*/

app.use("/api/admin", adminAuthRoutes);

/* ---- Protected Admin Routes ---- */

app.use(
  "/api/admin/contact",
  requireAdmin,
  adminRoutes
);

app.use(
  "/api/admin/subscribers",
  requireAdmin,
  adminSubscriberRoutes
);

/* =====================
   EMAIL ROUTE
===================== */

app.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  if (!to || !subject) {
    return res.status(400).json({
      message: "Missing fields",
    });
  }

  try {
    const info = await sendEmail({
      to,
      subject,
      text,
      html,
    });

    res.json({
      message: "Email sent",
      info,
    });
  } catch (err) {
    res.status(500).json({
      message: "Email failed",
    });
  }
});

/* =====================
   ROOT ROUTE
===================== */

app.get("/", (req, res) => {
  res.json({
    message: "Jumpstart API Running",
  });
});

/* =====================
   ERROR HANDLING
===================== */

app.use(notFound);
app.use(errorHandler);

/* =====================
   START SERVER
===================== */

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();

    transporter.verify((err) => {
      if (err) {
        console.log("SMTP error:", err);
      } else {
        console.log("SMTP Ready");
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

startServer();