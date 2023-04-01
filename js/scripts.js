let pokemonList = [
  { name: "Butterfree", height: 1.1, types: ["grass", "ice", "electric"] },
  { name: "Kakuna", height: 0.6, types: ["psychic", "fairy", "grass"] },
  { name: "Beedrill", height: 1, types: ["ice", "electric", "psychic"] },
];

// Set loop iterator to zero, get the number of items in the object, iterate it until end of numer of items

for (let i = 0; i < pokemonList.length; i++) {
  // if the property height in object pokemonlist is bigger as one
  if (pokemonList[i].height > 1) {
    // write in the element with id=pokemonlistItem a <li> with pokemon name and add a span element with text " is a big pokemon" and a closing </li>
    document.write(
      "<li>" +
        pokemonList[i].name +
        "<span class='bigPokemon'> is a big pokemon</span>" +
        "</li>"
    );

    // for all items smaller as one, write in the same element a <li> with the pokemon name and a closing </li>
  } else {
    document.write("<li>" + pokemonList[i].name + "</li>");
  }
}
