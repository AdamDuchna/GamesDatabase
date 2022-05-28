const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.json());


const client = require('./config/redisClient');

app.get('/hello', async (req,res) => {
    return res.send('Działaa')
})

client.on('error', err => {
  console.error('Error connecting to Redis', error);
});
client.on('connect', () => {
    console.log(`Connected to Redis.`)
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
});