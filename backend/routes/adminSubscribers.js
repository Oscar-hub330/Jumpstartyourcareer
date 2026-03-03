// routes/adminSubscribers.js
import express from "express";
import { getAdminSubscribers, deleteAdminSubscriber } from "../controllers/adminSubscriberController.js";

const router = express.Router();

// Admin routes protected
router.get("/", getAdminSubscribers);
router.delete("/:id", deleteAdminSubscriber);

export default router;
