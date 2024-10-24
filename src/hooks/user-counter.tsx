import { $, useComputed$, useSignal } from "@builder.io/qwik";

export const useCounter = (initialValue: number) => {
    
    const counter = useSignal(initialValue);

    const increaseCouter = $( () => {
        counter.value++;
    });

    const decreaseCouter = $( () => {
        counter.value--;
    });

    return {
        counter: useComputed$( () => counter.value),
        increase: increaseCouter,
        decrease: decreaseCouter,
    };
}