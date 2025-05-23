
import  nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
function createTransporter(config) {
  const transporter = nodemailer.createTransport(config);
  return transporter;
}
let configurations = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
};

const sendMail = async (messageoption) => {
  const transporter = await createTransporter(configurations);
  await transporter.verify();
   transporter.sendMail(messageoption, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log(info.response);
  });
};

export default sendMail;


