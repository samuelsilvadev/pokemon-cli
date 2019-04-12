const https = require('https');

const API = 'https://pokeapi.co/api/v2/pokedex/1/';

function fetchAllPokemons() {
	return new Promise((resolve, reject) => {
		https
			.get(API, response => {
				let body = '';
				response.setEncoding('utf8');

				response.on('data', data => {
					body += data;
				});

				response.on('end', () => {
					body = JSON.parse(body);

					resolve(body.pokemon_entries);
				});
			})
			.on('error', err => {
				console.log('Error: ' + err.message);
				reject(err);
			});
	});
}

module.exports = { fetchAllPokemons };
