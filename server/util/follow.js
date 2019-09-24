const db = require('../db')


module.exports = {
    isFollowingByID: async function(idA, idB){
        let query = "SELECT EXISTS(select iduser, idseguido from seguindo where iduser = '$1' and idseguido = '$2' );"
        let result = await db.query(query, [idA, idB]).then(row => console.log(row.rows)).catch(err => console.log(err));
        return result.rows[0];
    },
    isFollowingByUser : async function(userA, userB){
        let query = "SELECT EXISTS(select iduser, idseguido from seguindo where iduser = (select id from usuario where usuario.username = $1) and idseguido = (select id from usuario where usuario.username = $2));"
        let result = await db.query(query, [userA, userB]).catch(err => console.log(err));
        return result.rows[0];
    }
}