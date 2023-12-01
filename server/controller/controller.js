// var collections = require('../model/model');

/////////////////////products
// exports.create = (req, res) => {
//     if (!req.body) {
//         res.status(400).send({ message: 'Contetnt can not be empty' })
//         return;
//     }
//     const product = new collections.product({
//         name: req.body.name,
//         brand: req.body.brand,
//         price: req.body.price,
//         itemqty: req.body.itemqty,
//         description: req.body.description
//     });
//     product
//         .save(product)
//         .then(data => {
//             res.send('saved successfuly');
//             // res.redirect('/add-user');
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || 'Could not save the product'
//             });
//         });
// }

// exports.read = (req, res) => {
//     if (req.query.id) {
//         const id = req.query.id;
//         collections.product.findById(id)
//             .then(data => {
//                 if (!data) {
//                     res.status(404).send({ message: `Product not found with ID: ${id}` });
//                 }
//                 else {
//                     res.status(400).send(data);
//                 }
//             })
//             .catch(err => {
//                 res.status(500).send(err);
//             });

//     }
//     else {
//         collections.product.find()
//             .then(data => {
//                 res.status(400).send(data);
//             })
//             .catch(err => {
//                 res.status(500).send(err);
//             });
//     }
// }

// exports.find = (req, res) => {
//         const id = req.query.productTitle;
//         collections.product.find({name: new RegExp(id,'i')})
//             .then(data => {
//                 if (!data) {
//                     res.status(404).send({ message: `Product not found with name: ${id}` });
//                 }
//                 else {
//                     res.status(400).send(data);
//                 }
//             })
//             .catch(err => {
//                 res.status(500).send(err);
//             });
// }

// exports.update = (req, res) => {
//     if (!req.body) {
//         res.status(400).send({ message: 'Contetnt can not be empty' })
//         return;
//     }

//     const id = req.params.id;
//     collections.product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//         .then(data => {
//             res.status(400).send({ message: 'Data updated successfuly' });
//         })
//         .catch(err => {
//             res.status(500).send(err);
//         });
// }

// exports.delete = (req, res) => {

//     const id = req.params.id;
//     collections.product.findByIdAndDelete(id)
//         .then(data => {
//             res.status(400).send({ message: 'Deleted successfuly' });
//         })
//         .catch(err => {
//             res.status(500).send(err);
//         });
// }



//////////////////////users
// exports.createUser = async (req, res) => {
//     if (!req.body) {
//         res.status(400).send({ message: 'Contetnt can not be empty' })
//         return;
//     }
//     const user = new collections.user({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         dateOfBirth: req.body.dateOfBirth
//     });

//     await user.hashAndSavePass();

//     try {
//         const data = await user.save()
//         res.send('saved successfuly');
        
//     } catch (error) {
//         res.status(500).send({
//             message: error.message || 'Could not save the user'
//         });      
//     }
// }

// exports.updateUser = async (req, res)=>{
//     if(!req.body){
//         res.status(400).send({message:'Contetnt can not be empty'})
//         return;
//     }
//     const id = req.params.id;

//     const user = await collections.user.findOne({_id: id});
//     user.name = req.body.name ?? user.name;
//     user.email = req.body.email ?? user.email;
//     user.password = req.body.password ?? user.password;
//     user.dateOfBirth = req.body.dateOfBirth ?? user.dateOfBirth;
//     await user.hashAndSavePass();
//     try {
//         await user.save();
//         res.send({message: 'updated successfuly'});
//     } catch (error) {
//         res.send(error);
//     }
// }

// exports.delete = (req, res)=>{

//     const id = req.params.id;
//     collections.user.findById(id).deleteOne()

  
//         .then(data =>{
//             console.log(data);
//             if(data.deleteCount > 0){
//                 res.status(200).send({message: 'Deleted successfuly'});
//             }
//             else{
//                 res.status(400).send({message: 'no rcd found'});
//             }
//         })
//         .catch(err=>{
//             res.status(500).send(err);
//         });
// }



// exports.read = (req, res)=>{
//     if(req.query.id){  
//         const id =  req.query.id;
//         collections.product.findById(id)
//             .then(data =>{
//                 if(!data){
//                     res.status(404).send({message: `Product not found with ID: ${id}`});
//                 }
//                 else{
//                     res.status(400).send(data);
//                 }
//             })
//             .catch(err=>{
//                 res.status(500).send(err);
//             });

//     }
//     else{    
//         collections.product.find()
//             .then(data =>{
//                 res.status(400).send(data);
//             })
//             .catch(err=>{
//                 res.status(500).send(err);
//             });
//     }
// }


