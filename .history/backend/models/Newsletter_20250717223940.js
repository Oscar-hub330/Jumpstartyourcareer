import mongoose from 'mongoose';

// Subschema: Image
const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true }
}, { _id: false });

// Subschema: Section
const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  paragraph: { type: String, required: true, maxlength: 5000 },
  images: [imageSchema],
  writerName: { type: String, trim: true },
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
}, { _id: false });

// Main Schema: Newsletter
const newsletterSchema = new mongoose.Schema({
  templateIndex: { type: Number, required: true, min: 0 },
  sections: { type: [sectionSchema], validate: v => Array.isArray(v) && v.length > 0 },
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
  isPublished: { type: Boolean, default: false, index: true },
  publishedAt: { type: Date, default: Date.now, index: true }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


// ✅ Virtual: Total Sections
newsletterSchema.virtual('totalSections').get(function () {
  return this.sections?.length || 0;
});

// ✅ Virtual: Word Count (all paragraphs combined)
newsletterSchema.virtual('wordCount').get(function () {
  return this.sections?.reduce((acc, sec) => acc + (sec.paragraph?.split(/\s+/).length || 0), 0) || 0;
});

// ✅ Index for performance
newsletterSchema.index({ publishedAt: -1 });
newsletterSchema.index({ isPublished: 1 });

export default mongoose.model('Newsletter', newsletterSchema);
