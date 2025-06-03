import express from 'express'
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus, verifyStripe, verifyRazorpay} from '../controllers/orderController.js'

import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()


// Admin Features
orderRouter.post('/list',adminAuth,allOrders) // adminAuth is middleware .
// When we hit the api of /list then we have to first provide admin token then only we will get the all orders
// Similary for all
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

//User Feature
orderRouter.post('/userorders',authUser,userOrders)

// Verify Payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default orderRouter ;