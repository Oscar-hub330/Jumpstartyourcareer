import Blog from "../models/Blog.js";
import fs from "fs";
import path from "path";

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, author, publicationDate, tags } = req.body;

    // Validate required fields
    if (!title?.trim() || !content?.trim() || !author?.trim() || !publicationDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const image = req.file ? req.file.filename : null;

    const newBlog = new Blog({
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      publicationDate,
      tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
      image,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error("❌ Error creating blog:", err.message);
    res.status(500).json({ message: "Server error creating blog" });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error("❌ Error fetching blogs:", err.message);
    res.status(500).json({ message: "Server error fetching blogs" });
  }
};

// Get single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    console.error("❌ Error fetching blog:", err.message);
    res.status(500).json({ message: "Server error fetching blog" });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete image file if exists
    if (blog.image) {
      const imagePath = path.resolve("uploads", blog.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.warn("⚠️ Could not delete image:", err.message);
      });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting blog:", err.message);
    res.status(500).json({ message: "Server error deleting blog" });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, publicationDate, tags } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // If a new image is uploaded, delete old one
    if (req.file && blog.image) {
      const oldPath = path.resolve("uploads", blog.image);
      fs.unlink(oldPath, (err) => {
        if (err) console.warn("⚠️ Could not delete old image:", err.message);
      });
    }

    const updatedFields = {
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      publicationDate,
      tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
      image: req.file ? req.file.filename : blog.image, // fallback to old image
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedFields, { new: true });
    res.json(updatedBlog);
  } catch (err) {
    console.error("❌ Error updating blog:", err.message);
    res.status(500).json({ message: "Server error updating blog" });
  }
};
