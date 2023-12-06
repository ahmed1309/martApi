const Product = require('../model/productModel');
const { ObjectId } = require('mongodb');

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Contetnt can not be empty' })
        return;
    }
    const product = new Product({
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        itemqty: req.body.itemqty,
        description: req.body.description
    });
    try {
        await product.save();
        res.send('saved successfuly');
    } catch (error) {
            res.status(500).send({
            message: error.message || 'Could not save the product'
        });    
    }
}

exports.read = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Product.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Product not found with ID: ${id}` });
                }
                else {
                    res.status(200).send(data);
                }
            })
            .catch(err => {
                res.status(500).send(err);
            });

    }
    else{
        const page = req.query.pageNo || 0;
        const productsPerPage = req.query.productsPerPage || 3;
        Product.find()
        .sort({_id:1})
        .skip(page*productsPerPage)
        .limit(productsPerPage*1)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
}

exports.find = (req, res) => {
        const id = req.query.productTitle;
        Product.find({name: new RegExp(id,'i')})
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Product not found with name: ${id}` });
                }
                else {
                    res.status(200).send(data);
                }
            })
            .catch(err => {
                res.status(500).send(err);
            });
}

exports.update = async(req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Contetnt can not be empty' })
        return;
    }

    const id = req.params.id;
    const product = await Product.findOne({_id: id});
    if(!product){
        res.status(404).send({Message: `Product with ID:${id} is not found`});
        return;
    }
    product.name = req.body.name ?? product.name;
    product.itemqty = req.body.itemqty ?? product.itemqty;
    product.brand = req.body.brand ?? product.brand;
    product.price = req.body.price ?? product.price;
    product.description = req.body.description ?? product.description;
    try {
        await product.save();
        res.send({message: 'updated successfuly'});
    } catch (error) {
        res.send(error);
    }
}



exports.delete = (req, res) => {

    const id = req.params.id;
    Product.findByIdAndDelete(id)
        .then(data => {
            res.status(400).send({ message: 'Deleted successfuly' });
        })
        .catch(err => {
            res.status(500).send(err);
        });
}




exports.rateProduct = async (req, res)=> {
    if(!req.body){
        res.send({Message: 'Content can not be empty', success: false});
        return;
    }
    const reviewDetails = {
        userId: req.user.id,
        userComment: req.body.userComment,
        productRating: req.body.productRating
    }

    try {
        const product = await Product.findOne({
            _id: req.body.productId
        });
        const existingReview = product.productReviews.find(element=>
            element.userId.equals(new ObjectId(req.user.id))
        );

        if (existingReview) {
            existingReview.userComment = req.body.userComment;
            existingReview.productRating = req.body.productRating;
            await product.save();
            product.updateRating();
            res.status(200).send({message: 'Review updated successfuly'});
        }
        else{
            product.productReviews.push(reviewDetails);
            await product.save();
            product.updateRating();
            res.status(200).send({message: 'Review added successfuly'});
        }
    } catch (error) {
        res.status(400).send({ Error: `${error}`, success: false });
    }
}

exports.fetchProductReviews = async (req, res)=> {

    try {
        const product = await Product.findOne({ _id: req.params.id })
        .populate({
        path: 'productReviews',
        populate: {
            path: 'userId',
            model: 'user',
            select: 'name',
        },
        });
    
    // Extracting the product reviews with user names
    const updatedProductReviews = product.productReviews.map(review => ({
        userName: review.userId.name,
        userComment: review.userComment,
        productRating: review.productRating,
        _id: review._id,
    }));
    productAverageRating = product.productAverageRating;
    const response = {
        Reviews: updatedProductReviews,
        AverageRating: productAverageRating,
      };
    // Sending the response with user names
    res.status(200).json(response);
  
    } catch (error) {
        res.status(400).send({ Error: `${error}`, success: false });
    }
}



