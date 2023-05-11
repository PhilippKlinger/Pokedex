function generatePokemonListHTML(i, pokemonName, pokemonPic, pokemonType) {
  return  /*html*/ `
    <div onclick="showPokemonDetails(${i})" class="card m-2 ${pokemonType}-color pokemonCard" type="button" style="width: 12rem" data-bs-toggle="modal" data-bs-target="#PokemonDetailCardModal">
    <div class="card-body">
      <h4 class="card-title">${pokemonName}</h4>
  </div>
  <div class="pokemonListPic">
    <img src="./img/pokeball_bg1.png" class="pokemonListPicBg">
    <img src="${pokemonPic}" class="card-img-top pokemonPic">
  </div>
  `
}

function generatePokemonDetailCardHTML(i, pokemonType) {
  return /*html*/ `
    <div class="card m-2 shadow">
    <div class="card-body ${pokemonType}-color radius" id="pokemonDetailCardHead">
    </div>
    <div class="pokemonDetailCardButtons">
    <img src="./img/arrow-left.png" onclick="showPreviousPokemonDetailCard(${i})">               
    <img src="./img/arrow-right.png" onclick="showNextPokemonDetailCard(${i})">
  </div>
    <img class="card-img-top pokemonPicDetail" id="pokemonDetailCardPic">
  <div class="detailCardBtnSection">
    <button id="statsBtn" class="btn btn-secondary" onclick="changeDetailContentToStats()">Stats</button>
    <button id="profileBtn" class="btn btn-secondary" onclick="changeDetailContentToProfile()">Profile</button>
    <button id="movesBtn" class="btn btn-secondary" onclick="changeDetailContentToMoves()">Moves</button>
  </div>
    <div>
    <ul class="list-group list-group-flush p-2 pokemonDetailCardProfile" id="pokemonDetailCardProfile">
    </ul>
    </div>
    <div>
    <div class="pokemonDetailCardStats p-3" id="pokemonDetailCardStats">
      </div>
    </div>
    <div>
    <div class="pokemonDetailCardMoves p-3" id="pokemonDetailCardMoves">
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
    <li class="list-group-item">height: ${(pokemonHeight/10)}m</li>
    <li class="list-group-item">weight: ${(pokemonWeight/10)}kg</li>
    <li class="list-group-item">base-experience: ${pokemonBaseExp}</li>
    <li class="list-group-item">ability: ${pokemonAbility}</li>
    <li class="list-group-item">moves-count: ${movesCount.length}</li>`
}

function generatePokemonCardDetailCardStatsHTML(pokemonStats, pokemonType, actualValue, j) {
  return /*html*/ `
    <div class="progressbarSection">
    <p>${pokemonStats[j]['stat']['name']}</p>
      <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="${pokemonStats[j]['base_stat']}" aria-valuemin="0" aria-valuemax="${maxPokemonStats[j]}">
      <div class="progress-bar ${pokemonType}-color progress-bar-striped progress-bar-animated" style="width: ${actualValue}%">${pokemonStats[j]['base_stat']}</div>
  </div>
</div>`
}

function generatePokemonCardDetailCardMovesHTML(movesCount, pokemonType, j) {
  return /*html*/ `
  <p class="${pokemonType}-color mb-1">${movesCount[j]['move']['name']}</p>
  `
}