// routes/subscriberRoutes.js
import express from "express";
import { getAllSubscribers, sendNotificationEmail } from "../controllers/subscriberController.js";

const router = express.Router();

router.get("/", getAllSubscribers);
router.post("/send-email", sendNotificationEmail);

export default router;
