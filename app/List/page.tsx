import React from 'react';

export default async function List() {


  const test = async () => {
    try{
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      })
      const response = await data.json();
      
      const user = response.listUser.map((el: {id: number, email: string, }) => {    
        return <div key={el.id}>{el.email}</div>
      });

      return user
    }catch(e){
      console.log(e);
      
    }
  }
  
  const user = test()
  
  return (
    <>List : 
      {user}
    </>
  )
}
