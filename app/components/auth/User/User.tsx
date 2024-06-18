'use client'
import { Session} from "next-auth";
import { useSession} from "next-auth/react";
import styles from "./User.module.scss"
import Image from "next/image";
import LogOut from "../LogOut/LogOut";
import { getRequiredAuthSession } from "@/app/lib/auth";

// export type UserProps = {
//     sessionUser: NonNullable<Session["user"]>
// }


const User = () => {

    // getRequiredAuthSession() asynchrone en serveur component
    // useSession : synchrone serveur client (a besoin d'un provider)

    // const session = await getRequiredAuthSession();
    // console.log(session);
    
    const {data: session} = useSession();
    console.log({session});
    
    
    if(!session){
        <div>No user</div>
    }
    return (
        <div className={styles.container}>
            <figure className={styles.avatar}>
            {/* <Image className={styles.avatar__img} src={session?.user.image && session.user.image} alt="avatar" fill={true} sizes="100vh"/> */}
            <img className={styles.avatar_img} src={session?.user?.image ? session.user.image : "" } alt="avatar" sizes="100vh"/>
            
            </figure>
            <p>{session?.user.id}</p>
            <p>{session?.user.name}</p>
            <p> {session?.user.email}</p>
            <LogOut/>
        </div>
    );
};

export default User;