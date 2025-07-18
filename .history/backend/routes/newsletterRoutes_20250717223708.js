import express from 'express';
import Newsletter from '../models/Newsletter.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// ✅ Create a new newsletter
router.post('/', upload.array('images'), async (req, res) => {
  try {
    console.log('📦 Request body:', req.body);
    console.log('🖼️ Uploaded files:', req.files);

    const { templateIndex, sections, publishOptions } = req.body;

    // ✅ Parse sections and convert date
    const parsedSections = JSON.parse(sections).map(section => ({
      ...section,
      date: new Date(section.date) // Force valid Date object
    }));

    // ✅ Map files to correct sections
    const processedSections = parsedSections.map(section => {
      if (section.images && section.images.length > 0) {
        const sectionImages = req.files
          .filter(file => section.images.includes(file.originalname))
          .map(file => ({
            url: `/uploads/${file.filename}`,
            filename: file.filename,
            path: file.path
          }));
        return { ...section, images: sectionImages };
      }
      return section;
    });

    // ✅ Handle optional PDF
    let pdfFile = null;
    if (req.files.some(file => file.mimetype === 'application/pdf')) {
      const pdf = req.files.find(file => file.mimetype === 'application/pdf');
      pdfFile = {
        url: `/uploads/${pdf.filename}`,
        filename: pdf.filename,
        path: pdf.path
      };
    }

    const newsletter = new Newsletter({
      templateIndex,
      sections: processedSections,
      pdfFile,
      publishOptions: JSON.parse(publishOptions),
      isPublished: true
    });

    await newsletter.save();
    res.status(201).json(newsletter);
  } catch (error) {
    console.error('❌ Newsletter creation error:', error);
    res.status(400).json({ message: error.message });
  }
});

// ✅ Get all newsletters
router.get('/', async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ publishedAt: -1 });
    res.json(newsletters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get one newsletter by ID
router.get('/:id', async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter) {
      return res.status(404).json({ message: 'Newsletter not found' });
    }
    res.json(newsletter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Update newsletter
router.put('/:id', upload.array('images'), async (req, res) => {
  try {
    const { templateIndex, sections, publishOptions } = req.body;
    const newsletter = await Newsletter.findById(req.params.id);

    if (!newsletter) {
      return res.status(404).json({ message: 'Newsletter not found' });
    }

    const parsedSections = JSON.parse(sections).map(section => ({
      ...section,
      date: new Date(section.date)
    }));

    const processedSections = parsedSections.map(section => {
      if (section.images && section.images.length > 0) {
        const existingImages = section.images.filter(img => typeof img === 'object');
        const newImages = req.files
          .filter(file => section.images.includes(file.originalname))
          .map(file => ({
            url: `/uploads/${file.filename}`,
            filename: file.filename,
            path: file.path
          }));
        return { ...section, images: [...existingImages, ...newImages] };
      }
      return section;
    });

    // Update PDF if present
    if (req.files.some(file => file.mimetype === 'application/pdf')) {
      const pdf = req.files.find(file => file.mimetype === 'application/pdf');
      newsletter.pdfFile = {
        url: `/uploads/${pdf.filename}`,
        filename: pdf.filename,
        path: pdf.path
      };
    }

    newsletter.templateIndex = templateIndex;
    newsletter.sections = processedSections;
    newsletter.publishOptions = JSON.parse(publishOptions);
    newsletter.publishedAt = new Date();

    await newsletter.save();
    res.json(newsletter);
  } catch (error) {
    console.error('❌ Update error:', error);
    res.status(400).json({ message: error.message });
  }
});

// ✅ Delete a newsletter
router.delete('/:id', async (req, res) => {
  try {
    const newsletter = await Newsletter.findByIdAndDelete(req.params.id);
    if (!newsletter) {
      return res.status(404).json({ message: 'Newsletter not found' });
    }

    // Remove PDF
    if (newsletter.pdfFile) {
      fs.unlinkSync(newsletter.pdfFile.path);
    }

    // Remove images
    newsletter.sections.forEach(section => {
      section.images.forEach(image => {
        fs.unlinkSync(image.path);
      });
    });

    res.json({ message: 'Newsletter deleted successfully' });
  } catch (error) {
    console.error('❌ Delete error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
