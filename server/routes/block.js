const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

module.exports = router

router.get('/b/:username', async (req, res) => {
    const username = req.params.username;
    const blocking = req.session.userId;
    if(!blocking) res.send("Not Logged");
    let query = "SELECT id FROM usuario WHERE username = $1;"
    db.query(query, [username]).then((row) => { 
        if(!Array.isArray(row.rows) || !row.rows.length) {
            throw new Error("User not found"); return
        };
        blockedId = row.rows[0].id;
        // console.log(`${req.session.user}(${blocking}) is blocking ${username}(${blockedId})!`);
        db.query("INSERT INTO bloquear (iduser, idbloqueado) VALUES ($1, $2)", [blocking, blockedId]).then((row) => {
            res.send({blocking, blocked: blockedId});
        }).catch((err) => {
            res.status(404).send(err);
        });;
    }).catch((err) => {
        res.status(404).send(err);
    });
});

router.get('/un/:username', async (req, res) => {
    const username = req.params.username;
    const unblocking = req.session.userId;
    if(!unblocking) res.send("Not Logged");
    let query = "SELECT id FROM usuario WHERE username = $1;"
    db.query(query, [username]).then((row) => { 
        if(!Array.isArray(row.rows) || !row.rows.length) {
            throw new Error("User not found"); return
        };
        unBlockedId = row.rows[0].id;
        // console.log(`${req.session.user}(${unblocking}) is unblocking ${username}(${BlockedId})!`);
        db.query("DELETE FROM bloquear WHERE iduser = $1 AND idbloqueado = $2", [unblocking, unBlockedId]).then((row) => {
            res.send({unblocking, unblocked: unBlockedId});
        }).catch((err) => {
            res.status(401).send(err);
        });;
    }).catch((err) => {
        res.status(404).send(err);
    });
});

