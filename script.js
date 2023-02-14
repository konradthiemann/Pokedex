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
let openDetailActive;

function onload() {
  unlockOnscroll = 1
  getMaxPokemonNumber();
  loadPokemon();
}

async function getMaxPokemonNumber() {
  let response = await fetch(URL_MAX_POKEMON_NUMBER);
  maxPokemonJson = await response.json();

  maxPokemonNumber = maxPokemonJson['count'];

}

async function loadPokemon() {

  startLoadingScreen()

  // if (loadPokemonEndID > maxPokemonNumber) {
  //   loadPokemonEndID = maxPokemonNumber;
  // }

  for (loadPokemonStartID; loadPokemonStartID <= loadPokemonEndID; loadPokemonStartID++) {

    let singlePokemonUrl = (`${URL_API}` + `${loadPokemonStartID}`)
    let response = await fetch(singlePokemonUrl);
    let currentPokemon = await response.json();

    let singlePokemonUrlSpecies = (`${URL_POKEMON_SPECIES}` + `${loadPokemonStartID}`)
    let responseSpecies = await fetch(singlePokemonUrlSpecies);
    let currentPokemonSpecies = await responseSpecies.json();

    evolutionChainURL = currentPokemonSpecies.evolution_chain['url'];

    let currentPokemonName = currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);
    let currentPokemontypeOne = currentPokemon['types']['0']['type']['name'];

    document.getElementById('content').innerHTML += `
        <div class="pokemon" id="pokemon" onclick="chooseDetail(${currentPokemon['id']})">
          <div class="chooseDetail" id="showDetailOne${currentPokemon['id']}" onclick="openDetail('One', ${currentPokemon['id']})">
            About
          </div>
          <div class="chooseDetail" id="showDetailTwo${currentPokemon['id']}" onclick="openDetail('Two', ${currentPokemon['id']})">
            Stats
          </div>
          <div class="chooseDetail" id="showDetailThree${currentPokemon['id']}" onclick="openDetail('Three', ${currentPokemon['id']})">
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
         `;
    countAmountOfTypes(currentPokemon, loadPokemonStartID);
  }

  if (loadPokemonEndID >= maxPokemonNumber) {
  } else {
    unlockOnscroll = 1;
  }

  removeLoadingScreen();
}


function startLoadingScreen() {

  document.getElementById('loadingScreen').classList.remove('hide');
  document.getElementById('body').classList.add('overflowHidden');
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


  document.getElementById('content').innerHTML += `
  <div class="loadingScreen" id="detailBackground${currentPokemonId}">
    <div class="detailsSinglePokemon ${currentPokemontypeOne}" id="detailsSinglePokemon${currentPokemonId}">
      ${currentPokemonId}
      <img class="circle" src="img/types/${currentPokemontypeOne}.svg">
      <button class="close" onclick="closeDetails(${currentPokemonId})">close</button>
    </div>
  </div>
  `;
}

function chooseDetail(id) {
  if (toggleDetails[id] != 1 ) {
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
  if (openDetailActive != 1) {
    document.getElementById('showDetail' + number + id).classList.remove('showDetail' + number + id);
    document.getElementById('showDetail' + number + id).classList.add('openDetail');
    openDetailActive = 1;
  }else{
    document.getElementById('showDetail' + number + id).classList.remove('openDetail')
    document.getElementById('showDetail' + number + id).classList.add('showDetail' + number + id);
    openDetailActive = 0;
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

//evolution  https://pokeapi.co/api/v2/evolution-chain/1