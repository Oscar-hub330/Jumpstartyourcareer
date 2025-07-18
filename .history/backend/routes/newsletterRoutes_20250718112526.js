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
    cb(null, "uploads/"); // Make sure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

// Only accept PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Routes
router.post("/", upload.single("pdf"), createNewsletter);
router.get("/", getAllNewsletters);
router.get("/:id", getNewsletterById);
router.delete("/:id", deleteNewsletter);

export default router;
