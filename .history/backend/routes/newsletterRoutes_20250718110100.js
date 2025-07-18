// routes/newsletterRoutes.js
import express from "express";
import multer from "multer";
import path from "path";

import newsletterController from "../controllers/newsletterController.js";

const router = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// File filter: only allow PDFs
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // max 10MB
});

// ROUTES

// Create newsletter (with PDF upload)
router.post(
  "/",
  upload.single("pdf"), // pdf is the field name in the frontend form
  newsletterController.createNewsletter
);

// Get all published newsletters
router.get("/", newsletterController.getAllNewsletters);

// Get one newsletter by ID
router.get("/:id", newsletterController.getNewsletterById);

// Delete a newsletter and its PDF
router.delete("/:id", newsletterController.deleteNewsletter);
export default router;
