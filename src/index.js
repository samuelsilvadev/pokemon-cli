#!/usr/bin/env node

const chalk = require('chalk');
const pokemonService = require('./pokemon-service');

const args = process.argv;
const pokemonArgument = args.slice(2)[0];
const pokemonNumber = parseInt(pokemonArgument, 10);

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
	.then(_findPokemonByNumber(pokemonNumber))
	.catch(_handleError);
