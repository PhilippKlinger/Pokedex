let pokemonCount = 5;
let pokemonData;



async function loadAllPokemon() {
    for (let i = 0; i < pokemonCount; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i+1}/`;
        let response = await fetch(url);
        pokemonData = await response.json();
        console.log(pokemonData);
        showPokemon();
    }
}

function showPokemon() {
    let pokemonName = pokemonData['name'];
    let pokemonId = pokemonData['id'];
    let pokemonPic = pokemonData['sprites']['other']['home']['front_shiny'];
    let pokemonStats = pokemonData['stats'];
    
    document.getElementById('pokemonList').innerHTML += `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h2 class="card-title">${pokemonName}</h2>
      <h5 class="card-title">#${pokemonId}</h5>
     
    </div>
    <img src="${pokemonPic}" class="card-img-top"height=200px>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">${pokemonStats[0]['stat']['name']}</li>
      <li class="list-group-item">${pokemonStats[1]['stat']['name']}</li>
      <li class="list-group-item">${pokemonStats[2]['stat']['name']}</li>
      <li class="list-group-item">${pokemonStats[3]['stat']['name']}</li>
      <li class="list-group-item">${pokemonStats[4]['stat']['name']}</li>
      <li class="list-group-item">${pokemonStats[5]['stat']['name']}</li>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>`
}


