"use client";

import { useSession } from "next-auth/react";
import styles from "./Register.module.scss";
import { FormEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from 'react-toastify';

interface Register {
  inClick: () => void;
}

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const Register = ({ inClick }: Register): JSX.Element => {
  const { data: session } = useSession();
  const form = useRef<HTMLFormElement>(null);

  const schema = yup
    .object({
      name: yup
        .string()
        .matches(
          /^([a-zA-Z àâäéèêëïîôöùûüç,.'-]{1,20}-{0,1})?([a-zA-Z àâäéèêëïîôöùûüç,.'-]{3,20})$/,
          "Veuillez saisir un nom valide."
        )
        .required("Veuillez saisir votre nom"),
      email: yup
        .string()
        .email("Veuillez entrer un email valide.")
        .matches(
          /^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$/,
          "Veuillez saisir un email valide."
        )
        .required("Veuillez saisir votre email."),
      password: yup
        .string()
        .required("Veuillez saisir un mot de passe.")
        .min(9, "Must be between 9 to 26 characters !")
        .max(26, "Must be betwen 9 to 26 characters !")
        .trim(),
    })
    .required();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const { name, email, password } = data;
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      
      if(!response.ok){
        throw `Votre email est déjà utilisé`;
      }

      toast.success('Votre inscription est confirmée')
      reset()
    } catch (e) {
      
      toast.error('Votre email est déjà inscrit dans notre base de données.')
    }
  };

  // const sendEmail = async (e: FormEvent<HTMLButtonElement>) => {
  //   try {
  //     e.preventDefault();
  //     toast.success('Votre inscription est confirmé')

  //   } catch (e) {}
  //   console.log({ e });
  // };

  return (
    <form
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
      className={styles.formRegister}
    >
      <h2>S'inscrire</h2>
      <label htmlFor="name">Nom</label>
      <input
        className={styles.input}
        id="name"
        type="name"
        {...register("name")}
      />
      {errors.name && (
        <span className={styles.errors}>{errors.name.message}</span>
      )}
      <label htmlFor="email">Email</label>
      <input
        className={styles.input}
        id="email"
        type="email"
        {...register("email")}
      />
      {errors.email && (
        <span className={styles.errors}>{errors.email.message}</span>
      )}
      <label htmlFor="password">Mot de passe</label>
      <input
        className={styles.input}
        type="password"
        id="password"
        {...register("password")}
      />
      {errors.password && (
        <span className={styles.errors}>{errors.password.message}</span>
      )}
      <button type="submit">S'inscrire</button>
      <p>Vous possédez déjà un compte?</p>
      <p className={styles.logIn} onClick={inClick}>
        Connectez vous
      </p>
    </form>
  );
};

export default Register;
