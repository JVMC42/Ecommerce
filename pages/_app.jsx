import '../styles/globals.css'
import {ProductsContextProvider} from "../components/ProductsContext"

 function App({ Component, pageProps }) {
  return (
    <ProductsContextProvider>
     <Component {...pageProps}/>
    </ProductsContextProvider>
  )
}

export default App
