const { Schema, model } = require("mongoose");

const favouriteSchema = new Schema({
    cover: String,
    title: String,
});

module.exports = model("Favourite", favouriteSchema);
