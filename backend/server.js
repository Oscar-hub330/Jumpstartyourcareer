/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import subscriberRoutes from "./routes/subscribers.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

/* =====================
   APP INIT
===================== */
const app = express();
app.use(cors());
app.use(express.json());

/* =====================
   DIRNAME FIX (ESM)
===================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =====================
   ENV VALIDATION (FAIL FAST)
===================== */
const REQUIRED_ENV = ["MONGO_URI", "PORT"];
REQUIRED_ENV.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required env variable: ${key}`);
    process.exit(1);
  }
});

/* =====================
   UPLOAD DIR
===================== */
const uploadDir = path.join(
  __dirname,
  process.env.UPLOAD_DIR || "uploads"
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`📁 Upload directory created at ${uploadDir}`);
}

/* =====================
   ROUTES
===================== */
app.use("/api/subscribe", subscriberRoutes);
app.use("/api/newsletters", newsletterRoutes);
app.use("/api/blogs", blogRoutes);

/* =====================
   STATIC FILES
===================== */
app.use("/uploads", express.static(uploadDir));

/* =====================
   ERROR HANDLING
===================== */
app.use(notFound);
app.use(errorHandler);

/* =====================
   SERVER START (DB FIRST!)
===================== */
const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err.message);
    process.exit(1);
  }
};

startServer();
