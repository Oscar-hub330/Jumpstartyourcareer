import Newsletter from "../models/Newsletter.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/* ================= GET ALL ================= */
export const getAll = asyncHandler(async (req, res) => {
  const newsletters = await Newsletter.find().sort({ createdAt: -1 });
  res.json(newsletters);
});

/* ================= GET ONE ================= */
export const getOne = asyncHandler(async (req, res) => {
  const newsletter = await Newsletter.findById(req.params.id);
  if (!newsletter) {
    res.status(404);
    throw new Error("Newsletter not found");
  }
  res.json(newsletter);
});

/* ================= CREATE ================= */
export const create = asyncHandler(async (req, res) => {
  const { title, author, sections } = req.body;

  if (!title || !author) {
    res.status(400);
    throw new Error("Title and author required");
  }

  const parsedSections = JSON.parse(sections || "[]");

  let sectionImages = [];
  if (req.files?.sectionImages) {
    sectionImages = req.files.sectionImages.map(
      (file) => `/uploads/newsletters/${file.filename}`
    );
  }

  const formattedSections = parsedSections.map((sec, index) => ({
    ...sec,
    image: sectionImages[index] || null,
  }));

  const newsletter = await Newsletter.create({
    title,
    author,
    coverImage: req.files?.coverImage
      ? `/uploads/newsletters/${req.files.coverImage[0].filename}`
      : null,
    sections: formattedSections,
  });

  res.status(201).json(newsletter);
});

/* ================= UPDATE ================= */
export const update = asyncHandler(async (req, res) => {
  const newsletter = await Newsletter.findById(req.params.id);
  if (!newsletter) {
    res.status(404);
    throw new Error("Newsletter not found");
  }

  const { title, author, published, sections } = req.body;

  if (title) newsletter.title = title;
  if (author) newsletter.author = author;

  if (published !== undefined) {
    newsletter.published = published;
    newsletter.publishedAt = published ? new Date() : null;
  }

  if (sections) {
    const parsed = JSON.parse(sections);
    newsletter.sections = parsed;
  }

  if (req.files?.coverImage) {
    newsletter.coverImage =
      `/uploads/newsletters/${req.files.coverImage[0].filename}`;
  }

  await newsletter.save();

  res.json(newsletter);
});

/* ================= DELETE ================= */
export const remove = asyncHandler(async (req, res) => {
  const newsletter = await Newsletter.findById(req.params.id);
  if (!newsletter) {
    res.status(404);
    throw new Error("Newsletter not found");
  }

  await newsletter.deleteOne();
  res.json({ message: "Deleted successfully" });
});
