const Router = require('express-promise-router')
const db = require('../db')
const uuidv1 = require("uuid/v1")

const router = new Router()

module.exports = router

/********************************************************************************
*
*   Create a user
*   Method: POST
*   Payload Type: json 
*   Payload Content: email, username, senha, nomereal, biografia, privacidade
*
*********************************************************************************/

router.post('/create', async  (req, res) => {
    user = req.body;
    findSpecialCharacteres = req.body.username.search(/\W/)
    if(findSpecialCharacteres == -1){
        command = "INSERT INTO usuario (ID, email, username, senha, nomereal, biografia, privacidade) VALUES ($1, $2, $3, $4, $5, $6, $7)";
        values = [uuidv1(), user.email, user.username, user.senha, user.nomereal, user.biografia, user.privacidade];

        await db.query(command, values).then(() => res.send("User created")).catch((err) => {
            res.status(400).send(`Error when creating users`)
        });
    }else{
        res.status(400).send("Username invalid");
    }
})


/*************************************************
*
*   Search users by username
*   Method: GET
*   Params: username
*
***************************************************/

router.get('/:username', async  (req, res) => {
    const { username } = req.params;

    const query = `SELECT * FROM usuario WHERE username = '${username}';`;
    await db.query(query, []).then((row) => {
        // Checking if array is empty:
        if(!Array.isArray(row.rows) || !row.rows.length) {
            throw new Error("User not found"); return
        };
        let {username, nomereal, biografia, privacidade} =  row.rows[0]
        if(req.session.user !== username && privacidade == true)
            res.status(403).send({username, privacidade:true});
        let result = {username, nomereal, biografia, privacidade};
        res.send(result);
    }).catch((err) => {
        res.status(404).send(`${err}`);
    });
})

/*************************************************
*
*   Search users by pattern
*   Method: GET
*   Params: pattern
*
*********************************************************/

router.get('/search/:pattern', async  (req, res) => {
    const pattern = req.params.pattern;
    if(req.session.user){
<<<<<<< HEAD
        const findUser = `SELECT usuario.id, usuario.username, usuario.nomereal FROM usuario INNER JOIN seguindo ON seguindo.idSeguido = usuario.id WHERE usuario.id != '${req.session.userId}' AND usuario.username LIKE '%${pattern}%' OR usuario.nomereal LIKE '%${pattern}%' or usuario.biografia LIKE '%${pattern}%' GROUP BY usuario.id ORDER BY COUNT(usuario.id) DESC`;
=======
        const findUser = `SELECT usuario.id, usuario.username, usuario.nomereal FROM usuario WHERE usuario.username != '${req.session.user}' AND usuario.username LIKE '%${pattern}%' OR usuario.nomereal LIKE '%${pattern}%' or usuario.biografia LIKE '%${pattern}%'`;
>>>>>>> 263d4a274f4dc5c61165322265956bb3b47decd8
        await db.query(findUser , []).then((row) => res.send(row.rows)).catch((err)=>{
            console.log(err)
            res.status(400).send(err);
        });
    }else{
        res.status(403).send("Not logged in")
    }
})