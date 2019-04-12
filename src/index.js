#!/usr/bin/env node

const chalk = require('chalk');
const { findPokemonByNumber, getError } = require('./utils');
const pokemonService = require('./pokemon-service');

const args = process.argv;
const pokemonArgument = args.slice(2)[0];
const pokemonNumber = parseInt(pokemonArgument, 10);

function _handleSuccess(pokemons) {
	const pokemon = findPokemonByNumber(pokemonNumber)(pokemons);

	const log = pokemon
		? chalk.green(`Name: ${pokemon.pokemon_species.name}`)
		: chalk.red(`Number ${number} not found at pokemon list`);

	console.log(log);
}

function _handleError(err) {
	const error = getError(err);

	console.log(error);
}

pokemonService
	.fetchAllPokemons()
	.then(_handleSuccess)
	.catch(_handleError);
