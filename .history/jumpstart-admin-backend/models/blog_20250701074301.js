const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String }, // for uploaded image URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
