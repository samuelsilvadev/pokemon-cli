const https = require('https');

const API = 'https://pokeapi.co/api/v2/pokedex/1/';
const IMAGE_ENDPOINT = 'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/Pokemon_XY_Sprites/{id}.png';

function fetchAllPokemons() {
	return new Promise((resolve, reject) => {
		https
			.get(API, (response) => {
				let body = '';
				response.setEncoding('utf8');

				response.on('data', (data) => {
					body += data;
				});

				response.on('end', () => {
					body = JSON.parse(body);

					resolve(body.pokemon_entries);
				});
			})
			.on('error', err => {
				reject(err);
			});
	});
}

function getPokemonImage(id) {
	const url = IMAGE_ENDPOINT.replace(/{id}/, id);

	return new Promise((resolve, reject) => {
		https
			.get(url, (response) => {
				const buffer = [];

				response.on('data', (data) => {
					buffer.push(data);
				});

				response.on('end', () => {
					resolve(Buffer.concat(buffer));
				});
			})
			.on('error', err => {
				reject(err);
			});
	});
}

module.exports = {
	fetchAllPokemons,
	getPokemonImage,
};
