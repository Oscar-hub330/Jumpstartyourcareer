const express = require("express");
const router = express.Router();
const Newsletter = require("../models/Newsletter");

// 📩 POST /api/newsletters — Save newsletter (text only)
router.post("/", async (req, res) => {
  try {
    const { templateIndex, sections } = req.body;

    if (templateIndex === undefined || !sections) {
      return res.status(400).json({ error: "Missing templateIndex or sections" });
    }

    // Parse sections if it's a JSON string
    let parsedSections;
    try {
      parsedSections = Array.isArray(sections)
        ? sections
        : JSON.parse(sections);
    } catch (parseErr) {
      return res.status(400).json({ error: "Invalid JSON format in sections" });
    }

    // You can optionally process images in the future here
    const newsletter = new Newsletter({
      templateIndex,
      sections: parsedSections,
      pdfUrl: null, // Skipping PDF for now
    });

    await newsletter.save();

    res.status(201).json({ message: "Newsletter saved", newsletter });
  } catch (err) {
    console.error("❌ Error saving newsletter:", err);
    res.status(500).json({ error: "Failed to save newsletter" });
  }
});

// 📄 GET /api/newsletters — Get all newsletters
router.get("/", async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ createdAt: -1 });
    res.json(newsletters);
  } catch (err) {
    console.error("❌ Error fetching newsletters:", err);
    res.status(500).json({ error: "Failed to fetch newsletters" });
  }
});

module.exports = router;
