const express = require('express');
const config = require('./config');
const Redis = require("ioredis");
const {Pool} = require('pg');

const app = express();
app.use(express.json());

const redisData = {
    host: config.redisHost,
    port: config.redisPort
}

const pgClient = new Pool({
    user: config.postgresUser,
    password: config.postgresPassword,
    host: config.postgresHost,
    port: config.postgresPort,
    database: config.postgresDb
})

const redisClient = new Redis(redisData)

pgClient.connect()
pgClient.query('CREATE TABLE IF NOT EXISTS keyboards (id VARCHAR(36),producer VARCHAR(30),model VARCHAR(30),color VARCHAR(30),keytype VARCHAR(30),size VARCHAR(10))')



redisClient.on('error', error => {
    console.error('Error connecting to Redis', error);
  })

redisClient.on('connect', () => {
    console.log(`Connected to Redis`)
  })

pgClient.on('error', error => {
    console.error('Error connecting to Postgres', error);
      })
    
pgClient.on('connect', () => {
    console.log(`Connected to Postgres`)
      })


app.get('/keyboards', async(req,res)=>{
    const redisAmount = await redisClient.scard("keyboards")
    if(redisAmount === 0){
        const pgData = await pgClient.query("SELECT * FROM keyboards");
        pgClient.end()
        res.send(pgData.rows)
    }
    else{
        const redisData = await redisClient.smembers("keyboards")
        pgClient.end()
        return res.send(JSON.parse(redisData))
    }
})

app.post('/keyboards', async(req,res)=>{
    const {id, producer, model, color, keytype, size} = req.body
    const result = await pgClient.query("INSERT INTO keyboards (id, producer, model, color, keytype, size) VALUES ($1, $2, $3, $4, $5, $6)",[id, producer, model, color, keytype, size])
    const result2 = await redisClient.sadd("keyboards",JSON.stringify(req.body))
    res.send({result,result2})

})

app.listen(5000, ()=>{
    console.log('App is listening');
  })
