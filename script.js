const URL_MAX_POKEMON_NUMBER = 'https://pokeapi.co/api/v2/pokemon/';
const URL_API = 'https://pokeapi.co/api/v2/pokemon/';
const URL_POKEMON_SPECIES = 'https://pokeapi.co/api/v2/pokemon-species/';

let evolutionChainURL;
let maxPokemonNumber;

let loadPokemonEndID = 20;
let loadPokemonStartID = 1;

let unlockOnscroll; //lock and unlock onscroll function

let toggleDetails = [];
let detailTrigger;
let openDetailActive = [];

function onload() {
  unlockOnscroll = 1
  getMaxPokemonNumber();
  loadPokemon();
}

async function createCurrentPokemon(id) {
  let singlePokemonUrl = (`${URL_API}` + `${id}`)
  let response = await fetch(singlePokemonUrl);
  let currentPokemon = await response.json();

  return currentPokemon;
}

async function createCurrentPokemonEvolutionChain(evolutionChainURL) {
  let singlePokemonEvolutionChain = (`${evolutionChainURL}`);
  let responseEvolutionChain = await fetch(singlePokemonEvolutionChain);
  let currentPokemonEvolutionChain = await responseEvolutionChain.json();

  return currentPokemonEvolutionChain;
}

async function createCurrentPokemonSpecies(id) {
  let singlePokemonUrlSpecies = (`${URL_POKEMON_SPECIES}` + id)
  let responseSpecies = await fetch(singlePokemonUrlSpecies);
  let currentPokemonSpecies = await responseSpecies.json();

  return currentPokemonSpecies;
}

async function getMaxPokemonNumber() {
  let response = await fetch(URL_MAX_POKEMON_NUMBER);
  maxPokemonJson = await response.json();

  maxPokemonNumber = maxPokemonJson['count'];

}

async function loadPokemon() {

  startLoadingScreen()

  for (loadPokemonStartID; loadPokemonStartID <= loadPokemonEndID; loadPokemonStartID++) {

    let currentPokemon = await createCurrentPokemon(loadPokemonStartID);

    let currentPokemonName = currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);
    let currentPokemontypeOne = currentPokemon['types']['0']['type']['name'];

    document.getElementById('content').innerHTML += returnPokemonHTML(currentPokemon, currentPokemontypeOne, loadPokemonStartID, currentPokemonName);
    countAmountOfTypes(currentPokemon, loadPokemonStartID);
  }

  checkOnscroll();
  removeLoadingScreen();
}

function startLoadingScreen() {

  document.getElementById('loadingScreen').classList.remove('hide');
  document.getElementById('body').classList.add('overflowHidden');
}

function returnPokemonHTML(currentPokemon, currentPokemontypeOne, loadPokemonStartID, currentPokemonName) {
  return `
  <div class="pokemon" id="pokemon" onclick="chooseDetail(${currentPokemon['id']})">
    <div class="chooseDetail" id="showDetailOne${currentPokemon['id']}" onclick="openAbout('One', ${currentPokemon['id']})">
      About
    </div>
    <div class="chooseDetail" id="showDetailTwo${currentPokemon['id']}" onclick="openStats('Two', ${currentPokemon['id']})">
      Stats
    </div>
    <div class="chooseDetail" id="showDetailThree${currentPokemon['id']}" onclick="openMoves('Three', ${currentPokemon['id']})">
      Moves
    </div>
    <div class="container" id="container">
      <div class="container-inner">
        <img class="circle" src="img/types/${currentPokemontypeOne}.svg">
        <img class="img img1" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">           
      </div>            
    </div>
    
    <div class="pokemonTypes" id="PokemonTypes${loadPokemonStartID}"></div>
    <div class="divider"></div>
      <div class="name">${currentPokemonName}</div>
      <div class="title">#${currentPokemon['id']}</div>
  </div>
   `
}

function checkOnscroll() {
  if (loadPokemonEndID >= maxPokemonNumber) {
  } else {
    unlockOnscroll = 1;
  }
}

function removeLoadingScreen() {
  document.getElementById('loadingScreen').classList.add('hide');
  document.getElementById('body').classList.remove('overflowHidden');
}

async function showDetails(currentPokemonId) {
  document.getElementById('body').classList.add('overflowHidden');

  let singlePokemonUrl = (`${URL_API}` + `${currentPokemonId}`)
  let response = await fetch(singlePokemonUrl);
  let currentPokemon = await response.json();

  let currentPokemontypeOne = currentPokemon['types']['0']['type']['name'];


  document.getElementById('content').innerHTML += showDetailHTML(currentPokemonId, currentPokemontypeOne);
}

