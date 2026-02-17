import express from "express";
import {
  getAll,
  getOne,
  create,
  update,
  remove,
} from "../controllers/newsletterController.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);

router.post(
  "/",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "sectionImages" },
  ]),
  create
);

router.put(
  "/:id",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "sectionImages" },
  ]),
  update
);

router.delete("/:id", remove);

export default router;
