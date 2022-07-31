///  > CONSTANTE GLOBAL < 
const PokemonName = document.querySelector('.pokemon__name');
const PokemonNumber = document.querySelector('.pokemon__number');
const PokemonImage = document.querySelector('.pokemon__image');

const PokemonForm = document.querySelector('.pokemon_form');
const search = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

/// Chamando API
const fetchPokemon = async(pokemon) => {
        const APIReponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (APIReponse.status === 200) {
            const data = await APIReponse.json();
            return data;
        }
    }
    /// RENDER POKMEON 
const renderPokemon = async(pokemon) => {
        PokemonName.innerHTML = 'Loading...';
        const data = await fetchPokemon(pokemon);

        if (data) { /// EM CASO DE PEQUISAR POKEMON QUE EXISTE 

            PokemonName.innerHTML = data.name;
            PokemonNumber.innerHTML = data.id;
            PokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            search.value = '';

        } else { /// EM CASO, PESQUISAR POKEMON QUE NÃO EXISTE 
            PokemonImage.style.display = 'none';
            PokemonName.innerHTML = 'Not Found! :(';
            PokemonNumber.innerHTML = 'X';
        }

    }
    /// FUNCAO PARA PESQUISAR O POKEMON
PokemonForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(search.value.toLowerCase());
});

/// BOTÃO DE "NEXT"
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

/// BOTÃO DE "PREV"
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

/// INICIANDO A POKEDEX, POKEMON NUMERO "1"
renderPokemon(searchPokemon);