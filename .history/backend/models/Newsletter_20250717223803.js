import mongoose from 'mongoose';

// Image schema
const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true }
});

// Section schema
const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  paragraph: { type: String, required: true },
  images: [imageSchema],
  writerName: { type: String },
  paragraphAlign: {
    type: String,
    enum: ['left', 'center', 'right'],
    default: 'left'
  },
  imageAlign: {
    type: String,
    enum: ['left', 'center', 'right'],
    default: 'left'
  }
});

// Main Newsletter schema
const newsletterSchema = new mongoose.Schema({
  templateIndex: { type: Number, required: true },
  sections: [sectionSchema],
  pdfFile: {
    url: { type: String },
    filename: { type: String },
    path: { type: String }
  },
  publishOptions: {
    publishContent: { type: Boolean, default: false },
    publishPdf: { type: Boolean, default: false },
    sendEmail: { type: Boolean, default: false }
  },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Newsletter', newsletterSchema);
