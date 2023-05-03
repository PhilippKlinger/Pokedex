let pokemonRange = 0;
let pokemonCount = 20;
let pokemonContent = [];
let pokemonAmount = 1010;

async function loadPokemonData() {
  for (let i = pokemonRange; i < pokemonCount; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    pokemonContent.push(responseAsJSON);
  }
  showPokemonList();
}

function showPokemonList() {
  for (let i = pokemonRange; i < pokemonContent.length; i++) {
    let pokemonName = pokemonContent[i]['name'];
    let pokemonId = pokemonContent[i]['id'];
    let pokemonPic = pokemonContent[i]['sprites']['other']['home']['front_shiny'];
    let pokemonType = pokemonContent[i]['types'][0]['type']['name'];
    document.getElementById('pokemonList').innerHTML += generatePokemonListHTML(i, pokemonName, pokemonId, pokemonPic, pokemonType);
  }
}

function showPokemonDetails(i) {
  renderPokemonDetailCard(i);
  renderPokemonDetailContent(i);
}

function renderPokemonDetailCard(i) {
  let pokemonType = pokemonContent[i]['types'][0]['type']['name'];
  document.getElementById('pokemonDetailOverlay').innerHTML = generatePokemonDetailCardHTML(i, pokemonType);
}

function renderPokemonDetailContent(i) {
  renderPokemonDetailCardHead(i);
  renderPokemonDetailCardMiddle(i);
  renderPokemonDetailCardBottom(i);
}

function renderPokemonDetailCardHead(i) {
  let pokemonName = pokemonContent[i]['name'];
  let pokemonId = pokemonContent[i]['id'];
  let pokemonPic = pokemonContent[i]['sprites']['other']['home']['front_shiny'];
  document.getElementById('pokemonDetailCardHead').innerHTML = generatePokemonCardDetailCardHeadHTML(pokemonName, pokemonId);
  document.getElementById('pokemonDetailCardPic').src = pokemonPic;
}

function renderPokemonDetailCardMiddle(i) {
  let pokemonType = pokemonContent[i]['types'][0]['type']['name'];
  let pokemonAbility = pokemonContent[i]['abilities'][0]['ability']['name'];
  let pokemonHeight = pokemonContent[i]['height'];
  let pokemonWeight = pokemonContent[i]['weight'];
  let pokemonBaseExp = pokemonContent[i]['base_experience'];
  let movesCount = pokemonContent[i]['moves'];
  document.getElementById('pokemonDetailCardProfile').innerHTML = generatePokemonCardDetailCardProfileHTML(movesCount, pokemonBaseExp, pokemonWeight, pokemonType, pokemonAbility, pokemonHeight);
}

function renderPokemonDetailCardBottom(i) {
  let pokemonStats = pokemonContent[i]['stats'];
  for (let j = 0; j < pokemonStats.length; j++) {
    document.getElementById('pokemonDetailCardStats').innerHTML += generatePokemonCardDetailCardStasHTML(pokemonStats, j);
  }
}

function loadMorePokemon() {
  pokemonRange += 20;
  pokemonCount += 20;
  loadPokemonData();
  document.getElementById('showMorePokemonButton').classList.add('d-none');
  document.getElementById('loadingSpinner').classList.remove('d-none');
}

function showNextPokemonDetailCard(i) {
  if (i == (pokemonContent.length - 1)) {
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
    i = pokemonContent.length;
    i--;
  }
  showPokemonDetails(i);
}