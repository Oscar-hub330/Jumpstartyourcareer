import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import subscriberRoutes from "./routes/subscribers.js";


// Load environment variables from .env (optional)
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://madalaneoscar:1z9aa9ACZPHrCG7H@jumpstart-cluster.whk58b0.mongodb.net/jumpstartDB?retryWrites=true&w=majority&appName=jumpstart-cluster",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Mount Routes
app.use("/api/subscribers", subscriberRoutes);

// Port
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
