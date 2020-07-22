require('dotenv').config();
const express =require('express')
const massive = require('massive');
const session = require('express-session');


const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,

app = express();

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }))

  massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db=>{
    app.set('db',db);
    console.log('db connected')
});







app.listen(SERVER_PORT, ()=> console.log(`Listening on port ${SERVER_PORT}`))