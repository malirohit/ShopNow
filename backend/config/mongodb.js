import mongoose from "mongoose";

const connectDB = async ()=>{

    // Whenever the mongodb connection will get established this function will get run
    mongoose.connection.on('connected',()=>{
         console.log("DB Connected");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)

}

export default connectDB;