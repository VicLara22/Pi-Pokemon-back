const { Type } = require('../db');
const axios = require('axios');

const getAllTypes = async (req, res) => {
      const typesBD = await Type.findAll();

if(!typeDb.length){ 
try { 
  

    const typeUrl = await axios.get('https://pokeapi.co/api/v2/type/')
    const types = typeUrl.data.results.map((t => t.name);
    const typesC = types.map(async t => await Type.create({ name: t})); 
    const allTypes = await Type.findAll();
    res.status(200).send(allTypes); 
    } catch (error) {
    res.status(400).json('ups algo salio mal')
    }
   } else {
        res.status(200).send(typeDb);

};

module.exports = {
    getAllTypes
}
        

