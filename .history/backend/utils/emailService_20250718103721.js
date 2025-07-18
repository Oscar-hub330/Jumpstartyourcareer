import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendNewsletterEmail = async (subscribers, newsletter) => {
  try {
    const mailOptions = {
      from: `"Jumpstart Your Career" <${process.env.EMAIL_USER}>`,
      subject: `New Newsletter: ${newsletter.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #fea434;">New Newsletter Available!</h2>
          <p>We're excited to share our latest newsletter with you:</p>
          <h3>${newsletter.title}</h3>
          ${newsletter.description ? `<p>${newsletter.description}</p>` : ""}
          <div style="text-align: center; margin: 20px 0;">
            <a href="${process.env.BASE_URL}/api/newsletters/${newsletter._id}/download" 
               style="background-color: #fea434; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              Download Newsletter
            </a>
          </div>
          <p>Thank you for being part of our community!</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #777;">
            If you no longer wish to receive these emails, you can 
            <a href="${process.env.BASE_URL}/unsubscribe">unsubscribe here</a>.
          </p>
        </div>
      `,
    };

    // Send to all subscribers
    for (const subscriber of subscribers) {
      mailOptions.to = subscriber.email;
      await transporter.sendMail(mailOptions);
    }

    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};