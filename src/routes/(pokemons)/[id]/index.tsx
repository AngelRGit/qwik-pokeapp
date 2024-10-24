import { component$, useContext } from '@builder.io/qwik';
import { useLocation, routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/user-pokemon-game';


export const usePokemonId = routeLoader$<number>( ({ params, redirect }) => {
      //console.log({params})
      const id = Number(params.id);
      console.log(id);
      if( isNaN(id)) redirect(301, '/'); //Sino es un numero, saca al usuario.
      if( id <= 0) redirect(301, '/');  
      if( id > 1000) redirect(301, '/');
      return id;
});

export default component$(() => {
  
  const pokemonID = usePokemonId();

  const {
      isPokemonVisible,
      showBackImage,
      toogleFromBack,
      toogleVisible,
  } = usePokemonGame();

  return <>
        <span class="text-5xl">Pokemon: { pokemonID }</span>
        {/*<span class="text-5xl">Pokemon: {location.params.id }</span>*/}
        <PokemonImage 
        id={ pokemonID.value }
        isVisible={ isPokemonVisible.value }
        backImage={ showBackImage.value} />

        <div class='mt-2'>
                  <button onClick$={toogleFromBack} class="btn btn-primary mr-2">Volter</button>
                  <button onClick$={toogleVisible} class="btn btn-primary">Revelar</button>
        </div>
    </>
});