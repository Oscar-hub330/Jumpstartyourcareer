// backend/routes/blogRoutes.js

import express from "express";
import multer from "multer";
import path from "path";

import {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  updateBlog,
} from "../controllers/blogController.js";

const router = express.Router();

// === Multer Setup for Blog Images ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder served statically in server.js
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  // Only accept image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

// === Routes ===
router.post("/", upload.single("image"), createBlog);     // Create blog with image
router.get("/", getAllBlogs);                             // Get all blogs
router.get("/:id", getBlogById);                          // Get a blog by ID
router.put("/:id", upload.single("image"), updateBlog);   // Update blog
router.delete("/:id", deleteBlog);                        // Delete blog

export default router;
