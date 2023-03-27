const { Type } = require('../db');
const axios = require('axios');

const getAllTypes = async ( req, res ) => {
    const typeDb = await Type.findAll();
    if(!typeDb.length) {
        try {
            const typesUrl = await axios.get("https://pokeapi.co/api/v2/type"); 
            const types = typesUrl.data.results.map(t => t.name);
            const typesC = types?.map(async t => await Type.create(t)); 
            const allTypes = await Type.findAll();
            res.status(200).send(allTypes); 
        } catch (error) {
            res.status(404).send({error: "error"});
        }; 
    } else {
        res.status(200).send(typeDb);
}
}
module.exports = {
    getAllTypes
}
        

