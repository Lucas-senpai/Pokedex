const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const modalName = document.querySelector('.pokename__modal');
const modalNumb = document.querySelector('.pokenumb__modal');
const modalImg = document.querySelector('.pokeimg__modal');
const modalDesc = document.querySelector('.pokemon__desc');
const modalType1 = document.querySelector('.modalType');
const modalType2 = document.querySelector('.modalType2');

// recupe des stats
const modalHp = document.querySelector('.hp');
const modalAtk = document.querySelector('.atk');
const modalDef = document.querySelector('.def');
const modalSAtk = document.querySelector('.sAtk');
const modalSDef = document.querySelector('.sDef');
const modalSpeed = document.querySelector('.speed');

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
        var modalStatTabl = data[0]['stats']; // Recupere les stats sous un tableau
        var Type = data[0]['types']; // Recupere les types sous un tableau
        var nbType = Type.length; // nombre de type 1 ou 2

        // si 1 type alors remplace le 1 par le type et le 2 par rien
        if(nbType == 1){
            modalType1.innerHTML = Type[0]['type']['name'];
            modalType2.innerHTML = '';
        }else{ // sinon ajoute les 2 type
            modalType1.innerHTML = Type[0]['type']['name'];
            modalType2.innerHTML = Type[1]['type']['name'];
        }

        
        pokemonNumber.innerHTML = data[0].id;
        pokemonName.innerHTML = data[1]['names']['4']['name'];

        modalName.innerHTML = data[1]['names']['4']['name'];
        modalNumb.innerHTML = data[1].id;
        modalDesc.innerHTML = data[1]['genera']['3']['genus'];

        modalHp.innerHTML = modalStatTabl[0]['base_stat'];
        modalAtk.innerHTML = modalStatTabl[1]['base_stat'];
        modalDef.innerHTML = modalStatTabl[2]['base_stat'];
        modalSAtk.innerHTML = modalStatTabl[3]['base_stat'];
        modalSDef.innerHTML = modalStatTabl[4]['base_stat'];
        modalSpeed.innerHTML = modalStatTabl[5]['base_stat'];
        

        if(pokemon < 650){
            pokemonImage.src = data[0]['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            modalImg.src = data[0]['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }else{
            pokemonImage.src = data[0]['sprites']['front_default'];
            modalImg.src = data[0]['sprites']['front_default'];
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
    renderPokemon(input.value.toLowerCase());
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