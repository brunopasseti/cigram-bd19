const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

module.exports = router

router.get("/:user", async (req, res) => {
    const user = req.params.user;

    const query = `SELECT id FROM usuario WHERE username = '${user}';`;

    await db.query(query, []).then((row) => {
        // Checking if array is empty:
        if(!Array.isArray(row.rows) || !row.rows.length) {
            throw new Error("User not found");
        };
        let {id} =  row.rows[0];

        db.query(`Select * FROM post WHERE iduser = '${id}'`, []).then((row) => {
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

router.get("/:postId", async (req, res) => {
    
});


