let pokemonRepository = (function () {
  // An empty pokemon list
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=7";

  let modalContainer = document.querySelector("#modal-container");

  // REST OF CODE
  function showModal(pokemon) {
    // Clear all existing modal content
    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    // Add the new modal content
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = pokemon.name;
    titleElement.classList.add("modal-h1");

    let contentElement = document.createElement("p");
    contentElement.innerText = "Has a height of " + pokemon.height + " Meter.";

    let imageElement = document.createElement("img");

    imageElement.setAttribute("src", pokemon.imageUrl);
    imageElement.setAttribute("width", "96px");
    imageElement.setAttribute("height", "96px");
    imageElement.setAttribute("alt", pokemon.name);

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // return all users
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
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
    listItem.appendChild(button);
    ulElement.appendChild(listItem);
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
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
      console.log(pokemon);
    });
  }
  

  // THE RETURN STATEMENT HERE
  return {
    add: add,
    getAll: getAll,
    addlistItem: addlistItem,
    loadList: loadList,
    loadDetails:loadDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addlistItem(pokemon);
  });
});
