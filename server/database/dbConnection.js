const mongoose = require('mongoose');

const connectToDb = async()=>{
    const connect =  await mongoose.connect(process.env.DBLINK);
    const db = mongoose.connection;
    // mongoose.set('useCreateIndex', true);
    console.log('coented to db');
    return db;
}

module.exports = connectToDb;