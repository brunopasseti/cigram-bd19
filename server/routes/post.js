const Router = require('express-promise-router')
const db = require('../db')
const uuidv1 = require('uuid/v1')
const topico = require("../util/topicos")
const router = new Router()

module.exports = router

router.post('/', async  (req, res) => {
    if(req.session.user){
        user = req.body;
        date = new Date();
        try {
            const idPost = uuidv1();
            values2 = 0;
            if(user.resfoto){
                idfoto = uuidv1()
                const photoPath = "post/foto/" + idFoto + ".png";
                values2 = [idfoto, photoPath];
                const newPost2 = "INSERT INTO foto (idFoto, urlFoto) VALUES ($1, $2)";
                const post2 = await db.query(newPost2, values2).catch((err)=> console.log("Erro na primeira requisição,", err)); 
            }
            const newPost = "INSERT INTO post (idPost, idUser, idFoto, texto, datestamp) VALUES ($1, $2, $3, $4, $5)";
            values = [idPost, req.session.userId, values2[0], user.texto, date];
            const  post = await db.query(newPost, values); 
            let regexHashTag = /#(\w+)/g;
            hashtags = user.texto.match(regexHashTag);
            if(hashtags != null && hashtags.length){
                for(i in hashtags){
                    await topico.createTopic(hashtags[i]);
                    await topico.createTopicPost(hashtags[i], values[0]);
                }
            }
            res.send("Post criado com sucesso."); return;
        } catch (error) {
            console.log(error)
            res.status(400).send(error); return;
        } 
    }else{
        res.status(403).send("Not logged in"); return;
    }
})

router.get('/', async(req,res) =>{
    data = req.body;
    const command = "SELECT * FROM usuario WHERE username = $1";
    
    db.query(command, [data.username],[]).then((row) => { 
        if(!Array.isArray(row.rows) || !row.rows.length) {
            throw new Error("User not found"); return
        };
        const user = row.rows[0];
        if(req.session.user !== data.username && privacidade == true)
            res.status(401).send({username, privacidade:true});
        const query = "SELECT * FROM post WHERE idUser = $1 ORDER BY datestamp DESC"
        db.query(query, [user.id], []).then((row) => res.send(row.rows)).catch((err)=>{
            res.status(403).send(`${err}`);
            console.log(err);
        })
    }).catch((err) => {
        res.send(`${err}`);
    });
});

router.get("/:user", async (req, res) => {
    const user = req.params.user;

    const query = `SELECT id FROM usuario WHERE username = '${user}';`;

    await db.query(query, []).then((row) => {
        // Checking if array is empty:
        if(!Array.isArray(row.rows) || !row.rows.length) {
            throw new Error("User not found");
        };
        let {id} =  row.rows[0];

        db.query(`Select * FROM post WHERE iduser = '${id}' ORDER BY datestamp DESC`, []).then((row) => {
            if(!Array.isArray(row.rows) || !row.rows.length) {
                throw new Error("Posts not found");
            };
            res.send(JSON.stringify(row.rows));
        }).catch((err) => {
            res.status(404).send(`${err}`);
        });
    }).catch((err) => {
        res.status(404).send(`${err}`);
    });
});

router.post('/coment', async  (req, res) => {
    if(req.session.user){
        user = req.body;
        date = new Date();
        try {
            const newComent = "INSERT INTO comentario (idComent, idPost, idComentador, texto, time) VALUES ($1, $2, $3, $4, $5)";
            values = [uuidv1(), user.idPost,req.session.userId, user.texto, date];

            const  coment = await db.query(newComent, values); 

            let regexHashTag = /#(\w+)/g;
            hashtags = user.texto.match(regexHashTag);

            if(hashtags != null && hashtags.length){
                for(i of hashtags){
                    if(i[0]== '#'){
                        await topico.createTopic(i);
                        await topico.createTopicComent(i, values[0])
                    }
                }
            }
            res.send("Comentário criado com sucesso."); return;
        } catch (error) {
            console.log(error)
            res.send(error);
        } 
    }else{
        res.status(403).send("Not logged in"); return;
    } 
})

router.post("/coments", async(req,res) =>{
    data = req.body;
    if(req.session.user){
        const command = "SELECT * FROM post WHERE idPost = $1";
        
        db.query(command, [data.idPost],[]).then((row) => { 
            if(!Array.isArray(row.rows) || !row.rows.length) {
                throw new Error("Post not found"); return
            };

            const query = "SELECT * FROM comentario WHERE idPost = $1 AND comentario.idComentador NOT IN (SELECT comentario.idComentador FROM comentario INNER JOIN bloquear ON comentario.idComentador = bloquear.idBloqueado WHERE bloquear.idUser = $2 UNION SELECT comentario.idComentador FROM comentario INNER JOIN bloquear ON comentario.idComentador = bloquear.idUser WHERE bloquear.idBloqueado = $2) ORDER BY time DESC;"
            db.query(query, [data.idPost, req.session.userId ] , []).then((row) => res.send(row.rows)).catch((err)=>{
                res.send(`${err}`);
                console.log(err);
            })
        }).catch((err) => {
            res.status(400).send(`${err}`);
        });
    }else{
        res.status(403).send("Not logged in");
    }
});
