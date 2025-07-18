import express from "express";
import Subscriber from "../models/Subscriber.js";

const router = express.Router();

// POST /api/subscribers
router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already subscribed." });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: "Subscription successful." });
  } catch (error) {
    console.error("Subscribe Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
