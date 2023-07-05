const axios = require('axios');
const { Pokemon, Type } = require('../db');

const getApiPokemon = async () => {
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
    const apiInfo1 = await axios(apiUrl.data.next)
    const apiInfo2 = await axios(apiInfo1.data.next)
    const allApi = apiUrl.data.results.concat(apiInfo1.data.results).concat(apiInfo2.data.results)
    const pokemons = await Promise.all(allApi.map(async (p) => {
       const e = await axios.get(p.url);
        return {
            id: e.data.id ,
            name: e.data.name,
            life: e.data.stats[0].base_stat,
            attack: e.data.stats[1].base_stat,
            defense: e.data.stats[2].base_stat,
            speed: e.data.stats[5].base_stat,
            height: e.data.height,
            weight: e.data.weight,
            img: e.data.sprites.other.home.front_default,        
            type: e.data.types.map(e => e.type.name),
        }
    }))
    return pokemons;
       } catch (error) {
        console.log(error);
        return [];
    }
};

const getBdPokemon = async () => {

    try {
        const bd =  await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
         return bd;
    } catch (error) {
        console.log(error);
         return [];
    }
}

const getAllPokemon = async () => {
    const apiInfo = await getApiPokemon();
    const bdInfo = await getBdPokemon();
    const infoTotal = apiInfo.concat(bdInfo);
    return infoTotal;
}



module.exports = {
    getApiPokemon,
    getBdPokemon,
    getAllPokemon,
 
}
