import express from "express";
import multer from "multer";
import path from "path";

import {
  createNewsletter,
  getAllNewsletters,
  getNewsletterById,
  deleteNewsletter,
  updateNewsletter,
} from "../controllers/newsletterController.js";

const router = express.Router();

// Multer storage config with corrected uploads path
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // eslint-disable-next-line no-undef
    cb(null, path.join(process.cwd(), "uploads")); // Correct folder: backend/uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// File filter: allow only PDFs and images
const fileFilter = (req, file, cb) => {
  const isPdf = file.fieldname === "pdf" && file.mimetype === "application/pdf";
  const isImage = file.fieldname === "image" && file.mimetype.startsWith("image/");
  if (isPdf || isImage) {
    cb(null, true);
  } else {
    cb(new Error("Only image and PDF files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

// 📨 Create newsletter (image + pdf)
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  createNewsletter
);

// ✏️ Update newsletter (image/pdf can be replaced)
router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  updateNewsletter
);

// 📚 Get all newsletters
router.get("/", getAllNewsletters);

// 📄 Get one by ID
router.get("/:id", getNewsletterById);

// 🗑️ Delete
router.delete("/:id", deleteNewsletter);

export default router;
