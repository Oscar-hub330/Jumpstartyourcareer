/* eslint-disable no-undef */
/* utils/sendEmail.js */
import transporter from "./mailer.js";

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Jumpstart Website" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};
