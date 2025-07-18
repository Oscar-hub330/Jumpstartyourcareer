// models/Newsletter.js
import mongoose from "mongoose";

const NewsletterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  pdf: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Newsletter = mongoose.model("Newsletter", NewsletterSchema);
export default Newsletter;
