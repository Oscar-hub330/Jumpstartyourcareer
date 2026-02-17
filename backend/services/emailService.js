/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter at startup
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP transporter failed:", err);
  } else {
    console.log("✅ SMTP transporter ready");
  }
});

/**
 * Send a reply email to a user
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} text - email body (plain text)
 */
export const sendReply = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"Jumpstart Website" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    });
    console.log(`📧 Reply sent to ${to}`);
  } catch (err) {
    console.error("❌ Failed to send email:", err);
    throw err; // propagate error to backend route
  }
};
