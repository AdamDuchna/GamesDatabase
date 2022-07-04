const express = require('express');
const axios = require('axios');


const app = express();
app.use(express.json());
const appPort = 6000;

const tokenEndpoint = "http://localhost:8080/realms/myapprealm/protocol/openid-connect/token";

const apiProtectedEnpoint = "http://localhost:4000/integration/games";
const apiUnprotectedEnpoint = "http://localhost:4000/integration/favourites";


const integrationClientId = "myintegrationclient";
const integrationClientSecret = "Q5Y0LyxiZeZdyZJXbaU9ibAvg6foBjNb";

app.use((req, res, next) => {
    console.log('----HEADERS--');
    console.log(req.headers);
    console.log('----PARAMS--');
    console.log(req.query);
    next();
    });


 app.get('/games', (req, res) => {

    const params = new URLSearchParams();

    params.append('grant_type', 'client_credentials');
    params.append('client_id', integrationClientId);
    params.append('client_secret', integrationClientSecret);
    
    return axios.post(tokenEndpoint, params)
    .then(result => {
    accessToken = result.data.access_token || ''
    return axios.get(apiProtectedEnpoint,
        {headers:{'Authorization': 'Bearer ' + accessToken}
    })
    })
    .then(result=>{

        res.set('Content-Type', 'application/json');
        res.send(result.data);
    })
    .catch(error => {
        res.set('Content-Type', 'text/html');
        res.send({error})});
});


app.post('/games', (req, res) => {

    const params = new URLSearchParams();

    params.append('grant_type', 'client_credentials');
    params.append('client_id', integrationClientId);
    params.append('client_secret', integrationClientSecret);
    
    return axios.post(tokenEndpoint, params)
    .then(result => {
    accessToken = result.data.access_token || '';
    return axios.post( apiProtectedEnpoint, { headers: { Authorization: "Bearer " + accessToken }, data: req.body}) })
    .then(result=>{
        res.set('Content-Type', 'application/json');
        res.send(result.data);
    })
    .catch(error => {
        console.log(error);
        res.set('Content-Type', 'text/html');
        res.send({error})});
});

app.get("/favourites", (req, res) => {
    return axios.get(apiUnprotectedEnpoint)
    .then((result) => {
      res.set("Content-Type", "application/json");
      res.send(result.data);
    })
    .catch((error) => {
      res.set("Content-Type", "text/html");
      res.send({error:error});
    });
});

app.post("/favourites", (req, res) => {
    return axios.post(apiUnprotectedEnpoint, {data: req.body})
      .then((result) => {
        res.set("Content-Type", "application/json");
        res.send(result.data);
      })
      .catch((error) => {
        res.set("Content-Type", "text/html");
        res.send({ error: error });
      });
  });

app.listen(appPort, err =>{
    console.log(`Listening on ${appPort}`)
})
