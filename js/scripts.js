let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Butterfree", height: 1.1, types: ["grass", "ice", "electric"] },
    { name: "Kakuna", height: 0.6, types: ["psychic", "fairy", "grass"] },
    { name: "Beedrill", height: 1, types: ["ice", "electric", "psychic"] },
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }
  function addlistItem(pokemon) {
    let ulElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    listItem.classList.add("pokemon-list-item");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
    listItem.appendChild(button);
    ulElement.appendChild(listItem);
  }

  function showDetails (pokemon) {
    console.log(pokemon)
  }

  return {
    add: add,
    getAll: getAll,
    addlistItem: addlistItem,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addlistItem(pokemon);
});