function showDetailHTML(currentPokemonId, currentPokemontypeOne) {
  return `
  <div class="loadingScreen" id="detailBackground${currentPokemonId}">
    <div class="detailsSinglePokemon ${currentPokemontypeOne}" id="detailsSinglePokemon${currentPokemonId}">
      ${currentPokemonId}
      <img class="circle" src="img/types/${currentPokemontypeOne}.svg">
      <button class="close" onclick="closeDetails(${currentPokemonId})">close</button>
    </div>
  </div>
  `
}

function chooseDetail(id) {
  if (toggleDetails[id] != 1) {
    document.getElementById('showDetailOne' + id).classList.add('showDetailOne');
    document.getElementById('showDetailTwo' + id).classList.add('showDetailTwo');
    document.getElementById('showDetailThree' + id).classList.add('showDetailThree');
    toggleDetails[id] = 1;
  } else {
    document.getElementById('showDetailOne' + id).classList.remove('showDetailOne');
    document.getElementById('showDetailTwo' + id).classList.remove('showDetailTwo');
    document.getElementById('showDetailThree' + id).classList.remove('showDetailThree');
    toggleDetails[id] = 0;
  }
}

function openDetail(number, id) {
  if (openDetailActive[id] != 1) {
    document.getElementById('showDetail' + number + id).classList.remove('showDetail' + number + id);
    document.getElementById('showDetail' + number + id).classList.add('openDetail');
    openDetailActive[id] = 1;
  } else {
    document.getElementById('showDetail' + number + id).classList.remove('openDetail')
    document.getElementById('showDetail' + number + id).classList.add('showDetail' + number + id);
    openDetailActive[id] = 0;
  }
}

function openAbout(number, id) {
  if (openDetailActive[id] != 1) {
    document.getElementById('showDetail' + number + id).classList.remove('showDetail' + number + id);
    document.getElementById('showDetail' + number + id).classList.add('openDetail');
    document.getElementById('showDetail' + number + id).innerHTML = aboutHTML(id);

    createAboutValues(id);
    createEvolutionChain(id);

    openDetailActive[id] = 1;
  } else {
    document.getElementById('showDetail' + number + id).classList.remove('openDetail')
    document.getElementById('showDetail' + number + id).classList.add('showDetail' + number + id);
    document.getElementById('showDetail' + number + id).innerHTML = `about`;
    openDetailActive[id] = 0;
  }
}

function aboutHTML(id) {
  return `
  <div class="headlineDetails" id="headlineDetails">
    About
  </div>
  <div class="aboutValues" id="aboutValues${id}"></div>
  <div class="headlineEvolutionChain" id="headlineEvolutionChain">evolution chain</div>
  <div class="evolutionChain" id="evolutionChain${id}"></div>
  `
}

async function createAboutValues(id) {

  let currentPokemon = await createCurrentPokemon(id);

  document.getElementById('aboutValues' + id).innerHTML += createAboutValuesHTML(currentPokemon, 'height');
  document.getElementById('aboutValues' + id).innerHTML += createAboutValuesHTML(currentPokemon, 'weight');
  document.getElementById('aboutValues' + id).innerHTML += createAboutValueAbilitiesHTML('abilities', id);

  loadAbilities(currentPokemon, id);
}

function createAboutValuesHTML(currentPokemon, aboutValueName) {
  return `
  <div class="aboutValue">
    <div class="valueName">
      ${aboutValueName}:
    </div>
    <div class="value">
      ${currentPokemon[aboutValueName]}kg
    </div>
  </div>
  `
}

function createAboutValueAbilitiesHTML(aboutValueName, id) {
  return `
  <div class="aboutValue">
    <div class="valueName">
      ${aboutValueName}:
    </div>
    <div class="value" id="${aboutValueName}${id}">
    </div>
  </div>
  `
}

function loadAbilities(currentPokemon, id) {
  let abilities = '';
  for (let i = 0; i < currentPokemon['abilities'].length; i++) {
    let ability = currentPokemon['abilities'][i]['ability']['name'];
    abilities += `${ability}, `;
  }
  abilities = abilities.slice(0, -2);
  document.getElementById('abilities' + id).innerHTML = abilities;
}

