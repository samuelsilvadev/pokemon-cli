const expect = require('chai').expect;

const { findPokemonByNumber, getError } = require('../src/utils');

describe('Utils Module', () => {
	it('should export `findPokemonByNumber` and `handleError` as functions', () => {
		expect(findPokemonByNumber).to.be.a('function');
		expect(getError).to.be.a('function');
	});

	it('should execute `findPokemonByNumber` correctly', () => {
		const pokemonNumber = 10;
		const pokemons = [{
			entry_number: 10,
			name: 'Thing :D',
		}, {
			entry_number: 20,
			name: 'Thing 20 :D',
		}];

		const result = findPokemonByNumber(pokemonNumber)(pokemons);

		expect(result).to.be.an('object');
		expect(result).to.have.property('name').equals('Thing :D');
	});

	it('should execute `findPokemonByNumber` and return `undefined` if not find anything', () => {
		const pokemonNumber = 130;
		const pokemons = [{
			entry_number: 10,
			name: 'Thing :D',
		}];

		const result = findPokemonByNumber(pokemonNumber)(pokemons);
		
		expect(typeof result).to.equals('undefined');
	});

	it('should execute `handleError` correctly', () => {
		const mockError = {
			message: 'connection broken...',
		};

		const result = getError(mockError);

		expect(result).contains(mockError.message);
	});
});
