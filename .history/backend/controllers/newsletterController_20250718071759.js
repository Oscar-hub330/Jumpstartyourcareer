import Newsletter from '../models/Newsletter.js';
import fs from 'fs';

// eslint-disable-next-line no-unused-vars
import path from 'path';

// Helper function to process uploaded files
const processUploads = (req, existingNewsletter = null) => {
  const files = req.files || [];
  const body = req.body;
  
  // Process PDF
  let pdfFile = null;
  const pdf = files.find(file => file.mimetype === 'application/pdf');
  if (pdf) {
    pdfFile = {
      url: `/uploads/${pdf.filename}`,
      filename: pdf.filename,
      path: pdf.path
    };
  } else if (existingNewsletter?.pdfFile) {
    pdfFile = existingNewsletter.pdfFile;
  }

  // Process sections with images
  const sections = JSON.parse(body.sections);
  const processedSections = sections.map(section => {
    const processedImages = section.images.map(image => {
      if (typeof image === 'object' && image.url) {
        // Keep existing images
        return image;
      } else {
        // Find newly uploaded image
        const uploadedImage = files.find(file => 
          file.fieldname === 'images' && file.originalname === image
        );
        if (uploadedImage) {
          return {
            url: `/uploads/${uploadedImage.filename}`,
            filename: uploadedImage.filename,
            path: uploadedImage.path
          };
        }
        return null;
      }
    }).filter(img => img !== null);

    return {
      ...section,
      images: processedImages,
      date: new Date(section.date)
    };
  });

  return {
    templateIndex: body.templateIndex,
    sections: processedSections,
    pdfFile,
    publishOptions: JSON.parse(body.publishOptions),
    isPublished: true
  };
};

// Create Newsletter
export const createNewsletter = async (req, res) => {
  try {
    const newsletterData = processUploads(req);
    const newsletter = new Newsletter(newsletterData);
    await newsletter.save();
    res.status(201).json(newsletter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Newsletters
export const getNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ publishedAt: -1 });
    res.json(newsletters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Newsletter
export const getNewsletter = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter) {
      return res.status(404).json({ message: 'Newsletter not found' });
    }
    res.json(newsletter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Newsletter
export const updateNewsletter = async (req, res) => {
  try {
    const existingNewsletter = await Newsletter.findById(req.params.id);
    if (!existingNewsletter) {
      return res.status(404).json({ message: 'Newsletter not found' });
    }

    const updatedData = processUploads(req, existingNewsletter);
    const updatedNewsletter = await Newsletter.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updatedNewsletter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Newsletter
export const deleteNewsletter = async (req, res) => {
  try {
    const newsletter = await Newsletter.findByIdAndDelete(req.params.id);
    if (!newsletter) {
      return res.status(404).json({ message: 'Newsletter not found' });
    }

    // Clean up files
    if (newsletter.pdfFile) {
      fs.unlinkSync(newsletter.pdfFile.path);
    }

    newsletter.sections.forEach(section => {
      section.images.forEach(image => {
        fs.unlinkSync(image.path);
      });
    });

    res.json({ message: 'Newsletter deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createNewsletter,
  getNewsletters,
  getNewsletter,
  updateNewsletter,
  deleteNewsletter
};