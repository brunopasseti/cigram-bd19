const db = require('../db')

module.exports = {
    getTopic : async function(hashtag){
        const  getTopic = "SELECT * FROM topico WHERE hashtag = $1";
        const topic = await db.query(getTopic, [hashtag]);
        return topic;
    },

    createTopic: async function(hashtag){
        const createTopic = "INSERT INTO topico (hashtag) VALUES ($1)";
        return await db.query(createTopic, [hashtag]);
    },

    createTopicPost: async function(hashtag, idPost){
        const topicoPost = "INSERT INTO topico_post (idPost, hashtag) VALUES ($1, $2)";
        return await db.query(topicoPost, [idPost, hashtag]);
    }
}