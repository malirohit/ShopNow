// Models - used to store the data in database

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type : String , required:true },
    description : {type : String , required:true},
    price : {type : Number , required:true},
    image : {type : Array , required:true},
    category : {type : String , required:true},
    subCategory : {type : String , required:true},
    sizes : {type : Array , required:true},
    bestseller : {type:Boolean},
    date : {type : String , required:true}
})

// This project will run every time it will create new models. 
// But we want that our model should get create once
// If model is already available then use it otherwise create it
const productModel = mongoose.models.product || mongoose.model("product",productSchema) // product = it is name

export default productModel