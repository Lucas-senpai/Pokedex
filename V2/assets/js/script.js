const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const modalName = document.querySelector('.services__modal-title');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const lang = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);

    if (APIResponse.status == 200 && lang.status == 200){
        const data = await APIResponse.json();
        const fr = await lang.json();
        return [data, fr];
    }
}


const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonImage.style.display = 'block';
        pokemonNumber.innerHTML = data[0].id;
        pokemonName.innerHTML = data[1]['names']['4']['name'];
        modalName.innerHTML = data[1]['names']['4']['name'];
        if(pokemon < 650){
            pokemonImage.src = data[0]['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }else{
            pokemonImage.src = data[0]['sprites']['front_default'];
        }
        input.value = '';
        searchPokemon = data[1].id
    } else{
        pokemonName.innerHTML = 'Non trouvé :/';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value);
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    if (searchPokemon < 905){
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
});

renderPokemon(searchPokemon);






/* ===== Modal ===== */
const modalViews = document.querySelectorAll('.services__modal'),
        modalBtns = document.querySelectorAll('.info-modal'),
        modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () =>{
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () =>{
        modalViews.forEach((modalView) =>{
            modalView.classList.remove('active-modal')
        })
    })
})