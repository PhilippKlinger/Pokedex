function generatePokemonListHTML(i, pokemonName, pokemonId, pokemonPic, pokemonType) {
  return  /*html*/ `
    <div onclick="showPokemonDetails(${i})" class="card m-2 ${pokemonType}-color pokemonCard" type="button" style="width: 12rem" data-bs-toggle="modal" data-bs-target="#PokemonDetailCardModal">
    <div class="card-body">
      <h4 class="card-title">${pokemonName}</h4>
  </div>
  <div class="pokemonListPic">
    <img src="./img/pokeball_bg1.png" class="pokemonListPicBg">
    <img src="${pokemonPic}" class="card-img-top pokemonPic" id="pokemonListPic${i}">
  </div>
  `
}

/** */

function generatePokemonDetailCardHTML(i, pokemonType, pokemonPic) {
  return /*html*/ `
    <div class="card m-2 shadow" style="width: 24rem;">
    <div class="card-body ${pokemonType}-color radius" id="pokemonDetailCardHead">
    </div>
    <div class="pokemonDetailCardButtons">
    <img src="./img/arrow-left.png" onclick="showPreviousPokemonDetailCard(${i})">               
    <img src="./img/arrow-right.png" onclick="showNextPokemonDetailCard(${i})">
  </div>
    <img class="card-img-top pokemonPicDetail" id="pokemonDetailCardPic">
  <div>
    <button onclick="changeDetailContentToProfile()">Stats</button>
    <button onclick="changeDetailContentToStats()">Profile</button>
    <button onclick="changeDetailContentTo">Evolution</button>
  </div>
    <div>
    <ul class="list-group list-group-flush" id="pokemonDetailCardProfile">
    </ul>
    </div>
    <div>
    <div class="" id="pokemonDetailCardStats">
      </div>
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

function generatePokemonCardDetailCardStasHTML(pokemonStats, pokemonType, actualValue, j) {
  return /*html*/ `
    <div class="">
    <p>${pokemonStats[j]['stat']['name']}</p>
      <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="${pokemonStats[j]['base_stat']}" aria-valuemin="0" aria-valuemax="${maxPokemonStats[j]}">
      <div class="progress-bar ${pokemonType}-color progress-bar-striped progress-bar-animated" style="width: ${actualValue}%">${pokemonStats[j]['base_stat']}</div>
  </div>
</div>`
}