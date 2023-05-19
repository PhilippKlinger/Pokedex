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