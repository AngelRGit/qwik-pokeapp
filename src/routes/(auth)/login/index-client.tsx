import { $, component$, useComputed$, useStore, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';

export default component$(() => {

    useStylesScoped$(styles);

    const formState = useStore({
        email: '',
        password: '',
        formPosted:false,
    });
    
    //Validaciones
    const emailError = useComputed$( () => {
        if(formState.email.includes('@')) return '';
        return 'not-valid';
    });

    const passwordError = useComputed$( () => {
        if(formState.password.length >= 6) return '';
        return 'not-valid';
    });

    const isFormValid = useComputed$( () => {
        if(
            emailError.value === 'not-valid' || 
            passwordError.value === 'not-valid'
        ) return false;
        return true;
    });


    const onSubmit = $(() => {
        formState.formPosted = true;
        const {email,password} = formState;
        console.log({email,password});
        console.log({isFormValid: isFormValid.value })
    });

    return (
        <form onSubmit$={onSubmit} class="login-form" preventdefault:submit>
            <div class="relative">
                <input 
                    onInput$={
                        (ev) => formState.email = (ev.target as HTMLInputElement).value
                    }
                    class={formState.formPosted  ? emailError.value : ''}
                    name="email" type="text" placeholder="Email address" />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input  
                     onInput$={
                        (ev) => formState.password = (ev.target as HTMLInputElement).value
                    }
                    class={formState.formPosted  ? passwordError.value : ''}
                    name="password" type="password" placeholder="Password" />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button disabled={!isFormValid.value} type='submit'>Ingresar</button>
            </div>


            <code>
                { JSON.stringify( formState, undefined , 2 ) }
            </code>
        </form>
    )
});