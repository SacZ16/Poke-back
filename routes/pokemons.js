const { default: axios } = require('axios');
const { Router } = require('express');
const { pokemonSchema } = require("../models/Pokemons")
const router = Router()

router.get("/add", async (req, res, next) => {
    let arraypokemons = []
    let pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=721")
    let pokemonscompleted = pokemons.data.results

    for (let i = 0; i < pokemonscompleted.length; i++) {
        let arraymoves = []
        let existe = await pokemonSchema.findOne({name:pokemonscompleted[i].name})
        if(!existe){

            let pokemonsurl = await axios.get(pokemonscompleted[i].url)
            // console.log([pokemonsurl.data.abilities[0].ability.name,Math.floor(Math.random() * (100 - 50)) + 50])
            // console.log([pokemonsurl.data.abilities[1].ability.name,Math.floor(Math.random() * (100 - 50)) + 50])
            // console.log(pokemonsurl.data.height)
            // console.log(pokemonsurl.data.id)
            // console.log(pokemonsurl.data.name)
            // console.log(pokemonsurl.data.weight)
            // console.log(pokemonsurl.data.sprites.other.home.front_default)
            // pokemonsurl.data.moves.map(e => arraymoves.push([e.move.name, Math.floor(Math.random() * (100 - 50)) + 50]))
            pokemonsurl.data.moves.map(e => arraymoves.push({
                name:  e.move.name, 
                accuracy:  Math.floor(Math.random() * (100 - 50)) + 50}
                )
                )
                // [pokemonsurl.data.stats.map(e=>console.log({[e.stat.name] :e.base_stat}))]
                // pokemonsurl.data.types.map(e=>console.log(e.type.name ))
                let pokemon = new pokemonSchema({
                    name: pokemonsurl.data.name,
                    id: pokemonsurl.data.id,
                    height: pokemonsurl.data.height,
                    weight: pokemonsurl.data.weight,
                    moves: await arraymoves,
                    abilities1: {
                        name: pokemonsurl.data.abilities[0].ability.name,
                        accuracy: Math.floor(Math.random() * (100 - 50)) + 50
                        
                    },
                    abilities2: {
                        name: pokemonsurl.data.abilities[1]?pokemonsurl.data.abilities[1].ability.name:pokemonsurl.data.abilities[0].ability.name,
                        accuracy: Math.floor(Math.random() * (100 - 50)) + 50
                        
                    },
                    img: pokemonsurl.data.sprites.other.home.front_default ? pokemonsurl.data.sprites.other.home.front_default : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f82cc357-e354-4ef7-8b2d-647f6f756800/dbf1jrd-095f7fd1-e33b-4e26-b456-8cbf40d0e5d1.png/v1/fill/w_1024,h_765,q_80,strp/quien_es_ese_pokemon__who_s_that_poke___by_shikomt_by_shikomt_dbf1jrd-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzY1IiwicGF0aCI6IlwvZlwvZjgyY2MzNTctZTM1NC00ZWY3LThiMmQtNjQ3ZjZmNzU2ODAwXC9kYmYxanJkLTA5NWY3ZmQxLWUzM2ItNGUyNi1iNDU2LThjYmY0MGQwZTVkMS5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.YZOIomNz5t-pjv59EuK-mtru0QgjhlTtGEGPLuzR1hM',
                    types: pokemonsurl.data.types.map(e => e.type.name),
                    stats: {
                        hp: pokemonsurl.data.stats[0].base_stat,
                        attack: pokemonsurl.data.stats[1].base_stat,
                        defense: pokemonsurl.data.stats[2].base_stat,
                        'special-attack': pokemonsurl.data.stats[3].base_stat,
                        'special-defense': pokemonsurl.data.stats[4].base_stat,
                        speed: pokemonsurl.data.stats[5].base_stat,
                        
                    },
                    oficial: true
                })
                pokemon = await pokemon.save()
                
            }
        }
            res.send('listo')
        
        })
        router.get("/ver", async (req, res, next) => {
            const pagenum =req.query.page
            const options ={
                page:pagenum?pagenum:1,
                limit:20,
                sort:{ id: 'asc' }
            }
            let ver = await pokemonSchema.paginate({name:{$regex : req.query.name?req.query.name:'', $options : 'i'}},options);
            res.send(ver)
        })
        
        module.exports = router