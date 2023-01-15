import { useContext } from "react"
import { ProductsContext } from "./ProductsContext"

export default function Product({_id,name,price,description,picture}) {

const {setSelectedProducts} = useContext(ProductsContext)

function addProduct() {
  setSelectedProducts(prev => [...prev, _id])
}

    return (
        <div className="w-64">
        <div className="bg-blue-100 p-5 rounded-xl">
          <img src={picture} alt="" />
        </div>
        <div className="mt-2">
          <h3 className="font-bold text-lg">{name}</h3>
        </div>
        <p className="text-sm mt-1 leading-4 text-gray-400">{description}</p>
        <div className="flex mt-3 mb-3">
          <div className="text-2xl font-bold ml-1">R$ {price}</div>
          <button onClick={addProduct} className="bg-emerald-400 text-white py-1 px-3 rounded-xl ml-5">+</button>
        </div>
      </div>
    )
}