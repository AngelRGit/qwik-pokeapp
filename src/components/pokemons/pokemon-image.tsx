import { component$, useComputed$, useSignal, useTask$ } from '@builder.io/qwik';
interface Props{
    id: number | string;
    size?: number; //Signo de interrogación es que es opcional.
    backImage ?: boolean;
    isVisible?:boolean; //el ? es que es opcional.
}
export const PokemonImage = component$(( {id, size= 200, 
    backImage = false,
    isVisible = true,
}: Props) => {

    const imageLoaded = useSignal(false);
    useTask$(({track}) => {
        track(() => id);
        imageLoaded.value = false;
    });

  const urlImage = useComputed$(() => {
     if(id === '') return '';
     return(backImage)
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${ id }.png`
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`;  
  });

  return (
    <div class="flex items-center justify-center" 
    style={{width: `${ size }px`, height: `${ size }px`}}>
            { !imageLoaded.value && <span>Cargando...</span>}
            <img src={urlImage.value} 
            alt="Pokemon String"
            style={{width: `${ size }px`}} 
            onLoad$={ () => {
                //setTimeout(() => {
                        imageLoaded.value = true;
                  //  },2000);
             }}
             class={[{
                'hidden': !imageLoaded.value,
                'brightness-0': !isVisible
             },'transition-all']}></img>
    </div>
  )
});