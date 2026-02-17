import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    image: { type: String },
    imagePosition: {
      type: String,
      enum: ["left", "right"],
      default: "left",
    },
    textAlign: {
      type: String,
      enum: ["left", "right", "center", "justify"],
      default: "left",
    },
  },
  { _id: false }
);

const newsletterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    coverImage: { type: String },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    sections: [sectionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Newsletter", newsletterSchema);
