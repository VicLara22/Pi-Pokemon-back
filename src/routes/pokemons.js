const { Router } = require('express');
const router = Router();
const { getAllPokemons, getById, addPokemon } = require('../controllers/pokemon');

router.get('/', getAllPokemons);
router.get('/:id', getById);
router.post('/', addPokemon)



module.exports = router;
