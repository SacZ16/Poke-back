const { Router } = require('express');
const { pokemonSchema } = require("../models/Pokemons")
const router = Router()

router.get("/", (req, res, next) => {
    res.send("PRUEBA NUMERO 1")
})

module.exports = router