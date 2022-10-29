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


// recupe des données
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

let searchPokemon = 1; // on affiche la pokemon 1


// Recupere les données dans PokeAPi //
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const lang = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);

    if (APIResponse.status == 200 && lang.status == 200){
        const data = await APIResponse.json();
        const fr = await lang.json();
        return [data, fr];
    }
}

// Retourne la vue du pokemon
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data){
        var modalStatTabl = data[0]['stats']; // Recupere les stats sous un tableau
        var Type = data[0]['types']; // Recupere les types sous un tableau (type 0 et/ou 1)
        var nbType = Type.length; // nombre de type 1 ou 2

        pokemonImage.style.display = 'block';

        if(pokemon < 650){
            pokemonImage.src = data[0]['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            modalImg.src = data[0]['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }else{
            pokemonImage.src = data[0]['sprites']['front_default'];
            modalImg.src = data[0]['sprites']['front_default'];
        }

        pokemonNumber.innerHTML = data[0].id;
        pokemonName.innerHTML = data[1]['names']['4']['name'];
        
        // Recupe des datas pour le modal //
        modalName.innerHTML = data[1]['names']['4']['name'];
        modalNumb.innerHTML = data[1].id;
        modalDesc.innerHTML = data[1]['genera']['3']['genus'];
        
        modalHp.innerHTML = modalStatTabl[0]['base_stat'];
        modalAtk.innerHTML = modalStatTabl[1]['base_stat'];
        modalDef.innerHTML = modalStatTabl[2]['base_stat'];
        modalSAtk.innerHTML = modalStatTabl[3]['base_stat'];
        modalSDef.innerHTML = modalStatTabl[4]['base_stat'];
        modalSpeed.innerHTML = modalStatTabl[5]['base_stat'];
        
        // recupe des url type puis comparaison dans la fonction //
        var PokeType1 = Type[0]['type']['url'];
        
        // si il y a 2 type alors on renseigne le type 2 //
        if(nbType == 2){
            var PokeType2 = Type[1]['type']['url'];
        }
        // la fonction
        PokemonType(PokeType1, PokeType2, nbType);

        input.value = '';
        searchPokemon = data[1].id

    } else{ // si le pokemon n'éxiste pas //
        pokemonName.innerHTML = 'Non trouvé :/';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
}


// fonction pour "traduire" les Types (a opptimisé mais jsp faire) //
function PokemonType(PokeType1, PokeType2, nbType){

    switch (PokeType1) {
        case 'https://pokeapi.co/api/v2/type/1/':
            PokeType1 = 'Normal'
            break;
        case 'https://pokeapi.co/api/v2/type/2/':
            PokeType1 = 'Combat'
            break;
        case 'https://pokeapi.co/api/v2/type/3/':
            PokeType1 = 'Vol'
            break;
        case 'https://pokeapi.co/api/v2/type/4/':
            PokeType1 = 'Poison'
            modalType1.classList.add("poison");
            break; 
        case 'https://pokeapi.co/api/v2/type/5/':
            PokeType1 = 'Sol'
            break;
        case 'https://pokeapi.co/api/v2/type/6/':
            PokeType1 = 'Roche'
            break;
        case 'https://pokeapi.co/api/v2/type/7/':
            PokeType1 = 'Insecte'
            break;
        case 'https://pokeapi.co/api/v2/type/8/':
            PokeType1 = 'Spectre'
            break;
        case 'https://pokeapi.co/api/v2/type/9/':
            PokeType1 = 'Acier'
            break;
        case 'https://pokeapi.co/api/v2/type/10/':
            PokeType1 = 'Feu'
            modalType1.classList.remove("plante", "poison");
            modalType1.classList.add("feu");
            break;
        case 'https://pokeapi.co/api/v2/type/11/':
            PokeType1 = 'Eau'
            break;
        case 'https://pokeapi.co/api/v2/type/12/':
            PokeType1 = 'Plante'
            modalType1.classList.add("plante");
            break; 
        case 'https://pokeapi.co/api/v2/type/13/':
            PokeType1 = 'Électrik'
            break;
        case 'https://pokeapi.co/api/v2/type/14/':
            PokeType1 = 'Psy'
            break;
        case 'https://pokeapi.co/api/v2/type/15/':
            PokeType1 = 'Glace'
            break;
        case 'https://pokeapi.co/api/v2/type/16/':
            PokeType1 = 'Dragon'
            break;
        case 'https://pokeapi.co/api/v2/type/17/':
            PokeType1 = 'Ténèbre'
            break;
        case 'https://pokeapi.co/api/v2/type/18/':
            PokeType1 = 'Fée'
            break;
    }

    if(nbType == 2){
        switch (PokeType2) {
            case 'https://pokeapi.co/api/v2/type/1/':
                PokeType2 = 'Normal'
                break;
            case 'https://pokeapi.co/api/v2/type/2/':
                PokeType2 = 'Combat'
                break;
            case 'https://pokeapi.co/api/v2/type/3/':
                PokeType2 = 'Vol'
                break;
            case 'https://pokeapi.co/api/v2/type/4/':
                PokeType2 = 'Poison'
                modalType2.classList.add("poison");
                break; 
            case 'https://pokeapi.co/api/v2/type/5/':
                PokeType2 = 'Sol'
                break;
            case 'https://pokeapi.co/api/v2/type/6/':
                PokeType2 = 'Roche'
                break;
            case 'https://pokeapi.co/api/v2/type/7/':
                PokeType2 = 'Insecte'
                break;
            case 'https://pokeapi.co/api/v2/type/8/':
                PokeType2 = 'Spectre'
                break;
            case 'https://pokeapi.co/api/v2/type/9/':
                PokeType2 = 'Acier'
                break;
            case 'https://pokeapi.co/api/v2/type/10/':
                PokeType2 = 'Feu'
                break;
            case 'https://pokeapi.co/api/v2/type/11/':
                PokeType2 = 'Eau'
                break;
            case 'https://pokeapi.co/api/v2/type/12/':
                PokeType2 = 'Plante'
                break; 
            case 'https://pokeapi.co/api/v2/type/13/':
                PokeType2 = 'Électrik'
                break;
            case 'https://pokeapi.co/api/v2/type/14/':
                PokeType2 = 'Psy'
                break;
            case 'https://pokeapi.co/api/v2/type/15/':
                PokeType2 = 'Glace'
                break;
            case 'https://pokeapi.co/api/v2/type/16/':
                PokeType2 = 'Dragon'
                break;
            case 'https://pokeapi.co/api/v2/type/17/':
                PokeType2 = 'Ténèbre'
                break;
            case 'https://pokeapi.co/api/v2/type/18/':
                PokeType2 = 'Fée'
                break;
        }
    }

    // si 1 type alors remplace le 1 par le type et le 2 par rien
    if(nbType == 1){
        modalType1.innerHTML = PokeType1;
        modalType2.innerHTML = '';
    }else{ // sinon ajoute les 2 type
        modalType1.innerHTML = PokeType1;
        modalType2.innerHTML = PokeType2;
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

// va lancer renderPokemon qui vas lancer fetchPokemon qui va lancer PokemonType
renderPokemon(searchPokemon);






