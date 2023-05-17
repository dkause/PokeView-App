
let pokemonRepository = (function () {
  // An empty pokemon list
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=77";

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // return all users
  function getAll() {
    return pokemonList;
  }

  
// Add Button
  function addlistItem(pokemon) {
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    $(button).addClass("btn btn-primary");
    $(button).attr("type", "button");
    $(button).attr("data-toggle", "modal");
    $(button).attr("data-target", "#exampleModalCenter");

    $("#pkm-list-group").append(button);
    $(button).click(function(event){showDetails(pokemon)});
    
  }
 

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
            height: item.height,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        showModal(item);
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon)
    }
  
  function showModal(pokemon) {

    let modalTitle = document.querySelector(".modal-title");
    modalTitle.innerText = pokemon.name;

    let pokemonImage = document.querySelector('.pokemon-image');
    pokemonImage.src = pokemon.imageUrl;

    let pokemonHeight = document.querySelector('.pokemon-height');
    pokemonHeight.innerText = 'Height : ' + (pokemon.height) + ' m';

  }
  
  // THE RETURN STATEMENT HERE
  return {
    add: add,
    getAll: getAll,
    addlistItem: addlistItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails:showDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addlistItem(pokemon);
  });
});
