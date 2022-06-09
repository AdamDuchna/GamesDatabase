const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express()
const starting = uuidv4()

app.get('/', (req, res) => {
    res.send(starting)
})

app.listen(5000, ()=>{
    console.log('App Listening on port 5000 ');
})