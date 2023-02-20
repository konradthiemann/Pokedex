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

async function getMaxPokemonNumber() {
  let response = await fetch(URL_MAX_POKEMON_NUMBER);
  maxPokemonJson = await response.json();

  maxPokemonNumber = maxPokemonJson['count'];

}

async function loadPokemon() {

  startLoadingScreen()

  for (loadPokemonStartID; loadPokemonStartID <= loadPokemonEndID; loadPokemonStartID++) {

    let singlePokemonUrl = (`${URL_API}` + `${loadPokemonStartID}`)
    let response = await fetch(singlePokemonUrl);
    let currentPokemon = await response.json();


    let currentPokemonName = currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);
    let currentPokemontypeOne = currentPokemon['types']['0']['type']['name'];

    document.getElementById('content').innerHTML += `
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
         `;
    countAmountOfTypes(currentPokemon, loadPokemonStartID);
  }

  if (loadPokemonEndID >= maxPokemonNumber) {
  } else {
    unlockOnscroll = 1;
  }

  removeLoadingScreen();
}

function returnPokemonHTML(){
  
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
  if (openDetailActive[id] != 1) {
    document.getElementById('showDetail' + number + id).classList.remove('showDetail' + number + id);
    document.getElementById('showDetail' + number + id).classList.add('openDetail');
    openDetailActive[id] = 1;
  }else{
    document.getElementById('showDetail' + number + id).classList.remove('openDetail')
    document.getElementById('showDetail' + number + id).classList.add('showDetail' + number + id);
    openDetailActive[id] = 0;
  }
}

function openAbout(number, id) {
  if (openDetailActive[id] != 1) {
    document.getElementById('showDetail' + number + id).classList.remove('showDetail' + number + id);
    document.getElementById('showDetail' + number + id).classList.add('openDetail');
    document.getElementById('showDetail' + number + id).innerHTML = `
    <div class="headlineDetails" id="headlineDetails">
      About
    </div>
    <div class="aboutValues" id="aboutValues${id}"></div>
    <div class="headlineEvolutionChain" id="headlineEvolutionChain">evolution chain</div>
    <div class="evolutionChain" id="evolutionChain${id}"></div>
    `;

    createAboutValues(id);
    createEvolutionChain(id);

    openDetailActive[id] = 1;
  }else{
    document.getElementById('showDetail' + number + id).classList.remove('openDetail')
    document.getElementById('showDetail' + number + id).classList.add('showDetail' + number + id);
    document.getElementById('showDetail' + number + id).innerHTML = `about`;
    openDetailActive[id] = 0;
  }
}

async function createAboutValues(id){
    let singlePokemonUrl = (`${URL_API}` + `${id}`)
    let response = await fetch(singlePokemonUrl);
    let currentPokemon = await response.json();

    document.getElementById('aboutValues'+ id).innerHTML += `
    <div class="aboutValue">
      <div class="valueName">
        height:
      </div>
      <div class="value">
        ${currentPokemon['height']}0cm
      </div>
    </div>
    `;

    document.getElementById('aboutValues'+ id).innerHTML += `
    <div class="aboutValue">
      <div class="valueName">
        weight:
      </div>
      <div class="value">
        ${currentPokemon['weight']}kg
      </div>
    </div>
    `;

    document.getElementById('aboutValues'+ id).innerHTML += `
    <div class="aboutValue">
      <div class="valueName">
        <span>abilities: </span>
      </div>
      <div class="value" id="abilities${id}">
      </div>
    </div>
    `;

    let abilities = '';
    for (let i = 0; i < currentPokemon['abilities'].length; i++) {
      let ability = currentPokemon['abilities'][i]['ability']['name'];
      abilities += `${ability}, `;
    }
    abilities = abilities.slice(0, -2);
    document.getElementById('abilities'+id).innerHTML = abilities;
}

