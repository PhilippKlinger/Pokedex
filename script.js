let pokemonCount = 1;
let pokemonData;



async function loadAllPokemon() {
  for (let i = 0; i < pokemonCount; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i+1}/`;
    let response = await fetch(url);
    pokemonData = await response.json();
    showPokemonList();
  }
}

function showPokemonList() {
  let pokemonName = pokemonData['name'];
  let pokemonId = pokemonData['id'];
  let pokemonPic = pokemonData['sprites']['other']['home']['front_shiny'];
  let pokemonStats = pokemonData['stats'];
  let pokemonType = pokemonData['types'][0]['type']['name'];
  let pokemonHeight = pokemonData['height'];
  let pokemonWeight = pokemonData['weight'];
  let pokemonBaseExp = pokemonData['base_experience'];
  let pokemonAbility = pokemonData['abilities'][0]['ability']['name'];
  let movesCount = pokemonData['moves'];

  document.getElementById('pokemonList').innerHTML += /*html*/ `
    <div class="card m-2" style="width: 18rem;">
    <div class="card-body">
      <h3 class="card-title">${pokemonName}</h3>
      <h5 class="card-title">#${pokemonId}</h5>
    </div>
    <img src="${pokemonPic}" class="card-img-top pokemonPic">
    <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Profile
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <ul class="list-group list-group-flush">
      <li class="list-group-item">type: ${pokemonType}</li>
      <li class="list-group-item">height: ${pokemonHeight}0 cm</li>
      <li class="list-group-item">weight: ${pokemonWeight}0 g</li>
      <li class="list-group-item">base experience: ${pokemonBaseExp}</li>
      <li class="list-group-item">ability: ${pokemonAbility}</li>
      <li class="list-group-item">moves count: ${movesCount.length}</li>
    </ul>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      Base Stats
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <ul class="list-group list-group-flush">
      <li class="list-group-item">${pokemonStats[0]['stat']['name']} -> ${pokemonStats[0]['base_stat']}</li>
      <li class="list-group-item">${pokemonStats[1]['stat']['name']} -> ${pokemonStats[1]['base_stat']}</li>
      <li class="list-group-item">${pokemonStats[2]['stat']['name']} -> ${pokemonStats[2]['base_stat']}</li>
      <li class="list-group-item">${pokemonStats[3]['stat']['name']} -> ${pokemonStats[3]['base_stat']}</li>
      <li class="list-group-item">${pokemonStats[4]['stat']['name']} -> ${pokemonStats[4]['base_stat']}</li>
      <li class="list-group-item">${pokemonStats[5]['stat']['name']} -> ${pokemonStats[5]['base_stat']}</li>
    </ul>
   </div>
`
}



