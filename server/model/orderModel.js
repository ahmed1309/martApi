
const mongoose = require('mongoose');
// var userCollection = require('../model/userModel');
// var productsCollection = require('../model/productModel');




const productsIdSchema = new mongoose.Schema({
    product:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
    productQty:{
        type: Number,
        required: true,
    }
})



const ordersSchema = new mongoose.Schema({
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: true,
    },
    orderDetails:[productsIdSchema],
    status: {
        type: String,
        required: true
    },    
    addedAt:{
        type: Date,
        default: ()=> Date.now(),
    },
    currentBill: Number,
});

ordersSchema.methods.updatePrice= async(userID)=>{
    const currentOrder = await order.findOne({
        userId: userID,
        status: "Cart"
    })
    .populate({
        path: "orderDetails.product"
    })
    let totalPrice = 0;
    currentOrder?.orderDetails.forEach(element => {
        totalPrice += element.productQty * element.product.price;
    });
    currentOrder.currentBill = totalPrice;
    currentOrder.save();
}

const order = mongoose.model('order', ordersSchema);
module.exports = mongoose.model('order', ordersSchema);

