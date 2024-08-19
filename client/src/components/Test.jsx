import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';

const Test = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const token = Cookies.get('usertoken');
        console.log(">>>>>"+token)
        if (token) {
            setIsLoggedIn(false);
        }
    }, []);


    if(isLoggedIn){
        console.log("not login")
        return(
        <div>
            <h1>Need to login or register</h1>
        </div>)
    }
    console.log("you login")
  return (
    <div>
            <h1> You are in </h1>
    </div>
  )
}

export default Test
