const express = require('express');
const config = require('./conf');

const app = express();

const {Pool} = require('pg')

const pgClient = new Pool({
    user: config.postgresUser,
    host: config.postgresHost,
    database: config.postgresDb,
    password: config.postgresPassword
})

pgClient.on('error', ()=> console.log('error with connection to pg'))
pgClient.on('connect', ()=>console.log('connected do postgres'))

pgClient
    .query('CREATE TABLE IF NOT EXISTS table1 (number INT)')
    .catch(err => console.log(err))

const PORT = 8080

app.get("/hello", (req,res)=>{
    res.send("mybackend postgres app")
})

app.listen(PORT, ()=>{
    console.log('App is listening');
})