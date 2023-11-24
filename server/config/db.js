import mongoose from "mongoose";
const connectdb = async ()=>
{
   const{connection} = await mongoose.connect(process.env.MONGO_URL);
   console.log(`mongo db is connected at : ${connection.host}`.cyan.underline.bold)
    
}

export default connectdb

