
const passport = require('passport');
// const jwtStrat = require('./jwtStrategy');
const localStrat = require('./localStrategy');


passport.use(localStrat)


module.exports = passport;