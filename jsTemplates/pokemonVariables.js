let pokemonRangeStart = 0;
let pokemonRangeEnd = 50;
let pokemonContent = [];
let pokemonAmountToLoad = 1010; //max 1010;
let maxPokemonStats = [255, 190, 194, 230, 230, 180];
let randomPokemon = [];


function getPokemonInfo(pokemon) {
    const pokemonName = pokemon['name'];
    const pokemonId = pokemon['id'];
    const pokemonPic = pokemon['sprites']['other']['official-artwork']['front_default'];
    const pokemonType = pokemon['types'][0]['type']['name'];
    const pokemonAbility = pokemon['abilities'][0]['ability']['name'];
    const pokemonHeight = pokemon['height'];
    const pokemonWeight = pokemon['weight'];
    const pokemonBaseExp = pokemon['base_experience'];
    const movesCount = pokemon['moves'];
    const pokemonStats = pokemon['stats'];
    return { pokemonName, pokemonId, pokemonPic, pokemonType, pokemonAbility, pokemonHeight, pokemonWeight, pokemonBaseExp, movesCount, pokemonStats };
}


