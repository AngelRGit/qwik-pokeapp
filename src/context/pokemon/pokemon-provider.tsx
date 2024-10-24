import { component$, Slot, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';

import { PokemonGameContext, type PokemonGameState } from './pokemon-game.context';
import { PokemonListContext, type PokemonListState } from './pokemon-list.context';

export const PokemonProvider = component$(() => {
 
//Estoes para mantener el estadode una pantalla.
const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    isPokemonVisible: true,
    showBackImage: true
  });

  //?Aqui estado inicial de contexto list
  const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  }); 

  useContextProvider(PokemonGameContext,pokemonGame);
  useContextProvider(PokemonListContext,pokemonList);
  
  useVisibleTask$( () => {
    //TODO: Leer local Storage
    console.log('1. TODO: Leer local Storage');
    if(localStorage.getItem('pokemon-game')){
      const {
        isPokemonVisible = true,
        pokemonId = 10,
        showBackImage = false,
      } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState;
      //console.log(data);
      pokemonGame.isPokemonVisible = isPokemonVisible;
      pokemonGame.pokemonId = pokemonId;
      pokemonGame.showBackImage = showBackImage;
    }
  })

  useVisibleTask$( ({track}) => {
    console.log('2. Trackear eventos de parametros, para ejecutar cada vez que cambien');
    track( () => [pokemonGame.isPokemonVisible, pokemonGame.pokemonId, pokemonGame.showBackImage]);
    localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
  })

  return (<Slot />);
});

