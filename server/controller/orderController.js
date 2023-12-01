const Order = require('../model/orderModel');
const User = require('../model/userModel');

exports.createOrder = async (req, res)=> {
    if(!req.body){
        res.send({Message: 'Content can not be empty', success: false});
        return;
    }
    if(! (await User.findOne({_id:req.body.userId}))){
        res.status(404).send({message: 'User not found', success: false});
        return
    }
    const order = new Order({
        userId: req.body.userId,
        orderDetails: req.body.orderDetails,
        status: req.body.status,
    })

    try {
        await order.save(order);
        res.status(200).send({message:'Order Created successfuly', success: true})
    } catch (error) {
        console.log('**************************');
        res.status(400).send(error);
    }
}


exports.updateOrder = async (req, res)=> {
    if(!req.body){
        res.send({Message: 'Content can not be empty', success: false});
        return;
    }

    try {
        const order = await Order.findOne({_id: req.params.id});
        order.status = req.body.status;
        await order.save(order);
        res.status(200).send({message:'Order Updated successfuly', success: true})
    } catch (error) {
        res.status(400).send({Error:`${error}`, success: false});
    }
}


exports.readOrders = async (req, res)=> {
    try {
        const orders = await Order.where("userId").equals(req.user.id).populate({
            path: "orderDetails.product",
        })
        res.status(200).send(orders)
    } catch (error) {
        res.status(400).send({Error:`${error}`, success: false});
    }
}
