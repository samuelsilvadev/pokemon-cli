const chalk = require('chalk');

function findPokemonByNumber(number) {
	return function (pokemons) {
		const pokemon = pokemons.find(
			pokemon => pokemon.entry_number === number
		);

		return pokemon;
	};
}

function getError(error) {
	return chalk.red(`Something went wrong: ${error.message}`);
}

module.exports = {
	findPokemonByNumber,
	getError,
};
