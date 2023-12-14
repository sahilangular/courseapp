import { createTransport } from "nodemailer";

const sendEmail = async(options:any) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "sahildalvi738@gmail.com",
      pass: "cnilikwzigkffwbe",
    },
  });

  const mailOptions={
    from: options.from,
    to:options.to,
    subject: options.subject,
    text: options.message,
  }

  await transporter.sendMail(mailOptions)
};

export default sendEmail;
