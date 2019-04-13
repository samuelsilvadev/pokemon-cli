#!/usr/bin/env node

const chalk = require('chalk');
const termImg = require('term-img');

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

	return log;
}

function _handleError(err) {
	const error = getError(err);

	console.log(error);
}

Promise.all([pokemonService.fetchAllPokemons(), pokemonService.getPokemonImage(pokemonNumber)])
	.then((values) => {
		const [pokemons, image] = values;

		const pokemonName = _handleSuccess(pokemons);
		const pokemonPicture = termImg.string(image, {
			width: '10%',
			height: '10%',
		});

		console.log(pokemonName);
		console.log(pokemonPicture);
	})
	.catch(_handleError);
