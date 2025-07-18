import Newsletter from "../models/Newsletter.js";
import fs from "fs";
import path from "path";

// Create newsletter with PDF upload
const createNewsletter = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "PDF file is required." });
    }

    const pdfPath = req.file.path.replace(/\\/g, "/");

    const newsletter = new Newsletter({
      title: req.body.title,
      description: req.body.description,
      pdf: pdfPath,
      published: true,
    });

    const saved = await newsletter.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating newsletter:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Get all published newsletters
const getAllNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find({ published: true }).sort({ createdAt: -1 });
    res.json(newsletters);
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Get a newsletter by ID
const getNewsletterById = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter) {
      return res.status(404).json({ error: "Newsletter not found." });
    }
    res.json(newsletter);
  } catch (error) {
    console.error("Error fetching newsletter:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Delete a newsletter and its PDF file
const deleteNewsletter = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter) {
      return res.status(404).json({ error: "Newsletter not found." });
    }

    const filePath = path.resolve(newsletter.pdf);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.warn("Warning: Could not delete PDF file:", err.message);
      }
    });

    await newsletter.deleteOne();
    res.json({ message: "Newsletter deleted successfully." });
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export {
  createNewsletter,
  getAllNewsletters,
  getNewsletterById,
  deleteNewsletter,
};
