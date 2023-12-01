
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const  User = require('../model/userModel');

const localStrat = new LocalStrategy({ usernameField: 'email' },
async (email, password, done) => {
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    const verified = await user.verifyPassword(password);

    if (!verified) {
      return done(null, false, { message: 'Incorrect  email or password.' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}
);

  


  // Serialize user to the session
  passport.serializeUser((user, done) => {
    console.log("serializeeee");
    done(null, user.id);
  });
  
  // Deserialize user from the session
  passport.deserializeUser((id, done) => {
    console.log("DESERIALIZEEE");
    User.findById(id)
    .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, null);
      });
  });



module.exports = localStrat;
