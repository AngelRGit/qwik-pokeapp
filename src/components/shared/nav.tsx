import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
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
            <Link href="/pokemons/list-ssr/" class="text-white hover:text-gray-300">Consulta Server</Link>
          </li>
          <li>
            <Link href="/pokemons/list-client/" class="text-white hover:text-gray-300">Consulta Cliente</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
});