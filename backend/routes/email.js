/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import { sendEmail } from "./utils/sendEmail.js";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    await sendEmail({ to, subject, text, html });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send email", error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
