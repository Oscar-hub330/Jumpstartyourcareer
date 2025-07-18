/* eslint-env node */

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://madalaneoscar:1z9aa9ACZPHrCG7H@jumpstart-cluster.whk58b0.mongodb.net/jumpstartDB?retryWrites=true&w=majority&appName=jumpstart-cluster",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Schema and Model
const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
});
const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// Route to handle subscriptions
app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required." });

  try {
    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already subscribed." });
    }

    await Subscriber.create({ email });
    res.status(200).json({ message: "Successfully subscribed!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Start server
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
