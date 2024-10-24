import { component$, Slot } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { PokemonProvider } from '~/context';

export default component$(() => {
  return (
  <>
    <PokemonProvider>
     <nav class="bg-gray-800 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-white font-bold text-xl">
          {/* Reemplaza esto con tu logo real */}
          ANOBA
        </div>
        <ul class="flex space-x-4">
          <li>
            <Link href="/" class="text-white hover:text-gray-300">Inicio</Link>
          </li>
          <li>
            <Link href="/login/" class="text-white hover:text-gray-300">Login</Link>
          </li>
          <li>
            <Link href="/dashboard/" class="text-white hover:text-gray-300">Dashboard</Link>
          </li>
          <li>
            <Link href="/counter/" class="text-white hover:text-gray-300">CounterHook</Link>
          </li>
          <li>
            <Link href="/pokemons/list-ssr/" class="text-white hover:text-gray-300">Consulta Server</Link>
          </li>
          <li>
            <Link href="/pokemons/list-client/" class="text-white hover:text-gray-300">Consulta Cliente</Link>
          </li>
        </ul>
      </div>
    </nav>
    <main class="flex flex-col items-center justify-center">
      <Slot />
    </main> 
    </PokemonProvider>
    </>
)
});