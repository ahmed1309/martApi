
// const mongoose = require('mongoose');
// const validator = require('email-validator');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;


// const productSchema = new mongoose.Schema({
//     brand:{
//         type: String,
//         required: true
//     },
//     name:{
//         type: String,
//         required: true,
//         validate: {
//             validator: async function (name) {
//                 const count = await product.find({ name: name, brand: this.brand }).count();
//                 return count === 0;
//             },
//             message: props => `${props.value} already exists for the given brand`
//         }

//     },
//     price: {
//         type: Number,
//         required: true
//     },    
//     itemqty: {
//         type: Number,
//         required: true
//     },
//     addedAt:{
//         type: Date,
//         default: ()=> Date.now(),
//     },
//     updatedAt: Date,
//     description: String
// });

// productSchema.pre('save', function(next){
//     this.updatedAt = Date.now();
//     next();
// });


// const usersSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         minLength:13,
//         required: true,
//         lowercase: true,
//         unique: true,
//         validate:{
//             validator: email => validator.validate(email),
//             message: email => `${email.value} is not a valid emial`
//         }
//     },
//     password:{
//         required: true,
//         type: String,
//     },
//     dateOfBirth: {
//         type: Date,
//         required: true
//     },
//     addedAt:{
//         type: Date,
//         default: ()=> Date.now(),
//     },
//     updatedAt: Date,
// });

// usersSchema.methods.hashAndSavePass = async function(){
//     const salt = await bcrypt.genSalt(saltRounds)
//     const hash = await bcrypt.hash(this.password, salt)
//     this.password = hash
// }

// usersSchema.pre('save', function(next){
//     this.updatedAt = Date.now();
//     next(); 
// });



// const user = mongoose.model('user', usersSchema);
// // const product = mongoose.model('product', productSchema);





// module.exports = {
//     // product: product,
//     user: user,
//   };

