import express from "express";
import {
  loginAdmin,
  verifyAdmin,
} from "../controllers/adminAuthController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/verify", requireAdmin, verifyAdmin);

export default router;