async function loadPokemonData() {
  for (let i = pokemonContent.length; i < pokemonAmountToLoad; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    pokemonContent.push(responseAsJSON);
    checkPokemonContent();
  }
}

function checkPokemonContentLength() {
  if (pokemonContent.length === 50) {
    showPokemonList();
  }
}

function checkPokemonContentLength2() {
  if (pokemonContent.length > (pokemonRangeEnd + 50)) {
    document.getElementById('showMorePokemonButton').classList.remove('d-none');
  }
}

function showPokemonContentStatus() {
  document.getElementById('pokemonContentStatus').innerHTML = `${pokemonContent.length} von ${pokemonAmountToLoad}pokemon ready!`;
}

function checkPokemonContent() {
  checkPokemonContentLength();
  showPokemonContentStatus();
  checkPokemonContentLength2();
}

function showPokemonList() {
  for (let i = pokemonRangeStart; i < pokemonRangeEnd; i++) {
    const pokemon = pokemonContent[i];
    const { pokemonName, pokemonId, pokemonPic, pokemonType } = getPokemonInfo(pokemon);
    document.getElementById('pokemonList').innerHTML += generatePokemonListHTML(i, pokemonName, pokemonId, pokemonType);
    document.getElementById(`pokemonListPic${i}`).src = pokemonPic;
  }
  document.getElementById('showMorePokemonButton').classList.add('d-none');
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
  pokemonRangeEnd += 50;
  pokemonRangeStart = (pokemonRangeEnd - 50);
  showPokemonList();
  checkPokemonContentLength2();
  window.scrollTo(0, 99999);
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



///////////////////////////////////////////////////////////////////noch cleanen////////////////////////



function searchPokemonList() {
  let search = document.getElementById('searchbar').value;
  document.getElementById('showMorePokemonButton').classList.add('d-none');
  search = search.toLowerCase();

  if (search != '') {
    document.getElementById('pokemonList').innerHTML = '';
    for (let i = 0; i < pokemonContent.length; i++) {
      const pokemon = pokemonContent[i];
      const { pokemonName, pokemonId, pokemonPic, pokemonType } = getPokemonInfo(pokemon);
      if (pokemonName.toLowerCase().includes(search) || pokemonId.toString().includes(search) || pokemonType.toLowerCase().includes(search)) {
        document.getElementById('pokemonList').innerHTML += generatePokemonListHTML(i, pokemonName, pokemonId, pokemonType);
        document.getElementById(`pokemonListPic${i}`).src = pokemonPic;
      }
    }
  } else {
    alert('please fill in searchbar first!')
  }

  if (document.getElementById('pokemonList').innerHTML == '') {
    document.getElementById('pokemonList').innerHTML =
    /*html*/ `<div><h2>Sorry no results!</h2>
              <h5>if it's a valid search category your content is maybe not ready yet, try again later!</h5>
              <img src="./img/sad-pikachu.gif">
  </div>`;
    document.getElementById('pokemonList').innerHTML += ''
  }
}

function searchPokemonListByEnter() {
  let search = document.getElementById('searchbar');
  search.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchPokemonList();
    }
  });
}

function clearSearch() {
  pokemonRangeStart = 0;
  randomPokemon = [];
  searchbar.value = '';
  document.getElementById('pokemonList').innerHTML = '';
  showPokemonList();
}

function showRandomPokemon() {
  document.getElementById('pokemonList').innerHTML = '';
  randomPokemon = [];
  for (let i = 0; i < randomPokemonAmount; i++) {
    let x = Math.floor((Math.random() * pokemonContent.length) + 1);
    if (randomPokemon.includes(x) === false) {
      randomPokemon.push(x);
      const pokemon = pokemonContent[x];
      const { pokemonName, pokemonId, pokemonPic, pokemonType } = getPokemonInfo(pokemon);
      document.getElementById('pokemonList').innerHTML += generatePokemonListHTML(x, pokemonName, pokemonId, pokemonType);
      document.getElementById(`pokemonListPic${x}`).src = pokemonPic;
    } else {
      randomPokemonAmount++;
    }
  }
  document.getElementById('showMorePokemonButton').classList.add('d-none');
}
