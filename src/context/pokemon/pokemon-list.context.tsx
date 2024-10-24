import { createContextId } from "@builder.io/qwik";
import { SmallPokemon } from "~/interfaces";

export interface PokemonListState{
    currentPage: number;
    isLoading: boolean;
    pokemons: SmallPokemon[];
}
//Pokemon list context.
export const PokemonListContext = createContextId<PokemonListState>('pokemon.list-context');

