/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";
import ContactMessage from "../models/ContactMessage.js";
import adminAuth from "../middleware/adminAuth.js";
import nodemailer from "nodemailer";

const router = express.Router();

// ========================
// ADMIN AUTH REQUIRED
// ========================
router.use(adminAuth);

// ========================
// Nodemailer transporter
// ========================
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false, // false for TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) console.error("❌ SMTP transporter error:", err);
  else console.log("✅ SMTP transporter ready");
});

// ========================
// DEBUG ROUTE (Check DB)
// ========================
router.get("/debug", async (req, res) => {
  try {
    const count = await ContactMessage.countDocuments();
    res.json({
      collection: ContactMessage.collection.name,
      totalMessages: count,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========================
// GET CONTACTS WITH PAGINATION
// ========================
router.get("/", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = 10;

    const contacts = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const totalMessages = await ContactMessage.countDocuments();

    // Format date before sending
    const formattedContacts = contacts.map(c => ({
      ...c,
      createdAt: c.createdAt ? new Date(c.createdAt).toLocaleString() : "N/A",
    }));

    res.json({
      contacts: formattedContacts,
      totalMessages,
      totalPages: Math.ceil(totalMessages / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

// ========================
// MARK AS READ
// ========================
router.patch("/:id/read", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid id" });

    const updated = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Message not found" });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to mark as read" });
  }
});

// ========================
// DELETE CONTACT
// ========================
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid id" });

    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Message not found" });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete message" });
  }
});

// ========================
// REPLY TO CONTACT VIA EMAIL
// ========================
router.post("/:id/reply", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message)
      return res.status(400).json({ message: "Reply message required" });

    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid id" });

    const contact = await ContactMessage.findById(req.params.id);

    if (!contact)
      return res.status(404).json({ message: "Message not found" });

    // Send email via SMTP
    await transporter.sendMail({
      from: `"Jumpstart Admin" <${process.env.SMTP_USER}>`,
      to: contact.email,
      subject: `Re: ${contact.subject}`,
      text: message,
      html: `<p>${message.replace(/\n/g, "<br>")}</p>`,
    });

    // Automatically mark as read & replied
    contact.isRead = true;
    contact.isReplied = true;
    await contact.save();

    res.json({ message: "Reply sent successfully", contact });
  } catch (err) {
    console.error("Failed to send reply:", err);
    res.status(500).json({ message: "Failed to send reply", error: err.message });
  }
});

export default router;
