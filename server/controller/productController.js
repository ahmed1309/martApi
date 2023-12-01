const Product = require('../model/productModel');

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
                    res.status(400).send(data);
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


