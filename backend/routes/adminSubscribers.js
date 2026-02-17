// routes/adminSubscribers.js
import express from "express";
import { getAdminSubscribers, deleteAdminSubscriber } from "../controllers/adminSubscriberController.js";
import { adminAuth } from "../middleware/auth.js";

const router = express.Router();

// Admin routes protected
router.get("/", adminAuth, getAdminSubscribers);
router.delete("/:id", adminAuth, deleteAdminSubscriber);

export default router;
