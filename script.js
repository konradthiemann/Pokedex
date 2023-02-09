const URL_API = 'https://pokeapi.co/api/v2/pokemon/';
let pokemonID = [];
let allPokemonData = 10271;

async function loadPokemon(){
    for (let i = 1; i < 10; i++) {
        let singlePokemonUrl = (`${URL_API}` + `${i}`)
        let response = await fetch (singlePokemonUrl);
        currentPokemon = await response.json();

        document.getElementById('content').innerHTML += currentPokemon['id'];
    }
    
}