import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import jsCookie from 'js-cookie';
import router from 'next/router';
import {useModal} from '../utils/useModal'

export const PageContext = createContext({
    keyword: {},
    setKeyword: () => { },
    toggle: {},
    setToggle: () => { },
    showReg:{},
    setShowReg: () => { },
    toggleReg:{},
})


const Provider = ({ children }) => {

    const [keyword, setKeyword] = useState("");
    const [toggle, setToggle] = useState(true)
    const [showReg, setShowReg, toggleReg] = useModal()


    return (
        <PageContext.Provider value={{ keyword, setKeyword, toggle, setToggle, showReg, setShowReg, toggleReg}}>
            {children}
        </PageContext.Provider>
    )

}

export default Provider;