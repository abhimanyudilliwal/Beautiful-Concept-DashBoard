import React, { useState } from 'react'
import { createContext } from 'react'

const StoreContext = createContext()

const StoreProvider = (props) => {
    // const [isLogin, setIsLogin] = useState(false)
    // const [isInstalled, setIsInstalled] = useState(false)
    const [value, setValue] = useState({ name: '', price: '', discount: '' })


    return (
        <StoreContext.Provider
            value={
                value,
                setValue
                // isLogin,
                // isInstalled,
                // setIsLogin,
                // setIsInstalled
            }

        >
            {props.children}
        </StoreContext.Provider>

    )
}


export { StoreProvider, StoreContext }