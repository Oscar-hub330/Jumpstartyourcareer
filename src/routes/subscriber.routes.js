const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");
const { Parser } = require("json2csv");

// @route   POST /api/subscribers
// @desc    Add a new subscriber
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const existing = await Subscriber.findOne({ email });
    if (existing)
      return res.status(409).json({ error: "Email already subscribed" });

    const newSub = new Subscriber({ email });
    await newSub.save();

    res.status(201).json({ message: "Subscribed successfully", subscriber: newSub });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/subscribers
// @desc    Get all subscribers
router.get("/", async (req, res) => {
  try {
    const subs = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subscribers" });
  }
});

// @route   GET /api/subscribers/export
// @desc    Export all subscribers as CSV
router.get("/export", async (req, res) => {
  try {
    const subs = await Subscriber.find().sort({ createdAt: -1 });

    const fields = ["email", "createdAt"];
    const parser = new Parser({ fields });
    const csv = parser.parse(subs);

    res.header("Content-Type", "text/csv");
    res.attachment("subscribers.csv");
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ error: "CSV export failed" });
  }
});

module.exports = router;
