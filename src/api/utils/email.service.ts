import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "ibragimovbehruz822@gmail.com",
    pass: "meifndcurozftplp", 
  },
  secure: true,
});

export const send = async (mailData: Object) => {
  const data = await transporter.sendMail(mailData);

  return { message: "Success", data: data };
};
