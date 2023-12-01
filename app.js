const express = require('express');
const dotEnv = require('dotenv');
const connectToDb = require('./server/database/dbConnection');
const passport = require('./server/auth/passport');
const session = require('express-session');
// const cors = require('cors')
const MongoStore = require('connect-mongo');



dotEnv.config({path: './config.env'})
const PORT = process.env.PORT || 8080

//initiating app
const app = express();


app.use((req,res,next)=>{
  console.log(`received req: ${req.method} ${req.url}`);
  // console.log(req);
  next()
})


const db = connectToDb()


//body parser middleware
app.use(express.urlencoded({ extended: true }));
// Set up session middleware
app.use(session({
  secret: process.env.MY_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongoUrl: process.env.DBLINK }),
  cookie: {
    maxAge: 1000*60*60, // one hour in milliseconds
    secure: false, // Set to true if your application is served over HTTPS
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());



app.use('/', require('./server/router/productsRouter'));


app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}` );
});









// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, session-id');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   next();
// });
// app.use(cors())