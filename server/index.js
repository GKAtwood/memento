require('dotenv').config();
const express =require('express')
const massive = require('massive');
const session = require('express-session');
const ctrl = require('./controller/controller');





const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,

app = express();

app.use(express.json());


massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
}).then(db=>{
  app.set('db',db);
  console.log('db connected')
});

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7 * 52

    }
  }))

app.get('/api/memento/users', ctrl.sessionCheck);
app.post('/api/memento/users/login', ctrl.loginUser)
app.post('/api/memento/users/create', ctrl.create)
app.delete('/api/memento/auth/logout', ctrl.logout)
app.put('/api.memento/users/update/:uid', ctrl.editUser) 

app.get('/api/memento/entries/get' , ctrl.getAll)
app.post('/api/memento/entries/create', ctrl.createEntry)
app.delete('/api/memento/entries/delete', ctrl.delete)
app.get('/api/memento/entries/get/:eid', ctrl.getOne);






app.listen(SERVER_PORT, ()=> console.log(`Listening on port ${SERVER_PORT}`))