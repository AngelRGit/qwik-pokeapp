import { $, component$} from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/user-pokemon-game";

export default component$(() => {

  const nav = useNavigate();
  const {
    isPokemonVisible,
    showBackImage,
    pokemonId,
    nextPokemon,
    prevPokemon,
    toogleVisible,
    toogleFromBack
   } = usePokemonGame();
 
  //const pokemonId = useSignal(1); //Primitivos, booleans, Strings.
  //const showBackImage = useSignal(false); 
  //const isPokemonVisible = useSignal(true);
 



  //Navegar al pokemon
  const goToPokemon = $((id: number) => {
    nav(`/pokemon/${ id }/`);
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{ pokemonId.value}</span>

    <div onClick$={ () => goToPokemon( pokemonId.value ) }>
      <PokemonImage 
      id={pokemonId.value} 
      size={200} 
      backImage={showBackImage.value} 
      isVisible={isPokemonVisible.value}/>
    </div>

      <div class="mt-2">
        <button onClick$={ prevPokemon } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={ nextPokemon }  class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={ toogleFromBack }  class="btn btn-primary">Voltear</button>
        <button onClick$={ toogleVisible }  class="btn btn-primary">Revelar</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Bienvenido a Software Vensel",
  meta: [
    {
      name: "description",
      content: "Mi primera App en Qkiw",
    },
  ],
};
