import mongoose from "mongoose";

/*
  SINGLE SOURCE OF TRUTH
  One model
  One schema
  One collection
*/

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    subject: {
      type: String,
      default: "",
      trim: true,
      maxlength: 200,
    },

    message: {
      type: String,
      required: true,
      maxlength: 2000,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    isReplied: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/* performance indexes */
contactMessageSchema.index({ createdAt: -1 });
contactMessageSchema.index({ email: 1 });

export default mongoose.model(
  "ContactMessage",
  contactMessageSchema,
  "contacts" // exact Mongo collection
);
