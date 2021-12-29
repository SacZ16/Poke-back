const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv/config");

app.use(cors());
app.options("*", cors());


// Routes
const usersSchema = require("./routes/users")
const pokemonSchema = require("./routes/pokemons")

const api = process.env.API_URL;
app.use(api + "/users", usersSchema)
app.use(api + "/pokemons", pokemonSchema)

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan("tiny"));
//app.use(authJwt());

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(process.env.PORT, () => {
  console.log("server is running " + process.env.PORT);
});