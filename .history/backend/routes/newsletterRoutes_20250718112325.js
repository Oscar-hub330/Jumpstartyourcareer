import express from "express";
import multer from "multer";
import path from "path";

import {
  createNewsletter,
  getAllNewsletters,
  getNewsletterById,
  deleteNewsletter,
} from "../controllers/newsletterController.js";

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists or is created in server.js
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Preserve original extension
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

// Filter only PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Routes with Multer middleware on POST
router.post("/", upload.single("pdf"), createNewsletter);
router.get("/", getAllNewsletters);
router.get("/:id", getNewsletterById);
router.delete("/:id", deleteNewsletter);

export default router;
