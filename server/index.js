
const express = require('express')
const cors = require('express-cors')
const bodyparser = require('body-parser')
const { Client } = require('pg')
const sessions = require('express-session')
const cookieSession = require('cookie-session');

//teste de commit
const app = express();
const port = 3333;
const mountRoutes = require('./routes')

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use(sessions({secret:"foi",resave:false, saveUninitialized:false}));
mountRoutes(app)


app.listen(port, () => console.log(`Starting server on port ${port}`));

