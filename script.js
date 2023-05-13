async function loadPokemonData() {
  for (let i = pokemonContent.length; i < pokemonAmountToLoad; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    pokemonContent.push(responseAsJSON);
    checkPokemonContentLenght();
    showPokemonContentStatus();
  }
}

function checkPokemonContentLenght() {
  if (pokemonContent.length === 50) {
    showPokemonList();
  }
}

function showPokemonContentStatus() {
  document.getElementById('pokemonContentStatus').innerHTML = `${pokemonContent.length} von ${pokemonAmountToLoad }pokemon ready!`;
}

function showPokemonList() {
  for (let i = pokemonRangeStart; i < pokemonRangeEnd; i++) {
    const pokemon = pokemonContent[i];
    const { pokemonName, pokemonId, pokemonPic, pokemonType } = getPokemonInfo(pokemon);
    document.getElementById('pokemonList').innerHTML += generatePokemonListHTML(i, pokemonName, pokemonId, pokemonType);
    document.getElementById(`pokemonListPic${i}`).src = pokemonPic;
  }
}

function showPokemonDetails(i) {
  renderPokemonDetailCard(i);
  renderPokemonDetailContent(i);
}

function renderPokemonDetailCard(i) {
  const pokemon = pokemonContent[i];
  const { pokemonType } = getPokemonInfo(pokemon);
  document.getElementById('pokemonDetailOverlay').innerHTML = generatePokemonDetailCardHTML(i, pokemonType);
  document.getElementById('pokemonDetailCardProfile').classList.add('d-none');
  document.getElementById('pokemonDetailCardMoves').classList.add('d-none');
}

function renderPokemonDetailContent(i) {
  renderPokemonDetailCardHead(i);
  renderPokemonDetailCardProfile(i);
  renderPokemonDetailCardStats(i);
  renderPokemonDetailCardMoves(i);
}

function renderPokemonDetailCardHead(i) {
  const pokemon = pokemonContent[i];
  const { pokemonName, pokemonId, pokemonPic } = getPokemonInfo(pokemon);
  document.getElementById('pokemonDetailCardHead').innerHTML = generatePokemonCardDetailCardHeadHTML(pokemonName, pokemonId, pokemonPic);
  document.getElementById('pokemonDetailCardPic').src = pokemonPic;
}

function renderPokemonDetailCardProfile(i) {
  const pokemon = pokemonContent[i];
  const { movesCount, pokemonBaseExp, pokemonWeight, pokemonType, pokemonAbility, pokemonHeight } = getPokemonInfo(pokemon);
  document.getElementById('pokemonDetailCardProfile').innerHTML = generatePokemonCardDetailCardProfileHTML(movesCount, pokemonBaseExp, pokemonWeight, pokemonType, pokemonAbility, pokemonHeight);
}

function renderPokemonDetailCardStats(i) {
  const pokemon = pokemonContent[i];
  const { pokemonStats, pokemonType } = getPokemonInfo(pokemon);
  for (let j = 0; j < pokemonStats.length; j++) {
    let actualValue = ((100 / maxPokemonStats[j]) * pokemonStats[j]['base_stat']);
    document.getElementById('pokemonDetailCardStats').innerHTML += generatePokemonCardDetailCardStatsHTML(pokemonStats, pokemonType, actualValue, j);
  }
}

function renderPokemonDetailCardMoves(i) {
  const pokemon = pokemonContent[i];
  const { movesCount, pokemonType } = getPokemonInfo(pokemon);
  for (let j = 0; j < movesCount.length; j++) {
    document.getElementById('pokemonDetailCardMoves').innerHTML += generatePokemonCardDetailCardMovesHTML(movesCount, pokemonType, j);
  }
}

function showMorePokemon() {
  hideShowMorePokemon();
  showPokemonList();
  blockShowMorePokemon();
}

function hideShowMorePokemon() {
  pokemonRangeEnd += 50;
  document.getElementById('showMorePokemonButton').classList.add('d-none');
  document.getElementById('loadingSpinner').classList.remove('d-none');
  window.scrollTo(0, 99999);
  pokemonRangeStart = (pokemonRangeEnd - 50);
}

function blockShowMorePokemon() {
  window.scrollTo(0, 99999);
  document.getElementById('showMorePokemonButton').classList.remove('d-none');
  document.getElementById('loadingSpinner').classList.add('d-none');
}

function showNextPokemonDetailCard(i) {
  if (i == pokemonRangeEnd - 1) {
    i = 0;
  } else {
    i++;
  }
  showPokemonDetails(i);
}

function showPreviousPokemonDetailCard(i) {
  if (i > 0) {
    i--;
  } else {
    i = pokemonRangeEnd;
    i--;
  }
  showPokemonDetails(i);
}

function changeDetailContentToStats() {
  document.getElementById('pokemonDetailCardStats').classList.remove('d-none');
  document.getElementById('pokemonDetailCardProfile').classList.add('d-none');
  document.getElementById('pokemonDetailCardMoves').classList.add('d-none');
}

function changeDetailContentToProfile() {
  document.getElementById('pokemonDetailCardStats').classList.add('d-none');
  document.getElementById('pokemonDetailCardProfile').classList.remove('d-none');
  document.getElementById('pokemonDetailCardMoves').classList.add('d-none');
}

function changeDetailContentToMoves() {
  document.getElementById('pokemonDetailCardStats').classList.add('d-none');
  document.getElementById('pokemonDetailCardProfile').classList.add('d-none');
  document.getElementById('pokemonDetailCardMoves').classList.remove('d-none');
}

function searchPokemonList() {
  document.getElementById('pokemonList').innerHTML = '';
  let search = document.getElementById('searchbar').value;
  search = search.toLowerCase();
  for (let i = 0; i < pokemonContent.length; i++) {
    const pokemon = pokemonContent[i];
    const { pokemonName, pokemonId, pokemonPic, pokemonType } = getPokemonInfo(pokemon);
    if (pokemonName.toLowerCase().includes(search) || pokemonId.toString().includes(search) || pokemonType.toLowerCase().includes(search)) {
      document.getElementById('pokemonList').innerHTML += generatePokemonListHTML(i, pokemonName, pokemonId, pokemonType);
      document.getElementById(`pokemonListPic${i}`).src = pokemonPic;
    }
  }
}

function clearSearch() {
  pokemonRangeStart = 0;
  searchbar.value = '';
  document.getElementById('pokemonList').innerHTML = '';
  showPokemonList();
}