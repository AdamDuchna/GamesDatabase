const express = require('express');
const config = require('./config');
const Redis = require("ioredis");
const {Pool} = require('pg');

const app = express();

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


app.listen(5000, ()=>{
    console.log('App is listening');
  })
