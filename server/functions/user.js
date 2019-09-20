const uuidv1 = require('uuid/v1');

function createUser(user){
    command = "INSERT INTO usuario (ID, email, username, senha, nomereal, biografia, privacidade) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    values = [uuidv1(), user.email, user.username, user.senha, user.nomereal, user.biografia, user.privacidade];
    client.query(command, userIdentifier, (err, res) => {
        if(err) console.log(err);
        else{
            console.log(res.rows);
        }
    })
}