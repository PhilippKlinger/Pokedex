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
    const pokemon = pokemonContent[i];
    const { pokemonName, pokemonId, pokemonPic, pokemonType } = getPokemonInfo(pokemon);
    document.getElementById('pokemonList').innerHTML += generatePokemonListHTML(i, pokemonName, pokemonId, pokemonPic, pokemonType);
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
}

function renderPokemonDetailContent(i) {
  renderPokemonDetailCardHead(i);
  renderPokemonDetailCardMiddle(i);
  renderPokemonDetailCardBottom(i);
}

function renderPokemonDetailCardHead(i) {
  const pokemon = pokemonContent[i];
  const { pokemonName, pokemonId, pokemonPic } = getPokemonInfo(pokemon);
  document.getElementById('pokemonDetailCardHead').innerHTML = generatePokemonCardDetailCardHeadHTML(pokemonName, pokemonId, pokemonPic);
  document.getElementById('pokemonDetailCardPic').src = pokemonPic;
}

function renderPokemonDetailCardMiddle(i) {
  const pokemon = pokemonContent[i];
  const { movesCount, pokemonBaseExp, pokemonWeight, pokemonType, pokemonAbility, pokemonHeight } = getPokemonInfo(pokemon);
  document.getElementById('pokemonDetailCardProfile').innerHTML = generatePokemonCardDetailCardProfileHTML(movesCount, pokemonBaseExp, pokemonWeight, pokemonType, pokemonAbility, pokemonHeight);
}

function renderPokemonDetailCardBottom(i) {
  const pokemon = pokemonContent[i];
  const { pokemonStats, pokemonType } = getPokemonInfo(pokemon);
  for (let j = 0; j < pokemonStats.length; j++) {
    let actualValue = ((100/maxPokemonStats[j])*pokemonStats[j]['base_stat']);
    document.getElementById('pokemonDetailCardStats').innerHTML += generatePokemonCardDetailCardStasHTML(pokemonStats, pokemonType, actualValue, j);
  }
}

async function loadMorePokemon() {
  hideLoadMorePokemon();
  await loadPokemonData();
  showLoadMorePokemon();
}

function hideLoadMorePokemon() {
  document.getElementById('showMorePokemonButton').classList.add('d-none');
  document.getElementById('loadingSpinner').classList.remove('d-none');
  window.scrollTo(0, 99999);
  pokemonRange += 20;
  pokemonCount += 20;
}

function showLoadMorePokemon() {
  window.scrollTo(0, 99999);
  document.getElementById('showMorePokemonButton').classList.remove('d-none');
  document.getElementById('loadingSpinner').classList.add('d-none');
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

function changeDetailContentToStats() {
  document.getElementById('pokemonDetailCardStats').classList.add('d-none');
  document.getElementById('pokemonDetailCardProfile').classList.remove('d-none');
}

function changeDetailContentToProfile() {
  document.getElementById('pokemonDetailCardStats').classList.remove('d-none');
  document.getElementById('pokemonDetailCardProfile').classList.add('d-none');
}



/**
 * function searchPokemonList() {
  document.getElementById('pokemonList').innerHTML = '';
  let search = document.getElementById('searchbar').value;
  
  for (let i = pokemonRange; i < pokemonContent.length; i++) {
    const pokemonToSearch = pokemonContent[i]['name'];
    pokemonToSearchArr.push(pokemonToSearch);
    if (pokemonToSearchArr.includes(search)) {
      console.log(pokemonToSearchArr);
    }
  }
}


*function firstLetter(string){
return string.charAt(0).toUpperCase() + string.slice(1);

}

 */