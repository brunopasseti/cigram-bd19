const Router = require('express-promise-router')
const db = require('../db')
const uuidv1 = require("uuid/v1")

const router = new Router()

module.exports = router

router.post('/', async (req, res)=>{
    const query = "SELECT * FROM topico_post WHERE hastah = $1";
    try {
        const topicoPosts = await db.query(query, [req.hashtag]);
        
    } catch (error) {
        
    }
})