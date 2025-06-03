import express from 'express'
import cors from 'cors'
import 'dotenv/config' // after this installation we will get support of .env file
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App Config
const app = express(); //Instance of express
const port = process.env.PORT || 4000 // if port no is available in .env then it  will run  in it at  process.env.PORT or it will run at PORT No - 4000

connectDB() // From config/mongodb.js
connectCloudinary(); // From config/cloudinary.js

//middlewares
app.use(express.json()) // Whatever request we will get that will passed using json
app.use(cors()) // We can access backend from any ID/IP


//Api endpoints
app.use('/api/user',userRouter)

app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})


app.listen(port,()=>{
    console.log('Server started on PORT : '+ port )
})