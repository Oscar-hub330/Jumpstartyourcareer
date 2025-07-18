import express from "express";
import {
  getNewsletters,
  getNewsletterById,
  createNewsletter,
  updateNewsletter,
  deleteNewsletter,
  downloadNewsletter,
  sendNewsletterToSubscribers,
} from "../controllers/newsletterController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../utils/fileUpload.js";

const router = express.Router();

router.route("/")
  .get(getNewsletters)
  .post(protect, upload.single("file"), createNewsletter);

router.route("/:id")
  .get(getNewsletterById)
  .put(protect, updateNewsletter)
  .delete(protect, deleteNewsletter);

router.route("/:id/download").get(downloadNewsletter);
router.route("/:id/send").post(protect, sendNewsletterToSubscribers);

export default router;