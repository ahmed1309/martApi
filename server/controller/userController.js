const passport = require('../auth/passport');
const User = require('../model/userModel');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Contetnt can not be empty' })
        return;
    }
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dateOfBirth: req.body.dateOfBirth
    });

    await user.hashAndSavePass();

    try {
        const data = await user.save()
        res.status(200).send({message: 'User created successfuly'});
        
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Could not save the user'
        });      
    }

    // User.register(
    //     new User({ 
    //         username: req.body.username,
    //         name: req.body.name,
    //         email: req.body.email,
    //         dateOfBirth: req.body.dateOfBirth
    //     }), req.body.password, function (err, msg) {
    //       if (err) {
    //         res.send(err);
    //       } else {
    //         res.status(200).send({ message: `User resgistered successfuly` });
    //       }
    //     }
    //   );
}

exports.updateUser = async (req, res)=>{
    if(!req.body){
        res.status(400).send({message:'Contetnt can not be empty'})
        return;
    }
    const id = req.params.id;

    const user = await User.findOne({_id: id});
    user.name = req.body.name ?? user.name;
    user.email = req.body.email ?? user.email;
    user.password = req.body.password ?? user.password;
    user.dateOfBirth = req.body.dateOfBirth ?? user.dateOfBirth;
    await user.hashAndSavePass();
    try {
        await user.save();
        res.send({message: 'updated successfuly'});
    } catch (error) {  
        if (error.code === 11000) {
        // Custom error message for duplicate key violation
        res.send({message: "The email address is already in use. Please use a different email.", success: false});
        
      } else {
        // Handle other types of errors
        res.send("An unexpected error occurred:");
      }
    }
}

exports.delete = (req, res)=>{

    const id = req.params.id;
    User.findById(id).deleteOne()

  
        .then(data =>{
            if(data.deletedCount > 0){
                res.status(200).send({message: 'Deleted successfuly'});
            }
            else{
                res.status(400).send({message: 'no rcd found'});
            }
        })
        .catch(err=>{
            res.status(500).send(err);
        });
}



exports.signIN = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
        return res.status(500).json({ message: 'Internal server error' });
        }

        if (!user) {
        return res.status(401).json({ message: info.message });
        }

        req.logIn(user, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Customize the success response if needed
        return res.status(200).json({ message: 'Login successful', user: user });
        });
    })(req, res, next);
}

exports.signOut = (req, res) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.send({message: 'Logged Out'});
    });
}
exports.isLoggedIn = (req, res, next)=>{
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send({message: 'Unauthorized, please login'});
}






// exports.signIN = async (req, res) => {
//     const user = await User.findOne({email: req.body.email});
//     if(user){
//         bcrypt.compare(req.body.password, user.password, function(err, success) {    
//             if (success) {
//             const token = jwt.sign({ sub: user.id, userEmail: user.email }, process.env.MY_SECRET_KEY, { expiresIn: '1h' });
//             res.send({ token });
//           } else {
//             res.status(401).json({ message: 'Email or password is in correct' });
//           }
//         });
//     }
//     else{
//         res.status(404).send({message:`User with email:'${req.body.email}' does not exist`, success: false})
//     }
// }


// exports.updatePassword = async(req, res)=>{
    
// }
