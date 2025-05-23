import ejs from "ejs";
import sendMail from "../EmailService/sendEmail.js";
import parcelModel from "../../DB/models/parcel.model.js";

// الدالة لإرسال البريد الإلكتروني
const sendParcelPandingEmail = async () => {
    const parcels = await parcelModel.find({ status: 0 });

    if (parcels.length > 0) {
        for (let parcel of parcels) {
            try {
                // تحقق من البريد الإلكتروني للمستلم
                if (!parcel.senderEmail || !parcel.recipientEmail ) {
                    console.error(`Missing email for parcel ID: ${parcel._id}`);
                    continue; // تخطي الطرد إذا كان البريد الإلكتروني مفقودًا
                }

                // استخدام ejs.renderFile داخل Promise لجعلها متزامنة
                const data = await new Promise((resolve, reject) => {
                    ejs.renderFile(
                        "templates/pendingparcel.ejs",
                        {
                            sendername: parcel.senderName,
                            from: parcel.from,
                            to: parcel.to,
                            recipientname: parcel.recipientName,
                            cost: parcel.cost,
                            weight: parcel.weight,
                            note: parcel.note,
                        },
                        (err, renderedData) => {
                            if (err) reject(new Error(`EJS Rendering Error: ${err}`));
                            resolve(renderedData);
                        }
                    );
                });

                if (!process.env.EMAIL) {
                    console.error("Missing email sender address in environment variables.");
                    return;
                }

                const senderMessageOption = {
                    from: process.env.EMAIL,
                    to: parcel.senderEmail,
                    subject: "You've got a parcel",
                    html: data,
                };

                const recipientMessageOption = {
                    from: process.env.EMAIL,
                    to: parcel.recipientEmail,
                    subject: "You've got a parcel",
                    html: data,
                };

                if (parcel.status !== 0) {
                    console.log(`Parcel ID: ${parcel._id} has already been processed.`);
                    continue;
                }

                await sendMail(senderMessageOption);

                await sendMail(recipientMessageOption);

                const updatedParcel = await parcelModel.findByIdAndUpdate(parcel._id, { $set: { status: 1 } }, { new: true });
                if (!updatedParcel) {
                    console.error(`Failed to update status for parcel ID: ${parcel._id}`);
                } else {
                    console.log(`Parcel ID: ${parcel._id} status updated successfully.`);
                }

            } catch (error) {
                console.error(`Error processing parcel ID: ${parcel._id}`, error);
            }
        }
    }
};

export default sendParcelPandingEmail;
