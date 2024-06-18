"use client"
import { signOut } from "next-auth/react";
import styles from "./LogOut.module.scss"


const LogOut = () => {
    return (
        <button className={styles.button} onClick={ async () => await signOut()}>Log Out
        </button>
    );
};

export default LogOut;