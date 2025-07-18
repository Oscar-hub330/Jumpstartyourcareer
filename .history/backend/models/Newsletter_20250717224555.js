import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  url: String,
  filename: String,
  path: String
});

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  paragraph: { type: String, required: true },
  images: [imageSchema],
  writerName: { type: String, required: true },
  paragraphAlign: { type: String, enum: ['left', 'center', 'right'], default: 'left' },
  imageAlign: { type: String, enum: ['left', 'center', 'right'], default: 'left' }
});

const newsletterSchema = new mongoose.Schema({
  templateIndex: { type: Number, required: true },
  sections: [sectionSchema],
  pdfFile: {
    url: String,
    filename: String,
    path: String
  },
  publishOptions: {
    publishContent: Boolean,
    publishPdf: Boolean,
    sendEmail: Boolean
  },
  publishedAt: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false }
});

const Newsletter = mongoose.model('Newsletter', newsletterSchema);
export default Newsletter;