import express from "express";
import Subscriber from "../models/Subscriber.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ success: false, message: "Invalid email address." });
  }

  try {
    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: "Email already subscribed." });
    }

    const newSub = new Subscriber({ email });
    await newSub.save();

    return res.status(201).json({ success: true, message: "Subscribed successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
});

export default router;
