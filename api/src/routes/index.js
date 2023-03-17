const { Router } = require('express');
const router = Router();
const PokemonsRoute = require('./PokemonsRoute');
const TypesRoute = require('./TypesRoute');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', PokemonsRoute)
router.use('/types', TypesRoute)


module.exports = router;
