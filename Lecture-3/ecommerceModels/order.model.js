import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    qunatity:{
        type:Number,
        required:true
    }
})


const orderSchema = new mongoose.Schema({

    orderPrice:{
        type:Number,
        required:true
    },
    customer:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    orderItems:{
        type:[orderItemSchema]
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["PENDING","CANCELLED","DELIVERED"],
        default:pendingW
    }


},{timestamps:true}) 

export const order = mongoose.model("order",orderSchema);
