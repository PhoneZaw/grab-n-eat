import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendMail = (receiver: string, subject: string, text: string) => {
  var mailOptions = {
    from: {
      name: "GrabNEat",
      address: "support@gne.com",
    },
    to: [receiver],
    subject,
    html: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  console.log("Email sent to", receiver);
};
