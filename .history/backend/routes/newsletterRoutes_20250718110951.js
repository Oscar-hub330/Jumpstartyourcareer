// routes/newsletterRoutes.js
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

// Ensure the 'uploads/' directory exists
import fs from "fs";
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer for PDF uploads only
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed."), false);
  }
};
const upload = multer({ storage, fileFilter });

// Routes
router.post("/", upload.single("pdf"), createNewsletter); // Upload a newsletter
router.get("/", getAllNewsletters);                      // Fetch all newsletters
router.get("/:id", getNewsletterById);                   // Fetch one by ID
router.delete("/:id", deleteNewsletter);                 // Delete newsletter

export default router;
