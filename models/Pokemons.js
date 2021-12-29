const mongoose = require("mongoose")
const pokemonSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    id: {
        type: Number,
        require: true
    },
    height: {
        type: Number,
        require: true
    },
    weight: {
        type: String,
        require: true
    },
    moves: {
        type: Array,
        require: true
    },
    abilities1: {
        type: String,
        require: true
    },
    abilities2: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    types: {
        type: Array,
        require: true
    },
    stats: {
        type: Array,
        require: true
    },
    oficial: {
        type: Boolean,
        require: true
    }
})

exports.pokemonSchema = mongoose.model("pokemonSchema", pokemonSchema)