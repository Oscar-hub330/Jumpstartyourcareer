import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import subscriberRoutes from "./routes/subscribers.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

/* =====================
   ENV
===================== */
dotenv.config();

/* =====================
   APP
===================== */
const app = express();
app.use(cors());
app.use(express.json());

/* =====================
   DIRNAME FIX
===================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =====================
   UPLOAD DIR
===================== */
const uploadDir = path.join(
  __dirname,
  process.env.UPLOAD_DIR || "uploads"
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* =====================
   DB
===================== */
connectDB();

/* =====================
   ROUTES
===================== */
app.use("/api/subscribe", subscriberRoutes);
app.use("/api/newsletters", newsletterRoutes);
app.use("/api/blogs", blogRoutes);

/* =====================
   STATIC
===================== */
app.use("/uploads", express.static(uploadDir));

/* =====================
   ERRORS
===================== */
app.use(notFound);
app.use(errorHandler);

/* =====================
   SERVER
===================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
