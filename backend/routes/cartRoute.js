import express from 'express'
import { addToCart,getUserCart,updateCart } from '../controllers/cartController.js'
import authUser from '../middleware/auth.js'

const cartRouter =express.Router()

// authUser is the middle ware it will get first run when the request will get hit
// And if it works-well or it is authorized then further process will takes place


// Now whenever anyone will hit the API endpoint then the token will be verified
// And using that token in the body we will get the user id
// Then in that req.body we will get the user id and we will use the other request body property 
// to update the product data in the users cart 
cartRouter.post('/get', authUser , getUserCart)
cartRouter.post('/add', authUser , addToCart)
cartRouter.post('/update', authUser , updateCart)

export default cartRouter