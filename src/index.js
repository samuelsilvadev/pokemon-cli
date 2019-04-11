const chalk = require('chalk');
const pokemonService = require('./pokemon-service');

function _findPokemonByNumber(number) {
	return function(pokemons) {
		const pokemon = pokemons.find(
			pokemon => pokemon.entry_number === number
		);

		const log = chalk.green(`Name: ${pokemon.pokemon_species.name}`);

		console.log(log);
	};
}

function _handleError(err) {
	const log = chalk.red(`Something went wrong: ${err.message}`);

	console.log(log);
}

pokemonService
	.fetchAllPokemons()
	.then(_findPokemonByNumber(25))
	.catch(_handleError);
