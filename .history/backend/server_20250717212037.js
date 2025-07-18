import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import subscriberRoutes from "./routes/subscribers.js";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://madalaneoscar50:Oscar@2002@jumpstartdata-cluster.rlwnwbg.mongodb.net/?retryWrites=true&w=majority&appName=jumpstartdata-cluster",
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

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
