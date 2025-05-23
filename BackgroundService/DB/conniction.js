import mongoose from "mongoose";



const conectDB = async () => {
    return await mongoose.connect(process.env.DB_URL).then(result => {
         console.log(`DB CONNECTED ...............`);
        //  console.log(result);
         
    }).catch(err => {
        console.log(`fail connect ...............${err}`);
    })
}

export default conectDB