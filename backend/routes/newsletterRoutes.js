import express from "express";
import {
  createNewsletter,
  getNewsletters,
  updateNewsletter,
} from "../controllers/newsletterController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

/**
 * Accept EITHER:
 * - image
 * - pdf
 */
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  createNewsletter
);

router.get("/", getNewsletters);
router.put("/:id", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "pdf", maxCount: 1 },
]), updateNewsletter);

export default router;
