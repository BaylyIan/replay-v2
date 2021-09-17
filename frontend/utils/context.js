import React, { useState, useEffect, createContext } from 'react';

export const PageContext = createContext({
    user:{},
    setUser:()=>{},
    keyword:{},
    setKeyword:()=>{},
    loggedIn:{},
    setLoggedIn:()=>{},
    toggle:{},
    setToggle:()=>{},
})

const Provider = ({children}) => {

    const [user, setUser] = useState()
    const [keyword, setKeyword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false)
    const [toggle, setToggle] = useState(true)
    
    useEffect(()=>{
        const userData = sessionStorage.getItem("user");
        setUser(JSON.parse(userData)); 
        if(window.sessionStorage.getItem("token")){
            setLoggedIn(true)
          }else{
            setLoggedIn(false)
          } 
    }, []);

    return (
        <PageContext.Provider value={{user, setUser, keyword, setKeyword, loggedIn, setLoggedIn, toggle, setToggle}}>
            {children}
        </PageContext.Provider>
    )

}

export default Provider;