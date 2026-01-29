import express from "express";
import ContactMessage from "../models/ContactMessage.js";
import { createContact } from "../controllers/contactController.js";

const router = express.Router();
router.post("/", createContact);


// ================= CREATE MESSAGE =================
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({ msg: "Message sent", data: newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= GET ALL (ADMIN) =================
router.get("/", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch {
    res.status(500).json({ msg: "Failed to fetch messages" });
  }
});


// ================= UPDATE STATUS =================
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch {
    res.status(500).json({ msg: "Update failed" });
  }
});


// ================= DELETE (optional) =================
router.delete("/:id", async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch {
    res.status(500).json({ msg: "Delete failed" });
  }
});

export default router;
