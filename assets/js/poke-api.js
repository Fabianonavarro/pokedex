const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    // Obtendo todos os tipos de Pokémon
    const types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
    // Pegando o primeiro tipo como tipo principal
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    // Garantindo que a foto existe antes de atribuir
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default || pokeDetail.sprites.front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(convertPokeApiDetailToPokemon);
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(jsonBody => jsonBody.results)
        .then(pokemons => Promise.all(pokemons.map(pokeApi.getPokemonDetail)))
        .then(pokemonsDetails => pokemonsDetails)
        .catch(error => {
            console.error('Error fetching Pokémon:', error);
            return []; // Retorna uma lista vazia em caso de erro
        });
}