async function createEvolutionChain(id) {

  let currentPokemonSpecies = await createCurrentPokemonSpecies(id);

  evolutionChainURL = currentPokemonSpecies.evolution_chain['url'];

  let currentPokemonEvolutionChain = await createCurrentPokemonEvolutionChain(evolutionChainURL);
  let currentPokemon = await createCurrentPokemon(id);
  let evolutionChain = currentPokemonEvolutionChain['chain']['evolves_to'];

  if (evolutionChain.length == 0) {
    noEvolutionChain(currentPokemonEvolutionChain, currentPokemon, id);
  }
  else if (evolutionChain[0]['evolves_to'].length == 0) {
    oneEvolutionChain(currentPokemonEvolutionChain, id);
  }
  else if (evolutionChain[0]['evolves_to'].length > 0) {
    twoEvolutionChains(currentPokemonEvolutionChain, id);
  }
}

function noEvolutionChain(currentPokemonEvolutionChain, currentPokemon, id) {

  let nameToUpperCase = currentPokemonEvolutionChain['chain']['species']['name'].charAt(0).toUpperCase() + currentPokemonEvolutionChain['chain']['species']['name'].slice(1);

  document.getElementById('evolutionChain' + id).innerHTML += createNoEvolutionChainHTML(nameToUpperCase, currentPokemon);
}

async function oneEvolutionChain(currentPokemonEvolutionChain, id) {
  let baseEvolutionName = currentPokemonEvolutionChain['chain']['species']['name'];
    let firstEvolutionName = currentPokemonEvolutionChain['chain']['evolves_to'][0]['species']['name'];

    let baseEvolution = await createCurrentPokemon(baseEvolutionName);
    let baseEvolutionPicture = baseEvolution['sprites']['other']['official-artwork']['front_default'];

    let firstEvolution = await createCurrentPokemon(firstEvolutionName);
    let firstEvolutionPicture = firstEvolution['sprites']['other']['official-artwork']['front_default'];

    let baseEvolutionNameToUpperCase = baseEvolutionName.charAt(0).toUpperCase() + baseEvolutionName.slice(1);
    let firstEvolutionNameToUpperCase = firstEvolutionName.charAt(0).toUpperCase() + firstEvolutionName.slice(1);

    document.getElementById('evolutionChain' + id).innerHTML += createEvolutionChainOne(baseEvolutionNameToUpperCase, baseEvolutionPicture, firstEvolutionNameToUpperCase, firstEvolutionPicture);
}

