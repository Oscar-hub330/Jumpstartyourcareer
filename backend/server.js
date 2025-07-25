import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import subscriberRoutes from "./routes/subscribers.js";
import newsletterRoutes from "./routes/newsletterRoutes.js"; // ✅ NEW
import blogRoutes from "./routes/blogRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Needed to handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === Ensure uploads folder exists ===
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ Created uploads directory");
} else {
  console.log("ℹ️ Uploads directory already exists");
}

// MongoDB connection
mongoose.connect(
  "mongodb+srv://madalaneoscar50:Oscar%402002@jumpstartdata-cluster.rlwnwbg.mongodb.net/?retryWrites=true&w=majority&appName=jumpstartdata-cluster",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Jumpstart_your_Career",
  }
).then(() => {
  console.log("✅ Connected to MongoDB Atlas");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Routes
app.use("/api/subscribe", subscriberRoutes);
app.use("/api/newsletters", newsletterRoutes); // ✅ NEW
app.use("/api/blogs", blogRoutes);
// Serve uploaded PDFs statically
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ✅ NEW
// Port
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
