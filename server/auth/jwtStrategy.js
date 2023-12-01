const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('../model/userModel');

const dotEnv = require('dotenv');
dotEnv.config({path: './config.env'})

// JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.MY_SECRET_KEY,
  };

passport.serializeUser((user, done) =>{
  console.log(user);
  done(null,user.id)
})


passport.serializeUser((id, done) =>{
  User.findById(id).then((id)=>{
    done(null,id)
  })
})


  
const jwtStrat = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    // Check if the user exists in the database
    // You need to implement this part according to your database schema
  //   const user = getUserFromDatabase(jwtPayload.sub);
      const user = User.findOne({_id: jwtPayload.sub})
      
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
      }
  
  });



module.exports = jwtStrat;
















// // Serialize user into the session
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });  

// // Deserialize user from the session
// passport.deserializeUser((id, done) => {
//     // Replace this with your own logic to fetch the user from the database
//     // const user = { id: 1, username: 'user' };
//     const user = User.findOne({_id: id})
//     done(null, user);
// });



