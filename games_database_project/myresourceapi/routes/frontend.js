const express = require("express");
const router = express.Router();

const Game = require("../models/Game");
const Favourite = require("../models/Favourite");

router.get("/games", (req,res) => {
    Game.find( function (err,games){ 
        if(err) res.send({error: err})
        res.send({ games: [...games]})
    })
})

router.post("/games",  async (req,res) => {
    const game = new Game({...req.body.data})
    const savedGame = await game.save();
    return res.send({ game: savedGame })
})


router.get("/favourites", (req,res) => {
    Favourite.find( function (err,favourites){ 
        if(err) res.send({error: err})
        res.send({ favourites: [...favourites]})
    })
})

router.post("/favourites",  async (req,res) => {
    const favourite = new Favourite({...req.body.data})
    const savedFavourite = await favourite.save();
    return res.send({ favourite: savedFavourite })
})

module.exports = router;

