const db = require('../db')


module.exports = {
    userExist: async function(user){
        let query = "SELECT EXISTS(SELECT * FROM usuario where usuario.username = $1)"
        let result = await db.query(query, [user]).catch(err => console.log(err));
        return result.rows[0].exists;
    }
}