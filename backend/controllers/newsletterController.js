/* eslint-disable no-undef */
import Newsletter from "../models/Newsletter.js";
import fs from "fs";
import path from "path";

const deleteFileIfExists = (filename) => {
  if (!filename) return;
  const filePath = path.join(process.env.UPLOAD_DIR, filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

/* ================= CREATE ================= */
export const createNewsletter = async (req, res) => {
  try {
    const { title, description, author, imagePosition, pdfText } = req.body;
    const imageFile = req.files?.image?.[0] || null;
    const pdfFile = req.files?.pdf?.[0] || null;


    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    let image = null;
    let pdf = null;

    if (imageFile && imageFile.mimetype.startsWith("image/")) {
      image = imageFile.filename;
    }
    if (pdfFile && pdfFile.mimetype === "application/pdf") {
      pdf = pdfFile.filename;
    }

    const newsletter = await Newsletter.create({
      title,
      description,
      author,
      image,
      pdf,
      pdfText,
      imagePosition,
    });

    res.status(201).json(newsletter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= READ ================= */
export const getNewsletters = async (_, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ createdAt: -1 });
    res.json(newsletters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateNewsletter = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter) {
      return res.status(404).json({ error: "Newsletter not found" });
    }

    const { title, description, author, imagePosition, pdfText } = req.body;
    const imageFile = req.files?.image?.[0] || null;
    const pdfFile = req.files?.pdf?.[0] || null;

    // Handle file updates
    if (imageFile || pdfFile) {
      // Remove old files if they exist
      if (newsletter.image) deleteFileIfExists(newsletter.image);
      if (newsletter.pdf) deleteFileIfExists(newsletter.pdf);

      newsletter.image = imageFile ? imageFile.filename : null;
      newsletter.pdf = pdfFile ? pdfFile.filename : null;
      newsletter.pdfText = pdfFile ? pdfText || "" : newsletter.pdfText;
    }

    newsletter.title = title ?? newsletter.title;
    newsletter.description = description ?? newsletter.description;
    newsletter.author = author ?? newsletter.author;
    newsletter.imagePosition = imagePosition ?? newsletter.imagePosition;

    await newsletter.save();
    res.json(newsletter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
