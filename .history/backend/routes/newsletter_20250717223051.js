import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
});

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  paragraph: { type: String, required: true },
  images: { type: [imageSchema], default: [] },
});

const pdfFileSchema = new mongoose.Schema({
  url: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
});

const newsletterSchema = new mongoose.Schema({
  templateIndex: { type: Number, required: true },
  sections: { type: [sectionSchema], required: true },
  pdfFile: { type: pdfFileSchema, required: false },
  publishOptions: { type: mongoose.Schema.Types.Mixed, required: true },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Newsletter", newsletterSchema);
