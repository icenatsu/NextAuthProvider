'use client'

import Login from "@components/Login/Login"
import { useSession} from "next-auth/react";
import User from '@components/auth/User/User';
import { useState } from "react";
import Register from "@components/Register/Register";

export default function Form() {

  const {data: session} = useSession();

  const [showRegister, setShowRegister] = useState<boolean>(false);

  const handleClick = () : void => {
    setShowRegister(!showRegister)
  }

  
  return (
    <>
      {showRegister ? <Register inClick={handleClick}/> : session ? <User/> : <Login inClick={handleClick}/>}
    </>
  );

}
