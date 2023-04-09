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
  return {
    add: add,
    getAll: getAll,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  if (pokemon.height > 1) {
    document.write(
      "<li>" +
        pokemon.name +
        "<span class='bigPokemon'> is a big pokemon</span>" +
        "</li>"
    );
  } else {
    document.write("<li>" + pokemon.name + "</li>");
  }
});
