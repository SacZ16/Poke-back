const mongoose = require("mongoose")
const usersSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    passwoord: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    photo: {
        type: String,
        require: true
    },
    team: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    pokemons: {
        type: Array,
        require: true
    },
    fav: {
        type: Array,
        require: true
    },
    privilege: {
        type: String,
        require: true
    },
    pokecoins: {
        type: Number,
        require: true
    }
})

exports.usersSchema = mongoose.model("usersSchema", usersSchema)