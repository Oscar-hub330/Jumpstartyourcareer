import Newsletter from "../models/Newsletter.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "../uploads");

// Async helper to delete a file without blocking
const unlinkFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to delete file:", filePath, err);
        return reject(err);
      }
      resolve();
    });
  });
};

// 📌 Create newsletter (PDF or image required)
const createNewsletter = async (req, res) => {
  try {
    const imageFile = req.files?.image?.[0];
    const pdfFile = req.files?.pdf?.[0];
    const { title, description, author, pdfText = '', imagePosition = 'top' } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required." });
    }
    if (!imageFile && !pdfFile) {
      return res.status(400).json({ error: "Either image or PDF is required." });
    }

    const newsletter = new Newsletter({
      title,
      description,
      author: author || "Admin",
      image: imageFile ? imageFile.filename : null,
      pdf: pdfFile ? pdfFile.filename : null,
      pdfText: pdfText || '',
      imagePosition: imagePosition || 'top',
      published: true,
    });

    const saved = await newsletter.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating newsletter:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// 📌 Get all newsletters
const getAllNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ createdAt: -1 });
    res.json(newsletters);
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// 📌 Get newsletter by ID
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

// 📌 Delete newsletter and its files (async)
const deleteNewsletter = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter) {
      return res.status(404).json({ error: "Newsletter not found." });
    }

    const imagePath = newsletter.image ? path.join(uploadsDir, newsletter.image) : null;
    const pdfPath = newsletter.pdf ? path.join(uploadsDir, newsletter.pdf) : null;

    // Delete files asynchronously but don't block response on failure
    if (imagePath && fs.existsSync(imagePath)) {
      unlinkFile(imagePath).catch(() => {});
    }
    if (pdfPath && fs.existsSync(pdfPath)) {
      unlinkFile(pdfPath).catch(() => {});
    }

    await newsletter.deleteOne();
    res.json({ message: "Newsletter deleted successfully." });
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// 📌 Update newsletter with validation and async file replacement
const updateNewsletter = async (req, res) => {
  try {
    const { id } = req.params;
    const newsletter = await Newsletter.findById(id);
    if (!newsletter) {
      return res.status(404).json({ error: "Newsletter not found." });
    }

    const { title, description, author, pdfText = '', imagePosition = 'top' } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required." });
    }

    const imageFile = req.files?.image?.[0];
    const pdfFile = req.files?.pdf?.[0];

    // At least one must be present after update
    if (!imageFile && !pdfFile && !newsletter.image && !newsletter.pdf) {
      return res.status(400).json({ error: "Either image or PDF is required." });
    }

    newsletter.title = title;
    newsletter.description = description;
    newsletter.author = author || newsletter.author;
    newsletter.imagePosition = imagePosition || newsletter.imagePosition;
    newsletter.pdfText = pdfText || newsletter.pdfText;

    if (imageFile) {
      if (newsletter.image) {
        await unlinkFile(path.join(uploadsDir, newsletter.image));
      }
      newsletter.image = imageFile.filename;
      // If new image, remove pdf
      if (newsletter.pdf) {
        await unlinkFile(path.join(uploadsDir, newsletter.pdf));
        newsletter.pdf = null;
        newsletter.pdfText = '';
      }
    }
    if (pdfFile) {
      if (newsletter.pdf) {
        await unlinkFile(path.join(uploadsDir, newsletter.pdf));
      }
      newsletter.pdf = pdfFile.filename;
      // If new pdf, remove image
      if (newsletter.image) {
        await unlinkFile(path.join(uploadsDir, newsletter.image));
        newsletter.image = null;
      }
    }

    const updated = await newsletter.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating newsletter:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export {
  createNewsletter,
  getAllNewsletters,
  getNewsletterById,
  deleteNewsletter,
  updateNewsletter,
};