async function createEvolutionChain(id){
    let singlePokemonUrlSpecies = (`${URL_POKEMON_SPECIES}` + id)
    let responseSpecies = await fetch(singlePokemonUrlSpecies);
    let currentPokemonSpecies = await responseSpecies.json();

    evolutionChainURL = currentPokemonSpecies.evolution_chain['url'];

    let singlePokemonEvolutionChain = (`${evolutionChainURL}`);
    let responseEvolutionChain = await fetch(singlePokemonEvolutionChain);
    let currentPokemonEvolutionChain = await responseEvolutionChain.json();

    let singlePokemonUrl = (`${URL_API}` + `${id}`)
    let response = await fetch(singlePokemonUrl);
    let currentPokemon = await response.json();

    let evolutionChain =  currentPokemonEvolutionChain['chain']['evolves_to'];
    
    if(evolutionChain.length == 0){
      let nameToUpperCase = currentPokemonEvolutionChain['chain']['species']['name'].charAt(0).toUpperCase() + currentPokemonEvolutionChain['chain']['species']['name'].slice(1);

      document.getElementById('evolutionChain'+ id).innerHTML += `
      <div class="evolutionChainPokemonContainer">
      ${nameToUpperCase}
      <img class="evoImg" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
      </div>
      `;
    }
    else if (evolutionChain[0]['evolves_to'].length == 0 ) {

      let baseEvolutionName = currentPokemonEvolutionChain['chain']['species']['name'];
      let firstEvolutionName = currentPokemonEvolutionChain['chain']['evolves_to'][0]['species']['name'];

      let baseEvolutionUrl = (`${URL_API}` + `${baseEvolutionName}`)
      let responseBaseEvolution = await fetch(baseEvolutionUrl);
      let baseEvolution = await responseBaseEvolution.json();

      let baseEvolutionPicture = baseEvolution['sprites']['other']['official-artwork']['front_default'];

      let firstEvolutionUrl = (`${URL_API}` + `${firstEvolutionName}`)
      let responseFirstEvolution = await fetch(firstEvolutionUrl);
      let firstEvolution = await responseFirstEvolution.json();

      let firstEvolutionPicture = firstEvolution['sprites']['other']['official-artwork']['front_default'];

      let baseEvolutionNameToUpperCase = baseEvolutionName.charAt(0).toUpperCase() + baseEvolutionName.slice(1);
      let firstEvolutionNameToUpperCase = firstEvolutionName.charAt(0).toUpperCase() + firstEvolutionName.slice(1);

      document.getElementById('evolutionChain'+ id).innerHTML += `
      <div class="evolutionChainPokemonContainer">
      ${baseEvolutionNameToUpperCase}
      <img class="evoImg" src="${baseEvolutionPicture}">
      </div>
      <div class="evolutionChainPokemonContainer">
      ${firstEvolutionNameToUpperCase}
      <img class="evoImg" src="${firstEvolutionPicture}">
      </div>
      `;
    }
    else if (evolutionChain[0]['evolves_to'].length > 0) {

      let baseEvolutionName = currentPokemonEvolutionChain['chain']['species']['name'];

      let baseEvolutionUrl = (`${URL_API}` + `${baseEvolutionName}`)
      let responseBaseEvolution = await fetch(baseEvolutionUrl);
      let baseEvolution = await responseBaseEvolution.json();

      let baseEvolutionPicture = baseEvolution['sprites']['other']['official-artwork']['front_default'];

      let firstEvolutionName = currentPokemonEvolutionChain['chain']['evolves_to'][0]['species']['name'];
      let secondEvolutionName = currentPokemonEvolutionChain['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];

      let firstEvolutionUrl = (`${URL_API}` + `${firstEvolutionName}`)
      let responseFirstEvolution = await fetch(firstEvolutionUrl);
      let firstEvolution = await responseFirstEvolution.json();

      let firstEvolutionPicture = firstEvolution['sprites']['other']['official-artwork']['front_default'];
      
      let secondEvolutionUrl = (`${URL_API}` + `${secondEvolutionName}`)
      let responseSecondEvolution = await fetch(secondEvolutionUrl);
      let secondEvolution = await responseSecondEvolution.json();

      let secondEvolutionPicture = secondEvolution['sprites']['other']['official-artwork']['front_default'];
      
      let baseEvolutionNameToUpperCase = baseEvolutionName.charAt(0).toUpperCase() + baseEvolutionName.slice(1);
      let firstEvolutionNameToUpperCase = firstEvolutionName.charAt(0).toUpperCase() + firstEvolutionName.slice(1);
      let secondEvolutionNameToUpperCase = secondEvolutionName.charAt(0).toUpperCase() + secondEvolutionName.slice(1);

      document.getElementById('evolutionChain'+ id).innerHTML += `
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
      `;
    }    
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
  }else{
    document.getElementById('showDetail' + number + id).classList.remove('openDetail')
    document.getElementById('showDetail' + number + id).classList.add('showDetail' + number + id);
    document.getElementById('showDetail' + number + id).innerHTML = `
    Stats
    `;
    openDetailActive[id] = 0;
  }
}

async function openMoves(number, id) {

  let singlePokemonUrl = (`${URL_API}` + `${id}`)
  let response = await fetch(singlePokemonUrl);
  let currentPokemon = await response.json();

  if (openDetailActive[id] != 1) {
    document.getElementById('showDetail' + number + id).classList.remove('showDetail' + number + id);
    document.getElementById('showDetail' + number + id).classList.add('openDetail');
    document.getElementById('showDetail' + number + id).innerHTML = `
    <div class="headlineDetails">Moves</div>
    <div class="containerForMoves" id="containerForMoves${id}"></div>
    `;

    for (let i = 0; i < currentPokemon['moves'].length; i++) {
      document.getElementById('containerForMoves' + id).innerHTML += `
      <div class="singleMove">
        ${currentPokemon['moves'][i]['move']['name']}
      </div>
    `; 
    } 

    openDetailActive[id] = 1;
  }else{
    document.getElementById('showDetail' + number + id).classList.remove('openDetail')
    document.getElementById('showDetail' + number + id).classList.add('showDetail' + number + id);
    document.getElementById('showDetail' + number + id).innerHTML = `
    Moves
    `;
    openDetailActive[id] = 0;
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
