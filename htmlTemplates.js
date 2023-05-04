function generatePokemonListHTML(i, pokemonName, pokemonId, pokemonPic, pokemonType) {
  return  /*html*/ `
    <div onclick="showPokemonDetails(${i})" class="card m-2 ${pokemonType}-color pokemonCard" type="button" style="width: 12rem" data-bs-toggle="modal" data-bs-target="#PokemonDetailCardModal">
    <div class="card-body">
      <h3 class="card-title">${pokemonName}</h3>
      <h5 class="card-title">#${pokemonId} ${pokemonType}</h5>
  </div>
  <img src="${pokemonPic}" class="card-img-top pokemonPic" id="pokemonListPic${i}">`
}

/** */

function generatePokemonDetailCardHTML(i, pokemonType) {
  return /*html*/ `
    <div>
    <button onclick="showPreviousPokemonDetailCard(${i})">back</button>               
    <button onclick="showNextPokemonDetailCard(${i})">next</button>
    </div>
    <div class="card m-2" style="width: 20rem;">
    <div class="card-body ${pokemonType}-color radius" id="pokemonDetailCardHead">
    </div>
    <img class="card-img-top pokemonPicDetail" id="pokemonDetailCardPic">
    <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Profile
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <ul class="list-group list-group-flush" id="pokemonDetailCardProfile">
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
      <ul class="list-group list-group-flush" id="pokemonDetailCardStats">
    </ul>
   </div>
  `
}

function generatePokemonCardDetailCardHeadHTML(pokemonName, pokemonId) {
  return /*html*/ `
    <h3 class="card-title">${pokemonName}</h3>
    <h5 class="card-title">#${pokemonId}</h5>`
}

function generatePokemonCardDetailCardProfileHTML(movesCount, pokemonBaseExp, pokemonWeight, pokemonType, pokemonAbility, pokemonHeight) {
  return /*html*/  `
    <li class="list-group-item">type: ${pokemonType}</li>
    <li class="list-group-item">height: ${pokemonHeight}0 cm</li>
    <li class="list-group-item">weight: ${pokemonWeight}0 g</li>
    <li class="list-group-item">base experience: ${pokemonBaseExp}</li>
    <li class="list-group-item">ability: ${pokemonAbility}</li>
    <li class="list-group-item">moves count: ${movesCount.length}</li>`
}

function generatePokemonCardDetailCardStasHTML(pokemonStats, j) {
  return /*html*/ `<li class="list-group-item">${pokemonStats[j]['stat']['name']} -> ${pokemonStats[j]['base_stat']}</li>`
}