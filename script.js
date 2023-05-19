async function loadPokemonData() {
  await includeHTML();
  for (let i = pokemonContent.length; i < pokemonAmountToLoad; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    pokemonContent.push(responseAsJSON);
    checkPokemonContent();
  }
}

async function includeHTML() {
  let includeElements = document.querySelectorAll('[w3-include-html]');
  for (let i = 0; i < includeElements.length; i++) {
      const element = includeElements[i];
      file = element.getAttribute("w3-include-html");
      let resp = await fetch(file);
      if (resp.ok) {
          element.innerHTML = await resp.text();
      } else {
          element.innerHTML = 'Page not found';
      }
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
  document.getElementById('pokemonContentStatus').innerHTML = `${pokemonContent.length}/${pokemonAmountToLoad}`;
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