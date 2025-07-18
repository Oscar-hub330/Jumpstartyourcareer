import express from 'express';
import {
  createNewsletter,
  getNewsletters,
  getNewsletter,
  updateNewsletter,
  deleteNewsletter
} from '../controllers/newsletterController.js';
import upload from '../config/multer.js';

const router = express.Router();

// Create a newsletter with file uploads
router.post('/', 
  upload.fields([
    { name: 'pdf', maxCount: 1 },
    { name: 'images', maxCount: 20 }
  ]), 
  createNewsletter
);

// Get all newsletters
router.get('/', getNewsletters);

// Get single newsletter
router.get('/:id', getNewsletter);

// Update newsletter
router.put('/:id', 
  upload.fields([
    { name: 'pdf', maxCount: 1 },
    { name: 'images', maxCount: 20 }
  ]), 
  updateNewsletter
);

// Delete newsletter
router.delete('/:id', deleteNewsletter);

export default router;