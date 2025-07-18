// controllers/newsletterController.js
import Newsletter from "../models/Newsletter.js";
import fs from "fs";
import path from "path";

// POST /api/newsletters
const createNewsletter = async (req, res) => {
  try {
    console.log("🔥 Incoming request to create newsletter...");
    console.log("🧾 Body:", req.body);
    console.log("📎 File:", req.file);

    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "PDF file is required." });
    }

    const pdfPath = req.file.path;

    const newsletter = new Newsletter({
      title,
      description,
      pdf: pdfPath,
      published: true, // You can toggle this if you want admin to decide later
    });

    const saved = await newsletter.save();
    console.log("✅ SAVED to DB:", saved);

    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error creating newsletter:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// GET /api/newsletters
const getAllNewsletters = async (req, res) => {
  try {
    console.log("📥 Fetching all newsletters...");
    const newsletters = await Newsletter.find({ published: true }).sort({ createdAt: -1 });
    res.json(newsletters);
  } catch (err) {
    console.error("❌ Error fetching newsletters:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// GET /api/newsletters/:id
const getNewsletterById = async (req, res) => {
  try {
    console.log(`🔎 Fetching newsletter with ID: ${req.params.id}`);
    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter) {
      return res.status(404).json({ error: "Newsletter not found." });
    }
    res.json(newsletter);
  } catch (err) {
    console.error("❌ Error fetching newsletter:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// DELETE /api/newsletters/:id
const deleteNewsletter = async (req, res) => {
  try {
    console.log(`🗑️ Deleting newsletter with ID: ${req.params.id}`);
    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter) {
      return res.status(404).json({ error: "Newsletter not found." });
    }

    // Delete the PDF file from disk
    const filePath = path.resolve(newsletter.pdf);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.warn("⚠️ PDF deletion warning:", err.message);
      } else {
        console.log("🧹 PDF file deleted:", filePath);
      }
    });

    await newsletter.deleteOne();
    res.json({ message: "✅ Newsletter deleted successfully." });
  } catch (err) {
    console.error("❌ Error deleting newsletter:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export {
  createNewsletter,
  getAllNewsletters,
  getNewsletterById,
  deleteNewsletter,
};
