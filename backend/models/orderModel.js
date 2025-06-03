import mongoose from 'mongoose'


const orderSchema = new mongoose.Schema({
    userId : {type:String , required:true},
    items : {type:Array,required:true},
    amount : {type:Number,required:true},
    address : {type:Object , required:true},
    // Default order is placed i.e whenever some will place order then so to update status to be order placed...
    status : {type:String , required:true , default:'Order Placed' },
    paymentMethod : {type:String , required:true},
    payment : { type:Boolean , required: true , default:false },
    date : { type:Number ,required:true }
})

const orderModel = mongoose.models.order || mongoose.model('order',orderSchema)

export default orderModel;