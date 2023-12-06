const express = require('express');
const route = express.Router();
// const passport = require('../auth/passport');



const userController = require('../controller/userController')
const productController = require('../controller/productController')
const orderController = require('../controller/orderController');



route.get('/api/products', productController.read);
route.get('/api/products/find', productController.find);
route.post('/api/products', productController.create);
route.put('/api/products/:id', productController.update);
route.delete('/api/products/:id', productController.delete);




route.post('/api/signup', userController.createUser);
// route.post('/api/signin', userController.signIN);
route.post('/', userController.signIN);
route.put('/api/user/:id', userController.updateUser);
route.delete('/api/user/:id', userController.delete);
route.get('/api/signout', userController.signOut);





route.post('/api/order', orderController.createOrder);
route.put('/api/order/status/:id', orderController.updateOrder);
route.get('/api/cart',userController.isLoggedIn, orderController.readCart);
route.get('/api/orderhistory',userController.isLoggedIn, orderController.readOrderHistory);
route.post('/api/addtocart',userController.isLoggedIn, orderController.addToCart);



route.post('/api/rateproduct',userController.isLoggedIn, productController.rateProduct);
route.get('/api/rating/:id', productController.fetchProductReviews);







module.exports = route