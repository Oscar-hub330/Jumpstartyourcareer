import Newsletter from "../models/Newsletter.js";
import Subscriber from "../models/Subscriber.js";
import { sendNewsletterEmail } from "../utils/emailService.js";
import fs from "fs";
import path from "path";

// @desc    Get all newsletters
// @route   GET /api/newsletters
// @access  Public
export const getNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ createdAt: -1 });
    res.json(newsletters);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get single newsletter
// @route   GET /api/newsletters/:id
// @access  Public
export const getNewsletterById = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    if (newsletter) {
      res.json(newsletter);
    } else {
      res.status(404).json({ message: "Newsletter not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a newsletter
// @route   POST /api/newsletters
// @access  Private/Admin
export const createNewsletter = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const newsletter = new Newsletter({
      title,
      description,
      filePath: req.file.path,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      user: req.user._id,
    });

    const createdNewsletter = await newsletter.save();
    res.status(201).json(createdNewsletter);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update a newsletter
// @route   PUT /api/newsletters/:id
// @access  Private/Admin
export const updateNewsletter = async (req, res) => {
  try {
    const { title, description, isPublished } = req.body;
    const newsletter = await Newsletter.findById(req.params.id);

    if (newsletter) {
      newsletter.title = title || newsletter.title;
      newsletter.description = description || newsletter.description;
      newsletter.isPublished = isPublished || newsletter.isPublished;

      const updatedNewsletter = await newsletter.save();
      res.json(updatedNewsletter);
    } else {
      res.status(404).json({ message: "Newsletter not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a newsletter
// @route   DELETE /api/newsletters/:id
// @access  Private/Admin
export const deleteNewsletter = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);

    if (newsletter) {
      // Delete the file from server
      if (fs.existsSync(newsletter.filePath)) {
        fs.unlinkSync(newsletter.filePath);
      }
      
      await newsletter.remove();
      res.json({ message: "Newsletter removed" });
    } else {
      res.status(404).json({ message: "Newsletter not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Download newsletter file
// @route   GET /api/newsletters/:id/download
// @access  Public
export const downloadNewsletter = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);

    if (!newsletter) {
      return res.status(404).json({ message: "Newsletter not found" });
    }

    if (!fs.existsSync(newsletter.filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    res.download(newsletter.filePath, newsletter.fileName);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Send newsletter to subscribers
// @route   POST /api/newsletters/:id/send
// @access  Private/Admin
export const sendNewsletterToSubscribers = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    const subscribers = await Subscriber.find({ isActive: true });

    if (!newsletter) {
      return res.status(404).json({ message: "Newsletter not found" });
    }

    if (subscribers.length === 0) {
      return res.status(400).json({ message: "No active subscribers found" });
    }

    // Send emails to all subscribers
    await sendNewsletterEmail(subscribers, newsletter);

    newsletter.sentToSubscribers = true;
    await newsletter.save();

    res.json({ message: "Newsletter sent to subscribers successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};