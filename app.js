// const express = require('express');
// const dotEnv = require('dotenv');
// const connectToDb = require('./server/database/dbConnection');
// const passport = require('./server/auth/passport');
// const session = require('express-session');
// const cors = require('cors')
// const MongoStore = require('connect-mongo');



// dotEnv.config({path: './config.env'})
// const PORT = process.env.PORT || 8080

// //initiating app
// const app = express();
// app.use(cors({
//   origin: 'http://localhost:4200',
//   credentials: true,
//   exposedHeaders: 'Set-Cookie'
//   // exposedHeaders: ['Set-Cookie'],
//   // methods: 'GET,HEAD,PUT,POST,DELETE',
// }))
// // Enable CORS for all routes
// // app.use((req, res, next) => {
// //   res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // or specify your origin
// //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Set-Cookie');
// //   next();
// // });

// app.use((req,res,next)=>{
//   console.log(`received req: ${req.method} ${req.url}`);
//   // console.log(req);
//   next()
// })


// const db = connectToDb()


// //body parser middleware
// app.use(express.urlencoded({ extended: true }));
// // Set up session middleware
// app.use(session({
//   secret: process.env.MY_SECRET_KEY,
//   resave: false,
//   saveUninitialized: true,
//   store: new MongoStore({ mongoUrl: process.env.DBLINK }),
//   cookie: {
//     maxAge: 1000*60*60, // one hour in milliseconds
//     secure: false, // Set to true if your application is served over HTTPS
//     httpOnly: false
//   },
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(express.json());



// app.use('/', require('./server/router/productsRouter'));


// app.listen(PORT, ()=>{
//     console.log(`Server is running on http://localhost:${PORT}` );
// });

//////////////************************************************///////////////////////

const express = require('express');
const dotEnv = require('dotenv');
const connectToDb = require('./server/database/dbConnection');
const passport = require('./server/auth/passport');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo');

dotEnv.config({ path: './config.env' });
const PORT = process.env.PORT || 8080;

const app = express();

// Use cors middleware to enable cross-origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
    exposedHeaders: 'Set-Cookie',
  })
);

app.use((req, res, next) => {
  console.log(`received req: ${req.method} ${req.url}`);
  // console.log(req)
  next();
});

const db = connectToDb();

app.use(express.urlencoded({ extended: true }));

// Set up session middleware
app.use(
  session({
    secret: process.env.MY_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DBLINK }),
    cookie: {
      maxAge: 1000 * 60 * 60, // one hour in milliseconds
      secure: false, // Set to true if your application is served over HTTPS
      httpOnly: false, // If you need to access cookies via JavaScript, set this to false
      // sameSite: 'None', // Adjust based on your requirements
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use('/', require('./server/router/productsRouter'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





//////////////************************************************///////////////////////

// const express = require('express');
// const dotEnv = require('dotenv');
// const connectToDb = require('./server/database/dbConnection');
// const passport = require('./server/auth/passport');
// const session = require('express-session');
// const cors = require('cors');
// const MongoStore = require('connect-mongo');
// const https = require('https');
// const fs = require('fs');

// dotEnv.config({ path: './config.env' });
// const PORT = process.env.PORT || 8080;

// const app = express();

// // Use cors middleware to enable cross-origin resource sharing
// app.use(
//   cors({
//     origin: 'http://localhost:4200',
//     credentials: true,
//     exposedHeaders: 'Set-Cookie',
//   })
// );

// app.use((req, res, next) => {
//   console.log(`received req: ${req.method} ${req.url}`);
//   next();
// });

// const db = connectToDb();

// app.use(express.urlencoded({ extended: true }));

// // Set up session middleware
// app.use(
//   session({
//     secret: process.env.MY_SECRET_KEY,
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({ mongoUrl: process.env.DBLINK }),
//     cookie: {
//       maxAge: 1000 * 60 * 60, // one hour in milliseconds
//       secure: true, // Set to true if your application is served over HTTPS
//       httpOnly: false, // If you need to access cookies via JavaScript, set this to false
//       sameSite: 'None', // Set SameSite=None for cross-site cookies
//     },
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.json());

// app.use('/', require('./server/router/productsRouter'));

// // HTTPS configuration
// const privateKey = fs.readFileSync('./private-key.pem', 'utf8');
// const certificate = fs.readFileSync('./certificate.pem', 'utf8');
// const credentials = { key: privateKey, cert: certificate };

// const httpsServer = https.createServer(credentials, app);

// httpsServer.listen(PORT, () => {
//   console.log(`Server is running on https://localhost:${PORT}`);
// });
