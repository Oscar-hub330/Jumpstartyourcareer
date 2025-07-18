import express from "express";
import Subscriber from "../models/Subscriber.js";

const router = express.Router();

// POST /api/subscribe
router.post("/", async (req, res) => {
  const { email } = req.body;

  // Validate email format
  if (!email || !email.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "❌ Invalid email address.",
    });
  }

  try {
    // Check if email already subscribed
    const exists = await Subscriber.findOne({ email });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "⚠️ Email already subscribed.",
      });
    }

    // Save new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    return res.status(201).json({
      success: true,
      message: "🎉 Subscribed successfully!",
      subscriber: {
        email: newSubscriber.email,
        subscribedAt: newSubscriber.subscribedAt,
      },
    });
  } catch (error) {
    console.error("❌ Subscription error:", error);
    return res.status(500).json({
      success: false,
      message: "🔥 Server error. Please try again later.",
    });
  }
});

export default router;
