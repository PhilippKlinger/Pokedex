async function loadPokemonData() {
  await includeHTML();
  const batchSize = 10; // Adjust batch size as needed
  for (let i = 0; i < pokemonAmountToLoad; i += batchSize) {
    const batchUrls = [];
    for (let j = i; j < i + batchSize && j < pokemonAmountToLoad; j++) {
      batchUrls.push(`https://pokeapi.co/api/v2/pokemon/${j + 1}/`);
    }
    try {
      const responses = await Promise.all(batchUrls.map(url => fetch(url)));
      const jsonResponses = await Promise.all(responses.map(response => response.json()));
      jsonResponses.forEach(response => {
        pokemonContent.push(response);
        checkPokemonContent();
      });
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
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
  if (pokemonContent.length < 50) {
  document.getElementById('pokemonList').innerHTML = /*html*/ `<div class="noResultScreen"><h3>Please wait until the first 50 Pokemon are ready!</h3></div>`;
  }
  if (pokemonContent.length === 50) {
    document.getElementById('pokemonList').innerHTML = '';
    showPokemonList();
  }
}

function checkPokemonContentLength2() {
  if (pokemonContent.length > (pokemonRangeEnd + 50)) {
    document.getElementById('showMorePokemonButton').classList.remove('d-none');
  }
}

function showPokemonContentStatus() {
  document.getElementById('pokemonContentStatus').innerHTML = `${pokemonContent.length}|${pokemonAmountToLoad}`;
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