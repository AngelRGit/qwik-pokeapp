import { $, component$, useComputed$, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';
import { getFunFactAboutPokemon } from '~/helpers/get-chat-gpt-response';
import { getSmallsPokemons } from '~/helpers/get-small-pokemons';
import { SmallPokemon } from '~/interfaces';
import { BasicPokemonInfo, PokemonListResponse } from '~/interfaces/pokemon-list.response';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async({query, redirect, pathname}) =>{
  //console.log(query);
  const offset = Number(query.get('offset') || '0');
  if(offset < 0){
    redirect(301, pathname);
    console.log(pathname);
  }
  return getSmallsPokemons(offset);
  //const pokemons = await getSmallsPokemons(offset);
  //console.log(pokemons);
  //return pokemons;
  //const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
  //const data = await resp.json() as PokemonListResponse;
  //return data.results;

    //console.log(data);
    

});
export default component$(() => {

  const pokemons = usePokemonList();
  const location = useLocation();

  const modalVisible = useSignal(false);
  const modalPokemon = useStore({
    id: '',
    name: ''
  });

  //Señal para espera respuesta de chatGPT
  const chatGptPokemonFact = useSignal('');

  //Modal Functions
  const showModal = $( (id:string, name:string) => {
      //console.log({id,name});
      modalPokemon.id = id;
      modalPokemon.name = name;
      modalVisible.value = true;
  });

  const closeModal = $( () => {
    modalVisible.value = false; 
  });

  //Código para ChatGPT
  useVisibleTask$(({track}) => {
    track( () => modalPokemon.name);
    chatGptPokemonFact.value ='';

    if(modalPokemon.name.length > 0){
      getFunFactAboutPokemon(modalPokemon.name)
      .then( resp => chatGptPokemonFact.value = resp);

    }
  });

  const currentOffset = useComputed$<number>(() => {
    //const offSetStrong = location.url.searchParams.get('offset');
    const offSetStrong = new URLSearchParams(location.url.search);
    return Number(offSetStrong.get('offset') || 0);
  })
  //console.log(location.url.searchParams.get('offset'));

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset}</span>
        <span>Está cargando página: {location.isNavigating ? 'Si' : 'No'}</span>
      </div>
      <div class="mt-10">
        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class="btn btn-primary mr-2">
          Anteriores
        </Link>
        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
        class="btn btn-primary mr-2">
          Siguientes
        </Link>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-5">
          {
            pokemons.value.map(({ name, id }) => (
              <div 
                key={name}      
                onClick$={ () => showModal(id,name)}           
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

      <Modal 
      persistent
      size='lg'
      showModal={ modalVisible.value } 
      closeFn={closeModal}>
        <div q:slot='title'>{modalPokemon.name}</div>
        <div q:slot='content' class="flex flex-col justify-center items-center">
            <PokemonImage id={modalPokemon.id} />
            <span>
              {
                chatGptPokemonFact.value === ''
                ? 'Cargando respuesta desde ChatGPT'
                : chatGptPokemonFact
              }
            </span>
        </div>                
      </Modal>
    </>
  )
});

export const head: DocumentHead = {
  title: "List SSR",
  meta: [
    {
      name: "description",
      content: "List SSR",
    },
  ],
};