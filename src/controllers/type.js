const { Type } = require('../db');
const axios = require('axios');

const getAllTypes = async ( req, res ) => {
        try {
  let typeDb = await Type.findAll();
    if(!typeDb.length) {
            const typesUrl = await axios.get("https://pokeapi.co/api/v2/type"); 
            const types = typesUrl.data.results.map(t => t.name);
            const createdTypes = await Promise.all(types.map(async t => {
                return await Type.create({ name: t });
            }));
            typesDb = createdTypes;
        }
            res.status(200).send(typesDb); 
        } catch (error) {
           res.status(500).send({ error: "Internal Server Error" });
        }; 
      
}
module.exports = {
    getAllTypes
}

        

