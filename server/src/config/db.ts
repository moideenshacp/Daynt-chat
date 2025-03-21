import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()
const connectDb = async()=>{
     try {
        mongoose.connect(process.env.MONGO_URI as string)
        console.log("Mongodb connected sucessfully")
     } catch (error) {
        console.log(error);
        console.log("Connection failed");
        
     }
}

export default connectDb