// models/Newsletter.js
import mongoose from 'mongoose';

const NewsletterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Newsletter', NewsletterSchema);
