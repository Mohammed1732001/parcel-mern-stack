ّimport ejs from "ejs";
import sendMail from "../EmailService/sendEmail.js";
import parcelModel from "../../DB/models/parcel.model.js";

const sendParcelEmail = async (parcel, emailAddress, subject, templateName) => {
  try {
    const data = await new Promise((resolve, reject) => {
      ejs.renderFile(
        `templates/${templateName}.ejs`,
        {
          sendername: parcel.sendername,
          from: parcel.from,
          to: parcel.to,
          recipientname: parcel.recipientName,
          cost: parcel.cost,
          weight: parcel.weight,
          note: parcel.note,
        },
        (err, renderedData) => {
          if (err) reject(err);
          resolve(renderedData);
        }
      );
    });

    const messageOption = {
      from: process.env.EMAIL,
      to: emailAddress,
      subject: subject,
      html: data,
    };

    await sendMail(messageOption);
    console.log(`Email sent successfully to: ${emailAddress}`);
  } catch (error) {
    console.error(`Error sending email to ${emailAddress}:`, error);
  }
};

const SendParcelDeliveredEmail = async () => {
  const parcels = await parcelModel.find({ status: 2 });

  if (parcels.length > 0) {
    for (let parcel of parcels) {
      await sendParcelEmail(
        parcel,
        parcel.senderEmail,
        "Your parcel has been delivered",
        "deliveredparcel"
      );

      await sendParcelEmail(
        parcel,
        parcel.recipientEmail,
        "Your parcel has been delivered",
        "deliveredparcel"
      );

      await parcelModel.findByIdAndUpdate(parcel._id, { $set: { status: 3 } });
    }
  }
};

export default SendParcelDeliveredEmail;
