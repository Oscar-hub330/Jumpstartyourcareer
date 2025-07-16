const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  title: String,
  content: String,
  images: [
    {
      url: String,
      filename: String,
    },
  ],
});

const newsletterSchema = new mongoose.Schema(
  {
    templateIndex: {
      type: Number,
      required: true,
    },
    sections: [sectionSchema],
    pdfUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Newsletter", newsletterSchema);
