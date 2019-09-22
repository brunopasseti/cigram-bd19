const Router = require('express-promise-router')
const db = require('../db')
const uuidv1 = require('uuid/v1')
const router = new Router()

module.exports = router
router.post('/seguir', async (req,res) => {
    if(req.session.user){
        target = req.body;
        const command = "SELECT * FROM usuario WHERE username = $1";
        db.query(command, [target.username],[]).then((row) => { 
            if(!Array.isArray(row.rows) || !row.rows.length) {
                throw new Error("User not found"); return
            };
            const command2 = "SELECT idUser FROM usuario WHERE username = $1";
            const idTarget = await db.query(command2, target.username);
            const text = "INSERT INTO seguindo (idUser, idSeguido) VALUES ($1,$2)";
            values = [req.session.userId, idTarget];
            await db.query(text, values);
        }).catch((err) => {
            res.send(`${err}`);
        });
    }else{
        res.status(403).send("Not logged in"); return;
    }
})

router.get('/seguidores', async (req,res) => {
    if(req.session.user){
        const command = "SELECT * FROM seguindo WHERE idUser = $1";
        db.query(command, req.session.userId, []).then((row) => res.send(row.rows)).catch((err)=>{
            res.send(`${err}`);
            console.log(err);
        })
    }else{
        res.status(403).send("Not logged in"); return;
    }
})