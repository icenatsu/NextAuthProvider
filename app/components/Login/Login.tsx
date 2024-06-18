'use client'
import styles from "./Login.module.scss"
import { signIn } from "next-auth/react";
import { Icon } from '@iconify/react';
import { FormEvent } from "react";
import { toast } from "react-toastify";

interface Login  {
    inClick : () => void
}

const Login = ({inClick}:Login) : JSX.Element=> {
    
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try{
            const formData = new FormData(e.currentTarget);
            
            const res = await signIn('credentials', {
                redirect: false,
                email: formData.get('email'),
                password: formData.get('password'),
                callbackUrl: "/"
            })

            if(!res?.ok){
                throw "Email ou mot de passe incorrects"
            }

        }catch(e){
            toast.error("Email ou mot de passe incorrects");
        }
    }

    
    async function handleGithubSignin(){
        signIn('github', { callbackUrl : "http://localhost:3000/Form"})
    }
    async function handleGoogleSignin(){
        signIn('google', { callbackUrl : "http://localhost:3000/Form"})
    }
    
    async function handleFacebookSignin(){
        signIn('facebook', { callbackUrl : "http://localhost:3000/Form"})
    }
    async function handleTwitterSignin(){
        signIn('twitter', { callbackUrl : "http://localhost:3000/Form"})
    }

    return (
      <form  onSubmit={onSubmit} className={styles.formLogin}>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input className={styles.input} id="email" type="email" name="email"/>
        <label htmlFor="password">Mot de passe</label>
        <input className={styles.input} type="password" id="password" name="password"/>
        <button type='submit' className={styles.logIn}>Se connecter</button>
        <p className={styles.separate}>ou</p>
        <h3>Se connecter avec :</h3>
        <div className={styles.providers}>
            <Icon className={styles.icon} icon="icon-park:github" onClick={handleGithubSignin}/> 
            <Icon className={styles.icon} icon="flat-color-icons:google" onClick={handleGoogleSignin}/>
            <Icon className={styles.icon} icon="logos:facebook" onClick={handleFacebookSignin}/>
            <Icon className={styles.icon} icon="logos:twitter"  onClick={handleTwitterSignin}/>
        </div>
        <p>Vous n'avez pas de compte?</p>
        <p className={styles.signUp} onClick={inClick}>Inscrivez vous</p>
      </form>
    );
};

export default Login;