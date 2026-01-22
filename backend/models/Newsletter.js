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
      default: "",
      maxlength: [2000, "Description too long"],
    },
    author: {
      type: String,
      default: "Admin",
      trim: true,
    },
    image: {
      type: String,
      default: null,
    },
    pdf: {
      type: String,
      default: null,
    },
    pdfText: {
      type: String,
      default: "",
    },
    imagePosition: {
      type: String,
      enum: ["top", "middle", "bottom"],
      default: "top",
    },
    published: {
      type: Boolean,
      default: true,
    },
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

// Custom validation: at least one of image or pdf must be present
NewsletterSchema.pre("validate", function (next) {
  if (!this.image && !this.pdf) {
    this.invalidate("image", "Either image or PDF is required.");
    this.invalidate("pdf", "Either image or PDF is required.");
  }
  next();
});

const Newsletter = mongoose.model("Newsletter", NewsletterSchema);

export default Newsletter;
