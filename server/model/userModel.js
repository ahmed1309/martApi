
const mongoose = require('mongoose');
const validator = require('email-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passportLocalMongoose = require('passport-local-mongoose');




// // Email validation
// const validateEmail = {
//     validator: function (email) {
//         return validator.validate(email);
//     },
//     props: email => `${email.value} is not a valid email`
// };




const usersSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        minLength:13,
        required: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: email => validator.validate(email),
            message: email => `${email.value} is not a valid email`
        }
    },
    password:{
        required: true,
        type: String,
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    addedAt:{
        type: Date,
        default: ()=> Date.now(),
    },
    updatedAt: Date,
});

usersSchema.methods.hashAndSavePass = async function(){
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
}
usersSchema.methods.verifyPassword = function(password){
    try {
        return bcrypt.compareSync(password, this.password);
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
};

usersSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next(); 
});

usersSchema.plugin(passportLocalMongoose);

const user = mongoose.model('user', usersSchema);

module.exports =  mongoose.model('user', usersSchema);;


