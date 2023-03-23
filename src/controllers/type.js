const { Type } = require('../db');
const axios = require('axios');

const getAllTypes = async (req, res) => {
try { 
    const typesBD = await Type.findAll();

    if(typesBD.length > 0) return res.json(typesBD) 

    const typeUrl = await axios.get('https://pokeapi.co/api/v2/type/')
    const types = await Promise.all(typeUrl.data.results.map(async (t) => {
        let type = await Type.create({
                    name: t.name
            })
            return type;
    }))
   
        return res.json(types);
    } catch (error) {
    res.status(400).json('ups algo salio mal')
    }
};

module.exports = {
    getAllTypes
}