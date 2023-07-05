const { getAllPokemon } = require('../middleware/pokemonMidlleware')
const { Pokemon, Type } = require('../db')

const getAllPokemons = async (req, res, next) => {
    const { name } = req.query
 
    try {
           const allPokemons = await getAllPokemon()
        if (name) {
            const pokemonName = allPokemons.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            if (pokemonName.length > 0) {
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
    try {
     const allPokemons = await getAllPokemon()
        if (id) {
            const pokemonID = await allPokemons.filter(e => e.id == id)
         if (pokemonID.length > 0) {
                res.status(200).json(pokemonID);
            } else {
                res.status(404).send('Sorry, that Pokemon does not exist.');
            }
        }
    } catch (error) {
        next(error)
    }
};


const addPokemon = async (req, res, next) => {

    const { name, life, attack, defense, speed, height, weight, img, createBD, type } = req.body;
    try {
        if (!name) {
             return res.status(400).json({ msg: 'Es necesario ingresar un nombre' });
        }
            const pokemonCreated = await Pokemon.create({ name, life, attack, defense, speed, height, weight, img, createBD });
       
       if(type){
            const typesdb = await Type.findAll({
            where: { name: type }
            })
          await pokemonCreated.addType(typesdb);
            } 
        else  {
            return res.status(400).json({ msg: 'Es necesario ingresar un tipo' });
        }
        
        res.json({ msg: "Pokémon creado con éxito" });
    } catch (error) {
      next(error);
    }
};

module.exports = {
    getAllPokemons,
    getById,
    addPokemon
}


