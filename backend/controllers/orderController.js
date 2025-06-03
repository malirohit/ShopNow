// import { currency } from '../../admin/src/App.jsx'

//import  verify  from 'jsonwebtoken'

import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'
import razorpay from 'razorpay'
// Global Vairables
const currency = 'usd'
const deliveryCharge = 10

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID ,
    key_secret : process.env.RAZORPAY_KEY_SECRET 

})


const placeOrder = async (req,res) =>{

    try {
        
        const {userId,items,amount,address} = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'COD',
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save() // Save in DB

        // Once order will place we will clear the cart data for this user
        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placed"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }

}

const placeOrderStripe = async (req,res) =>{

    try {
       
        const {userId,items,amount,address} = req.body

        // origin URL from where user initiated the payment
        const { origin } = req.headers
        // So whenever we create any request then in header this origin property will be created where it will include frontend URL
        // Suppose we are placing payment from this website the origin will be localhost:5173

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save() // Save in DB


        //After placing the order we will create line items using that we execute stripe payment
        const line_items = items.map( (item)=>({
            price_data : {
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }) )


          line_items.push({
            price_data : {
                currency:currency,
                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount:deliveryCharge*100
            },
            quantity:1
          })

          // 12:21:31
          // Using this line items we can create the new sessions
          const session = await stripe.checkout.sessions.create({

            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`, // if payment is successful it will direct to this URL
            cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`, // ELSE to this URL 

            line_items,
            mode:'payment',


          })
          // here we created the sesssion so whenever the session will be created in this session there will be url and using that URL we will send the users to paymentgate way

          res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
     

}

// Verify Stripe
const verifyStripe = async (req,res) => {


  

    
    try{

        const {orderId,success,userId} = req.body

        // If success is true
        //  then we will change the payment status for this order id.
        if(success === "true" ) { // Successful Payment
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}}) // Clear the cartData
            res.json({success:true,message:"Payment Successful" });
        }
        else { // If payment is failed

            // If payment gets fail then we will find the order and delete it
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:true,message:"Payment Failed" });
        }

    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const placeOrderRazorpay = async (req,res) => {
    
    try {
        

        const {userId,items,amount,address} = req.body

      

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Razorpay",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save() // Save in DB

        const options = {
            amount : amount*100,
            currency : currency.toUpperCase(),
            receipt : newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error,order)=>{
            

            if(error){
                console.log(error)
                return res.json({success:false,message:error})
                
            }

            res.json({success:true,order})

        } )

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})        
    }
}

// Verify Razorpay
const verifyRazorpay = async (req,res) => {

    try{

        const {userId,razorpay_order_id } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        // 13:09:43
        // console.log(orderInfo); not checked working or not

        if(orderInfo.status === 'paid' ) {
            //orderId is saved in receipt
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
             await userModel.findByIdAndUpdate(userId,{cartData:{}}) // Clear the cartData
             res.json({success:true,message:"Payment Successful"})
        }else{
            res.json({success:false,message:"Payment Failed"})
        }

        
       

    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


// All orders data for admin panel
const allOrders = async (req,res) => {
   
    try {
        
    // Here i want all orders from all users so just use empty object - {} in find 
        const orders = await orderModel.find({}) 
        res.json({success:true,orders})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
    
}

// User order data for frontend
const userOrders = async (req,res) => {
    try {
        
        const {userId} = req.body

        // Orders of particular user
        const orders = await orderModel.find({userId})

        res.json({success:true,orders}) // Send orders as a response

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


// Update order status - Only done by Admin (From Admin Pannel)
const updateStatus = async (req,res) => {

    try {
        
        const {orderId , status } = req.body

        await orderModel.findByIdAndUpdate(orderId , {status} )

        res.json({success:true,message:'Status Updated' })

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
    
}


export {  verifyRazorpay , verifyStripe , placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus}

// Now using this function we will create the routes