
const express = require('express');
const cors = require('express-cors');
const bodyparser = require('body-parser');
const sessions = require('express-session');
//teste de commit
const app = express();
const port = 3333;
const mountRoutes = require('./routes')

app.use(cors({
    credentials: true, // enable set cookie
    origin: /localhost/
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use(sessions({ 
    secret: "foi",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
 }));

app.use( (req, res, next) => {
    res.set("connection", "keep-alive");
    return next();
});


mountRoutes(app)


app.listen(port, () => console.log(`Starting server on port ${port}`));

