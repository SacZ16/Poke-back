const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');
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
        type: Object,
        require: true
    },
    abilities2: {
        type: Object,
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
        type: Object,
        require: true
    },
    oficial: {
        type: Boolean,
        require: true
    }
})
// pokemonSchema.virtual('id').get(function () {
//     return this._id.toHexString();
// });

// pokemonSchema.set('toJSON', {
//     virtuals: true,
// });

pokemonSchema.plugin(mongoosePaginate)
exports.pokemonSchema = mongoose.model("pokemonSchema", pokemonSchema)