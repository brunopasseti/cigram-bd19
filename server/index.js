const express = require('express')
const cors = require('express-cors')
require('dotenv').config()
const { Client } = require('pg')
const client = new Client({
    connectionString:process.env.DB_CS,
    ssl:true
});
const app = express();
const port = 3333;
client.connect().catch((err)=> console.log(err))

client.query('SELECT * from topico', (err, res) => {
    if(err) console.log(err);
    else{
        console.log(res.rows);
    }
})
app.use(cors());

app.listen(port, () => console.log(`Starting server on port ${port}`));

