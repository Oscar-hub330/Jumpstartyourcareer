import express from "express";
import ContactMessage from "../models/ContactMessage.js";
import validator from "validator"; // npm i validator

const router = express.Router();

// POST: /api/contact  -> User submits message
router.post("/", async (req, res) => {
  try {
    let { name, email, subject, message } = req.body;

    // Basic required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Trim inputs
    name = name.trim();
    email = email.trim().toLowerCase();
    subject = subject.trim();
    message = message.trim();

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Limit lengths
    if (name.length > 120 || subject.length > 200 || message.length > 2000) {
      return res.status(400).json({ message: "One or more fields exceed allowed length" });
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({ message: "Message sent successfully", data: newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
