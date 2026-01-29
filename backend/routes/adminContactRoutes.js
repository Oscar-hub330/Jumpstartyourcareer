import express from "express";
import {
  getContacts,
  markAsRead,
  deleteContact,
} from "../controllers/contactController.js";

import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protectAdmin);

router.get("/", getContacts);
router.patch("/:id/read", markAsRead);
router.delete("/:id", deleteContact);

export default router;
