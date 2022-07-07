const express = require("express");
const router = express.Router();
router.use(express.json());
const axios = require('axios');
const Game = require("../models/Game");
const Favourite = require("../models/Favourite");

const introspectionEndpoint = "http://keycloak-development-service:8080/realms/myapprealm/protocol/openid-connect/token/introspect";



const integrationClientId = "myintegrationclient";
const integrationClientSecret = "Q5Y0LyxiZeZdyZJXbaU9ibAvg6foBjNb";
router.get('/games', (req, res) => {
    const accessToken = (req.headers.authorization || '').split(' ')[1] || '';

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', integrationClientId);
    params.append('client_secret', integrationClientSecret);
    params.append("token", accessToken);
    
    return axios.post(introspectionEndpoint, params)
    .then(result => {
        console.log("Introspection result");
        console.log(result);
        res.set("Content-Type", "application/json");
        if (result.data.active === true) {
            Game.find(function (err, games) { 
                if (err) return res.send(err);
                res.send({ games: [...games] });
            });
        } else { res.send({error: "Invalid token"}) }
    })
    .catch(error => {
        res.set('Content-Type', 'text/html');
        res.send({error: error})});
});


router.post("/games", (req, res) => {
    const accessToken = (req.headers.authorization || "").split(" ")[1] || "";

    const params = new URLSearchParams();
    params.append("client_id", integrationClientId);
    params.append("client_secret", integrationClientSecret);
    params.append("token", accessToken);

    return axios
      .post(introspectionEndpoint, params)
      .then(async result => {
        const game = new Game({
          ...req.body.data,
        });
        const newGame = await game.save();
        return res.send({ game: newGame });
      })
      .catch((err) => {
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: error }));
      });
  });

router.get("/favourites",  async(req, res) => {
    Favourite.find(function (err, favourites) {
      if (err) return res.send(err);
      res.send({favourites: [...favourites],});
    });
});

router.post("/favourites", async(req, res) => {
    console.log(req)
    const favourite = new Favourite({...req.body.data,});
    const newFavourite = await favourite.save();
    return res.send({ favourite: newFavourite });
});

module.exports = router;
