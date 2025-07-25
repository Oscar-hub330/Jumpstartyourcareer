import mongoose from "mongoose";

const NewsletterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [150, "Title can't exceed 150 characters"],
    },
    description: {
      type: String,
      trim: true,
      default: "", // Consider making it required or at least non-null
      maxlength: [2000, "Description too long"],
    },
    author: {
      type: String,
      default: "Admin",
      trim: true,
    },
    image: {
      type: String, // filename or relative path
      default: null,
    },
    pdf: {
      type: String,
      required: [true, "PDF file is required"],
    },
    published: {
      type: Boolean,
      default: true,
    },
    // Optional slug for better URLs, indexing, or SEO
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

// Optional: You can add pre-save hook to generate slug from title if desired

const Newsletter = mongoose.model("Newsletter", NewsletterSchema);

export default Newsletter;
