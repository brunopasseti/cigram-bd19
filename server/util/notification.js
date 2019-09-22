const db = require('../db')
const uuidv1 = require("uuid/v1")


module.exports = {
    notifyUser : async function(type, userDoing, userReceiving){
        const idNot = uuidv1();
        const time = new Date();
        const getTopic = "INSERT INTO notificacao (idnot, tipo, sujeito, objeto, time) VALUES ($1, $2, $3, $4, $5);";
        const notificacao = await db.query(getTopic, [idNot, type, userDoing, userReceiving, time]);
        return notificacao;
    },
}