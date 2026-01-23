import mongoose from "mongoose";

const connectDB = async () =>{
    const url = process.env.MONGO_URI
    try{
        await mongoose.connect(url);
        console.log("MongoDB connected ✅")
    } catch(error){
        console.log("DB Connection error : ", error);
        process.exit(1)
    }
} 

export default connectDB;