import express from "express";
import Subscriber from "../models/Subscriber.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  try {
    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already subscribed." });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: "🎉 Subscribed successfully!" });
  } catch (err) {
    console.error("Error saving subscriber:", err);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
