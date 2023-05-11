let pokemonRange = 0;
let pokemonCount = 20;
let pokemonContent = [];
let pokemonAmount = 1010;
let maxPokemonStats = [255, 190, 194, 230, 230, 180];

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


