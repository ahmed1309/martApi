const Order = require('../model/orderModel');
const User = require('../model/userModel');
const { ObjectId } = require('mongodb');
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

/////////////////////////////////////////////

exports.readCart = async (req, res)=> {
    try {
        const orders = await Order.findOne({
            userId: req.user.id,
            status: "Cart"
        })
        .populate({
            path: "orderDetails.product"
        })
        res.status(200).send(orders)
    } catch (error) {
        res.status(400).send({Error:`${error}`, success: false});
    }
}


exports.readOrderHistory = async (req, res)=> {
    try {
        const orders = await Order.findOne({
            userId: req.user.id,
            status: "Check Out"
        })
        .populate({
            path: "orderDetails.product"
        })
        res.status(200).send(orders)
    } catch (error) {
        res.status(400).send({Error:`${error}`, success: false});
    }
}


exports.addToCart = async (req, res)=> {
    if(!req.body){
        res.send({Message: 'Content can not be empty', success: false});
        return;
    }
    const objectDetail = {
        product: req.body.product,
        productQty: req.body.productQty
    }
    const order = new Order({
        userId: req.user.id,
        orderDetails: [objectDetail],
        status: "Cart",
    })

    try {
        const existingOrder = await Order.findOne({
            userId: req.user.id,
            status: "Cart"
        });

        if (!existingOrder) {
            console.log("ExistingOrder no");
            await order.save();
            await order.updatePrice(req.user.id);
            res.status(200).send({ message: 'Created cart successfully', success: true });
        } else {
            // If an existing cart is found, push the objectDetail into the orderDetails array
            console.log("ExistingOrder yes");
            
            const existingItem = existingOrder.orderDetails.find(item =>
                item.product.equals(new ObjectId(req.body.product))
            );
            console.log("existingOrder: ", existingOrder);
            console.log("existingItem.product: ", existingItem);
            console.log("req.body.product: ",new ObjectId(req.body.product));
            if(existingItem) {
                console.log("ExistingItem Yes");
                // If product is already in the cart, increase the productQty by req.body.productQty
                existingItem.productQty += parseInt(req.body.productQty, 10);
            } else {
                console.log("ExistingItem no");
                existingOrder.orderDetails.push(objectDetail);
            }

            await existingOrder.save();
            await existingOrder.updatePrice(req.user.id);
            res.status(200).send({ message: 'Added to cart successfully', success: true });
        }
    } catch (error) {
        res.status(400).send({ Error: `${error}`, success: false });
    }
}