async function twoEvolutionChains(currentPokemonEvolutionChain, id) {
  
  let baseEvolutionName = currentPokemonEvolutionChain['chain']['species']['name'];

  let baseEvolution = await createCurrentPokemon(baseEvolutionName);
  let baseEvolutionPicture = baseEvolution['sprites']['other']['official-artwork']['front_default'];

  let firstEvolutionName = currentPokemonEvolutionChain['chain']['evolves_to'][0]['species']['name'];
  let secondEvolutionName = currentPokemonEvolutionChain['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];

  let firstEvolution = await createCurrentPokemon(firstEvolutionName);
  let firstEvolutionPicture = firstEvolution['sprites']['other']['official-artwork']['front_default'];

  let secondEvolution = await createCurrentPokemon(secondEvolutionName);
  let secondEvolutionPicture = secondEvolution['sprites']['other']['official-artwork']['front_default'];

  let baseEvolutionNameToUpperCase = baseEvolutionName.charAt(0).toUpperCase() + baseEvolutionName.slice(1);
  let firstEvolutionNameToUpperCase = firstEvolutionName.charAt(0).toUpperCase() + firstEvolutionName.slice(1);
  let secondEvolutionNameToUpperCase = secondEvolutionName.charAt(0).toUpperCase() + secondEvolutionName.slice(1);

  document.getElementById('evolutionChain' + id).innerHTML += createEvolutionChainTwo(baseEvolutionNameToUpperCase, baseEvolutionPicture, firstEvolutionNameToUpperCase, firstEvolutionPicture, secondEvolutionNameToUpperCase, secondEvolutionPicture);

}

function createNoEvolutionChainHTML(nameToUpperCase, currentPokemon) {
  return `
  <div class="evolutionChainPokemonContainer">
  ${nameToUpperCase}
  <img class="evoImg" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
  </div>
  `
}

function createEvolutionChainOne(baseEvolutionNameToUpperCase, baseEvolutionPicture, firstEvolutionNameToUpperCase, firstEvolutionPicture) {
  return `
  <div class="evolutionChainPokemonContainer">
  ${baseEvolutionNameToUpperCase}
  <img class="evoImg" src="${baseEvolutionPicture}">
  </div>
  <div class="evolutionChainPokemonContainer">
  ${firstEvolutionNameToUpperCase}
  <img class="evoImg" src="${firstEvolutionPicture}">
  </div>
  `
}

function createEvolutionChainTwo(baseEvolutionNameToUpperCase, baseEvolutionPicture, firstEvolutionNameToUpperCase, firstEvolutionPicture, secondEvolutionNameToUpperCase, secondEvolutionPicture) {
  return `
  <div class="evolutionChainPokemonContainer">
  ${baseEvolutionNameToUpperCase}
  <img class="evoImg" src="${baseEvolutionPicture}">
  </div>
  <div class="evolutionChainPokemonContainer">
    ${firstEvolutionNameToUpperCase}
    <img class="evoImg" src="${firstEvolutionPicture}">
  </div>  
  <div class="evolutionChainPokemonContainer">
  ${secondEvolutionNameToUpperCase}
  <img class="evoImg" src="${secondEvolutionPicture}">
  </div>
  `
}

function openStats(number, id) {

  if (openDetailActive[id] != 1) {
    document.getElementById('showDetail' + number + id).classList.remove('showDetail' + number + id);
    document.getElementById('showDetail' + number + id).classList.add('openDetail');
    document.getElementById('showDetail' + number + id).innerHTML = `
    <div class="headlineDetails">Stats</div>
    <canvas id="myChart${id}"></canvas>
    `;
    createChart(id);
    openDetailActive[id] = 1;
  } else {
    document.getElementById('showDetail' + number + id).classList.remove('openDetail')
    document.getElementById('showDetail' + number + id).classList.add('showDetail' + number + id);
    document.getElementById('showDetail' + number + id).innerHTML = `
    Stats
    `;
    openDetailActive[id] = 0;
  }
}

async function openMoves(number, id) {

  let currentPokemon = await createCurrentPokemon(id);

  if (openDetailActive[id] != 1) {
    document.getElementById('showDetail' + number + id).classList.remove('showDetail' + number + id);
    document.getElementById('showDetail' + number + id).classList.add('openDetail');
    document.getElementById('showDetail' + number + id).innerHTML = createMovesHTML(id);

    addMoves(currentPokemon, id);
    openDetailActive[id] = 1;
  } else {
    document.getElementById('showDetail' + number + id).classList.remove('openDetail');
    document.getElementById('showDetail' + number + id).classList.add('showDetail' + number + id);
    document.getElementById('showDetail' + number + id).innerHTML = `Moves`;
    openDetailActive[id] = 0;
  }
}

function createMovesHTML(id){
  return `
  <div class="headlineDetails">Moves</div>
  <div class="containerForMoves" id="containerForMoves${id}"></div>
  `
}

function addMoves(currentPokemon, id){
  for (let i = 0; i < currentPokemon['moves'].length; i++) {
    document.getElementById('containerForMoves' + id).innerHTML += `
    <div class="singleMove">
      ${currentPokemon['moves'][i]['move']['name']}
    </div>
  `;
  }
}

function closeDetails(currentPokemonId) {
  console.log('!')
  document.getElementById('detailBackground' + currentPokemonId).remove();
  document.getElementById('body').classList.remove('overflowHidden');
  // document.getElementById('detailsSinglePokemon'+currentPokemonId).remove();
}


function countAmountOfTypes(currentPokemon, loadPokemonStartID) {

  let currentPokemonTypes = currentPokemon['types'];

  for (let i = 0; i < currentPokemonTypes.length; i++) {
    let currentType = currentPokemon['types'][i]['type']['name'];

    document.getElementById('PokemonTypes' + loadPokemonStartID).innerHTML += `
    <div class="singlePokemonType ${currentType}">${currentType}</div>
    `;
  }
}


function search() {
  var input = document.getElementById("search");
  var filter = input.value.toLowerCase();
  var nodes = document.getElementsByClassName('pokemon');

  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].innerText.toLowerCase().includes(filter)) {
      nodes[i].style.display = "flex";
    } else {
      nodes[i].style.display = "none";
    }
  }
}


window.onscroll = function () {
  if (unlockOnscroll == 1) {
    if ((window.innerHeight + window.scrollY + 5) >= document.body.offsetHeight) {
      // you're at the bottom of the page
      unlockOnscroll = 0;
      loadPokemonStartID = +loadPokemonEndID + 1;
      loadPokemonEndID = +loadPokemonEndID + 30;
      loadPokemon();
    }
  };
}
