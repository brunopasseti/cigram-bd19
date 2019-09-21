const Router = require('express-promise-router')
const db = require('../db')
const uuidv1 = require('uuid/v1')

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
                    const  getTopic = "SELECT * FROM topico WHERE hashtag = $1";
                    const topic = await db.query(getTopic, [i]);

                    if(!Array.isArray(topic.rows) || !topic.rows.length){
                        const createTopic = "INSERT INTO topico (hashtag) VALUES ($1)";
                        const {newTopic} = await db.query(createTopic, [i]);
                    }

                    const topicoPost = "INSERT INTO topico_post (idPost, hashtag) VALUES ($1, $2)";
                    const {newTopicoPost} = await db.query(topicoPost, [values[0], i]);
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




