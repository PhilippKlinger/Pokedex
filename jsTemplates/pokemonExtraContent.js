function searchPokemonList() {
    let search = document.getElementById('searchbar').value;
    document.getElementById('pokemonLoadingBtn').classList.add('d-none');
    search = search.toLowerCase();
    checkIfEmpty(search);
    noSearchResult();
  }
  
  function checkIfEmpty(search) {
    if (search != '') {
      document.getElementById('pokemonList').innerHTML = '';
      renderSearchContent(search);
    } else {
      alert('please fill in searchbar first!')
    }
  }
  
  function renderSearchContent(search) {
    for (let i = 0; i < pokemonContent.length; i++) {
      const pokemon = pokemonContent[i];
      const { pokemonName, pokemonId, pokemonPic, pokemonType } = getPokemonInfo(pokemon);
      if (pokemonName.toLowerCase().includes(search) || pokemonId.toString().includes(search) || pokemonType.toLowerCase().includes(search)) {
        document.getElementById('pokemonList').innerHTML += generatePokemonListHTML(i, pokemonName, pokemonId, pokemonType);
        document.getElementById(`pokemonListPic${i}`).src = pokemonPic;
      }
    }
  }
  
  function noSearchResult() {
    if (document.getElementById('pokemonList').innerHTML == '') {
      document.getElementById('pokemonList').innerHTML = generateNoResultScreenHTML();
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
    document.getElementById('pokemonLoadingBtn').classList.remove('d-none');
    document.getElementById('showMorePokemonButton').classList.remove('d-none');
    showPokemonList();
  }
  
  function showRandomPokemon() {
    document.getElementById('pokemonList').innerHTML = '';
    document.getElementById('pokemonLoadingBtn').classList.add('d-none');
    randomPokemon = [];
    let randomPokemonAmount = 50;
    renderRandomPokemon(randomPokemonAmount);
  }
  
  function renderRandomPokemon(randomPokemonAmount) {
    for (let i = 0; i < randomPokemonAmount; i++) {
      let x = Math.floor((Math.random() * (pokemonContent.length -1)) + 1);
      checkIfRandomPokemonIsPresent(randomPokemonAmount, x);
    }
  }
  
  function checkIfRandomPokemonIsPresent(randomPokemonAmount, x) {
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
  