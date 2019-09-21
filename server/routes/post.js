const Router = require('express-promise-router')
const db = require('../db')
const uuidv1 = require('uuid/v1')

const router = new Router()

module.exports = router

router.post('/createpost', async  (req, res) => {
    if(req.session.user){
        user = req.body;
        date = new Date();
        command = "INSERT INTO post (idPost, idUser, idFoto, texto, datestamp) VALUES ($1, $2, $3, $4, $5)";
        values = [uuidv1(), req.session.userId, user.idFoto, user.texto, date];

        await db.query(command, values).then(() => res.send("Post created")).catch((err) => {
            res.send(`Error when creating post`)
            console.log(err);
        });
    }else{
        res.send("Not logged in"); return;
    }
})

router.get("/getposts", async(req,res) =>{
    data = req.body;
    const command = "SELECT * FROM usuario WHERE username = $1";
    
    db.query(command, [data.username],[]).then((row) => { 
        if(!Array.isArray(row.rows) || !row.rows.length) {
            throw new Error("User not found"); return
        };
        const user = row.rows[0];

        const query = "SELECT * FROM post WHERE idUser = $1 ORDER BY datestamp DESC"
        db.query(query, [user.id], []).then((row) => res.send(row.rows)).catch((err)=>{
            res.send(`${err}`);
            console.log(err);
        })
    }).catch((err) => {
        res.send(`${err}`);
    });
});

router.get("/:postId", async (req, res) => {
    
});


