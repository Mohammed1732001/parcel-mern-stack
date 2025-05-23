import conectDB from "../DB/conniction.js"
import corn from "node-cron"
import sendWelcomeEmail from "../utils/EmailService/welcomEmail.js"
import sendParcelPandingEmail from "../utils/EmailService/pandingParcel.js"
import SendParcelDeliveredEmail from "../utils/EmailService/diliverdParcel.js"

const initApp = (express, app) => {

    app.use(express.json())

        const run = () => {
        corn.schedule("* * * * * *", async () => {
            sendWelcomeEmail()
            sendParcelPandingEmail()
            SendParcelDeliveredEmail()
            console.log("running a task every minute");
        })
    }

    run()







    // connect DB
    conectDB()


}


export default initApp