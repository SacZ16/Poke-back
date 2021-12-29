const { Router } = require('express');
const { usersSchema } = require("../models/Users")
const router = Router()

router.get("/", (req, res, next) => {
    res.send("PRUEBA NUMERO 1")
})

module.exports = router