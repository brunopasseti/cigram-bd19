const Router = require('express-promise-router')
const db = require('../db')
const uuidv1 = require('uuid/v1')
const topico = require("../util/topicos")
const router = new Router()

module.exports = router

router.post('/createpost', async  (req, res) => {
    if(req.session.user){
        user = req.body;
        date = new Date();
        try {
            const newPost = "INSERT INTO post (idPost, idUser, idFoto, texto, datestamp) VALUES ($1, $2, $3, $4, $5)";
            values = [uuidv1(), req.session.userId, user.idFoto, user.texto, date];
    
            const  post = await db.query(newPost, values); 
            tokens = user.texto.split(" ");
            for(i of tokens){
                if(i[0]== '#'){
                    const topic = await topico.getTopic(i);
                    if(!Array.isArray(topic.rows) || !topic.rows.length){
                        await topico.createTopic(i);
                    }
                    await topico.createTopicPost(i, values[0])
                }
            }
            res.send("Post criado com sucesso."); return;
        } catch (error) {
            res.send(error); return;
        } 
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

router.post('/comentpost', async  (req, res) => {
    if(req.session.user){
        user = req.body;
        date = new Date();
        try {
            const newComent = "INSERT INTO comentario (idComent, idPost, idComentador, texto, datestamp) VALUES ($1, $2, $3, $4, $5)";
            values = [uuidv1(), user.idPost,req.session.userId, user.texto, date];
    
            const  post = await db.query(newPost, values); 
            tokens = user.texto.split(" ");
            for(i of tokens){
                if(i[0]== '#'){
                    const topic = await topico.getTopic(i);
                    if(!Array.isArray(topic.rows) || !topic.rows.length){
                        await topico.createTopic(i);
                    }
                    await topico.createTopicComent(i, values[0])
                }
            }
            res.send("Comentario criado com sucesso."); return;
        } catch (error) {
            res.send(error); return;
        } 
    }else{
        res.send("Not logged in"); return;
    } 
})
router.get("/getcoments", async(req,res) =>{
    data = req.body;
    const command = "SELECT * FROM post WHERE idPost = $1";
    
    db.query(command, [data.idPost],[]).then((row) => { 
        if(!Array.isArray(row.rows) || !row.rows.length) {
            throw new Error("Post not found"); return
        };
     //   const user = row.rows[0];

        const query = "SELECT * FROM comentario WHERE idPost = $1 ORDER BY datestamp DESC"
        db.query(query, [data.idPost] , []).then((row) => res.send(row.rows)).catch((err)=>{
            res.send(`${err}`);
            console.log(err);
        })
    }).catch((err) => {
        res.send(`${err}`);
    });
});
