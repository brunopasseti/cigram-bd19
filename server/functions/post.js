const uuidv1 = require('uuid/v1');

function getPostFromUser(userIdentifier) {
    command = 'SELECT * FROM usuarios WHERE = $1'
    client.query(command, userIdentifier, (err, res) => {
        if(err) console.log(err);
        else{
            console.log(res.rows);
        }
    })
}
