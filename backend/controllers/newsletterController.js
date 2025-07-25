import Newsletter from "../models/Newsletter.js";
import fs from "fs";
import path from "path";

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

// 📌 Create newsletter (PDF optional now)
const createNewsletter = async (req, res) => {
  try {
    const imageFile = req.files?.image?.[0];
    const pdfFile = req.files?.pdf?.[0];

    const { title, description, author } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required." });
    }

    const newsletter = new Newsletter({
      title,
      description,
      author: author || "Admin",
      image: imageFile ? imageFile.filename : null,
      pdf: pdfFile ? pdfFile.filename : null,
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

    const imagePath = newsletter.image ? path.resolve("public/uploads", newsletter.image) : null;
    const pdfPath = newsletter.pdf ? path.resolve("public/uploads", newsletter.pdf) : null;

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

    const { title, description, author } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required." });
    }

    newsletter.title = title;
    newsletter.description = description;
    newsletter.author = author || newsletter.author;

    const imageFile = req.files?.image?.[0];
    if (imageFile) {
      if (newsletter.image) {
        await unlinkFile(path.resolve("public/uploads", newsletter.image));
      }
      newsletter.image = imageFile.filename;
    }

    const pdfFile = req.files?.pdf?.[0];
    if (pdfFile) {
      if (newsletter.pdf) {
        await unlinkFile(path.resolve("public/uploads", newsletter.pdf));
      }
      newsletter.pdf = pdfFile.filename;
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
