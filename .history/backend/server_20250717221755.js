import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import subscriberRoutes from "./routes/subscribers.js";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://madalaneoscar50:Oscar%402002@jumpstartdata-cluster.rlwnwbg.mongodb.net/?retryWrites=true&w=majority&appName=jumpstartdata-cluster",

  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Jumpstart_your_Career", // ✅ Must match your Atlas DB name
  }
).then(() => {
  console.log("✅ Connected to MongoDB Atlas");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
app.use("/api/subscribe", subscriberRoutes);
import newsletterRoutes from './routes/newsletter.js';
app.use('/api/newsletters', newsletterRoutes);

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
