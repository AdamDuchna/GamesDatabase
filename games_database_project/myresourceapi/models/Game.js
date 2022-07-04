const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
    cover: String,
    title: String,
});

module.exports = model("Game", gameSchema);
