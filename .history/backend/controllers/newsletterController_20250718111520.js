// controllers/newsletterController.js
import Newsletter from "../models/Newsletter.js";
import fs from "fs";
import path from "path";

const createNewsletter = async (req, res) => {
  try {
    console.log("🔥 Incoming createNewsletter request");
    console.log("🧾 Body:", req.body);
    console.log("📎 File:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "PDF file is required." });
    }

    // Normalize Windows backslashes to forward slashes for URL consistency
    const pdfPath = req.file.path.replace(/\\/g, "/");
    console.log("Normalized PDF path:", pdfPath);

    const newsletter = new Newsletter({
      title: req.body.title,
      description: req.body.description,
      pdf: pdfPath,
      published: true,
    });

    const saved = await newsletter.save();
    console.log("✅ Newsletter saved:", saved);
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Error creating newsletter:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getAllNewsletters = async (req, res) => {
  try {
    console.log("📥 Fetching all newsletters...");
    const newsletters = await Newsletter.find({ published: true }).sort({ createdAt: -1 });
    res.json(newsletters);
  } catch (error) {
    console.error("❌ Error fetching newsletters:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getNewsletterById = async (req, res) => {
  try {
    console.log(`🔎 Fetching newsletter with ID: ${req.params.id}`);
    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter) {
      return res.status(404).json({ error: "Newsletter not found." });
    }
    res.json(newsletter);
  } catch (error) {
    console.error("❌ Error fetching newsletter:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

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
  } catch (error) {
    console.error("❌ Error deleting newsletter:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export {
  createNewsletter,
  getAllNewsletters,
  getNewsletterById,
  deleteNewsletter,
};
