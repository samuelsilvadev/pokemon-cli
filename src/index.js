#!/usr/bin/env node

const chalk = require('chalk');
const termImg = require('term-img');
const cfonts = require('cfonts');

const { findPokemonByNumber, getError } = require('./utils');
const pokemonService = require('./pokemon-service');

const args = process.argv;
const pokemonArgument = args.slice(2)[0];
const pokemonNumber = parseInt(pokemonArgument, 10);

function _handleSuccess(pokemons) {
	const pokemon = findPokemonByNumber(pokemonNumber)(pokemons);

	const log = pokemon
		? pokemon.pokemon_species.name
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
			width: '15%',
			height: '15%',
		});

		const columns = process.stdout.columns;
		const tenPercent = columns / 15;
		const greenColumns = chalk.green('.'.repeat(columns));

		console.log(greenColumns);

		cfonts.say(pokemonName, {
			font: 'block',
			align: 'center',
			colors: ['greenBright'],
			background: 'transparent',
			letterSpacing: 1.1,
			lineHeight: 1,
			space: true,
			maxLength: '0',
		});

		console.log(`${' '.repeat((columns / 2) - (tenPercent))}${pokemonPicture}`);
		console.log(greenColumns);
	})
	.catch(_handleError);
