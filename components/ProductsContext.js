import { createContext, useState } from "react";

export const ProductsContext = createContext({})

export function ProductsContextProvider({children}) {

const [selectedProducts, setSelectedProducts ] = useState([])

//const [selectedProducts, setSelectedProducts ] = useLocalStorageState('cart',{defaultValue:[]})

    return (
        <ProductsContext.Provider value={{selectedProducts,setSelectedProducts}}>{children}</ProductsContext.Provider>
    )
}