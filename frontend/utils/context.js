import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import jsCookie from 'js-cookie';
import router from 'next/router';

export const PageContext = createContext({
    keyword: {},
    setKeyword: () => { },
    toggle: {},
    setToggle: () => { },
})


const Provider = ({ children }) => {

    const [keyword, setKeyword] = useState("");
    const [toggle, setToggle] = useState(true)

    return (
        <PageContext.Provider value={{ keyword, setKeyword, toggle, setToggle }}>
            {children}
        </PageContext.Provider>
    )

}

export default Provider;