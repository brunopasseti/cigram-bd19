
const express = require('express')
const cors = require('express-cors')
const bodyparser = require('body-parser')
const { Client } = require('pg')

const user = require("./functions/user.js");


const app = express();
const port = 3333;
const mountRoutes = require('./routes')

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
mountRoutes(app)


app.listen(port, () => console.log(`Starting server on port ${port}`));

