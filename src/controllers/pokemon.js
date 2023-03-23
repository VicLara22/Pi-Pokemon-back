const { getAllPokemon } = require('../middleware/pokemonMidlleware')
const { Pokemon, Type } = require('../db')

const getAllPokemons = async (req, res, next) => {
    const { name } = req.query
    const allPokemons = await getAllPokemon()
    try {
        if (name) {
            const pokemonName = allPokemons.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            if (pokemonName) {
                return res.status(200).json(pokemonName)
            } else {
                return res.status(400).send('Sorry, that Pokemon does not exist')
            }
        }
        res.status(200).json(allPokemons)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    const { id } = req.params
    const allPokemons = await getAllPokemon()
    try {
        if (id) {
            const pokemonID = await allPokemons.filter(e => e.id == id)
            pokemonID ?
                res.status(200).json(pokemonID) :
                res.status(404).send('Sorry, that Pokemon does not exist.')
        }
    } catch (error) {
        next(error)
    }
};


const addPokemon = async (req, res, next) => {

    const { name, life, attack, defense, speed, height, weight, img, createBD, type } = req.body;
    try {
        if (name) {
            const pokemonCreated = await Pokemon.create({ name, life, attack, defense, speed, height, weight, img, createBD });
            const typesdb = await Type.findAll({
                where: { name: type }
            })
            pokemonCreated.addType(typesdb)
            return res.status(200).json(pokemonCreated)
        } else {
            return res.status(404).send('Pokemon no creado')
        }
    } catch (error) {
        return next({ message: 'Could not Create Pokemon!', status: 400 })
    }
};

module.exports = {
    getAllPokemons,
    getById,
    addPokemon
}


