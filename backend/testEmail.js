/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();

import { sendEmail } from "./utils/sendEmail.js";

const testEmail = async () => {
  try {
    const info = await sendEmail({
      to: "Oscar.Madalane@jumpstartyourcareer.org.za",
      subject: "Test Email from Jumpstart Backend",
      text: "Hello! This is a plain text test email from Node.js script.",
      html: "<h1>Hello!</h1><p>This is a <strong>test email</strong> sent from Node.js using your backend setup.</p>",
    });

    console.log("✅ Email sent successfully!");
    console.log(info);
    process.exit(0); // exit script
  } catch (err) {
    console.error("❌ Failed to send email:", err.message);
    process.exit(1); // exit script with error
  }
};

testEmail();
