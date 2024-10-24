import { $, component$, useContext, useOnDocument, useStore, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import { Link, type DocumentHead } from '@builder.io/qwik-city';


import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonListContext } from '~/context';
import { getSmallsPokemons } from '~/helpers/get-small-pokemons';
//import type { SmallPokemon } from '~/interfaces';

/*interface PokemonPageState{
  currentPage: number;
  isLoading : boolean;
  pokemons: SmallPokemon[];
};*/


export default component$(() => {

  /*const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  });*/
  const pokemonState = useContext(
    PokemonListContext
  );
  
  

  //Esto solo lo ve el cliente, se ejecuta de lado del cliente.
/*   useVisibleTask$( async ({ track }) => {
    //console.log('Hola mundo, useVisibleTask$' );
    track( () => pokemonState.currentPage )
    const pokemons = await getSmallsPokemons(pokemonState.currentPage * 10 );
    pokemonState.pokemons = [ ...pokemonState.pokemons, ...pokemons];
  }); */

  //Este por lo menos se ejecuta una vez del lado del servidor y se sigue ejecutando de lado del cliente.
  useTask$( async ({ track }) => {
    //console.log('Hola mundo, useVisibleTask$' );
    track( () => pokemonState.currentPage );


    const pokemons = await getSmallsPokemons(pokemonState.currentPage * 10, 30 );
    pokemonState.pokemons = [ ...pokemonState.pokemons, ...pokemons];
    
    pokemonState.isLoading = false;
  });

  useOnDocument('scroll', $(() => {
    //event //Este se pone como objeto para ver log $(event)
    //console.log('Scroll',event);
    const maxScroll = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;
    //console.log(maxScroll, currentScroll);
    if((currentScroll + 400) >= maxScroll && !pokemonState.isLoading){
      pokemonState.isLoading = true;
      pokemonState.currentPage++;
    }
  }));

  return (
    <>
        <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Página actual: { pokemonState.currentPage }</span>
        <span>Está cargando: </span>
      </div>
      <div class="mt-10">
       {/*  <button onClick$={() => pokemonState.currentPage --}
          class="btn btn-primary mr-2">
          Anteriores
        </button>*/}
        <button onClick$={() => pokemonState.currentPage ++}
        class="btn btn-primary mr-2">
          Siguientes
        </button>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-5">
          {
             pokemonState.pokemons.map(({ name, id }) => (
              <div 
                key={name} 
                class="bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 m-5 flex flex-col justify-center items-center p-5"
              >
                <span class="capitalize font-bold text-lg mb-2">{name}</span>
                <Link href="" class="w-20 h-20 bg-white rounded-full flex justify-center items-center">
                  <PokemonImage id={id} />
                </Link>
              </div>
                )) 
              }
            </div>

          </div>
      </>
  )
});

export const head: DocumentHead = {
  title: "List Client",
  meta: [
    {
      name: "description",
      content: "List Client",
    },
  ],
};