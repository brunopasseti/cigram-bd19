const Router = require('express-promise-router')
const db = require('../db')
const uuidv1 = require("uuid/v1")

const router = new Router()

module.exports = router

router.post('/createuser', async  (req, res) => {
    user = req.body;
    command = "INSERT INTO usuario (ID, email, username, senha, nomereal, biografia, privacidade) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    values = [uuidv1(), user.email, user.username, user.senha, user.nomereal, user.biografia, user.privacidade];

    await db.query(command, values).then(() => res.send("User created")).catch((err) => {
        res.send(`Error on creating users`);
    });
})