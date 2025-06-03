import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {type:String , required:true},
    email : {type:String , required:true , unique:true},
    password : {type:String , required:true},
    cartData : {type:Object , default:{}}
}, {minimize:false} )

// Whenever we will create the user using moongose then this cartData will be unavailable
// cartData : {type:Object , default:{}} when new user will get created it will have null cartData . 
// Also mongoose neglactes property where we have empty object .
// When we create a data using empty object that data will not get displayed in mongodb
// We want to create the cart data also when user is created therefore we use minimize:false
// So that we can create the user without cart

const userModel = mongoose.models.user || mongoose.model('user',userSchema); //User = it is name
export default userModel