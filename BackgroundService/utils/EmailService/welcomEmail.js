import ejs from "ejs"
import sendMail from "../EmailService/sendEmail.js"
import CryptoJs from "crypto-js"
import userModel from "../../DB/models/user.model.js";

const sendWelcomeEmail = async () => {
  const users = await userModel.find({ status: 0 });

  if (users.length > 0) {
    for (let user of users) {
      const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.PASS);
      const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

      try {
        const emailContent = await new Promise((resolve, reject) => {
          ejs.renderFile(
            "templates/welcome.ejs",
            { fullname: user.fullName, password: originalPassword, email: user.email },
            (err, data) => {
              if (err) reject(err);
              resolve(data);
            }
          );
        });

        let messageOption = {
          from: process.env.EMAIL,
          to: user.email,
          subject: "Welcome to SendIT",
          html: emailContent,
        };

        await sendMail(messageOption);

        await userModel.findByIdAndUpdate(user._id, { $set: { status: 1 } });

        console.log(`Email sent successfully to: ${user.email}`);

      } catch (error) {
        console.log(`Error sending email to ${user.email}:`, error);
      }
    }
  }
}

export default sendWelcomeEmail;
