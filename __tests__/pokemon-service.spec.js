const expect = require('chai').expect;
const nock = require('nock');

const { fetchAllPokemons } = require('../src/pokemon-service');

const RESPONSE_MOCK = {
	pokemon_entries: [
		{ name: 'pikachu 3', entry_number: 25 },
		{ name: 'voltorb', entry_number: 100 },
	]
};

describe('Pokemon service Module', () => {
	it('should export `fetchAllPokemons` as functions', () => {
		expect(fetchAllPokemons).to.be.a('function');
	});

	describe('Http requests', () => {
		nock('https://pokeapi.co')
			.persist()
			.get('/api/v2/pokedex/1/')
			.reply(200, RESPONSE_MOCK);

		it('should `fetchAllPokemons` return a promise', () => {
			const result = fetchAllPokemons();

			expect(result).to.be.instanceOf(Promise);
		});

		it('should call `fetchAllPokemons` correctly', () => {
			fetchAllPokemons().then(response => {

				const [pikachu, voltorb] = response.pokemon_entries;

				expect(response).to.be.an('array');
				expect(pikachu.name).to.be.equals('pikachu');
				expect(pikachu.entry_number).to.be.equals(25);

				expect(voltorb.name).to.be.equals('voltorb');
				expect(voltorb.entry_number).to.be.equals(100);
			}).catch(() => { });
		});
	});

});
