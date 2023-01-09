import { useEffect, useState } from "react"
import Product from "../components/Product"

export default function Home() {

  const [productsInfo, setProductsInfo] = useState([])
  const [pesquisa, setPesquisa] = useState('')

  const categoriesNames = [...new Set(productsInfo.map(p => p.category))]

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(json => setProductsInfo(json))
  }, [])

  let products;
  if (pesquisa) {
    products = productsInfo.filter(p => p.name.toLowerCase().includes(pesquisa))
  } else {
    products = productsInfo
  }

  return (
    <div className="p-5">
      <input value={pesquisa} onChange={e => setPesquisa(e.target.value)} type="text" placeholder="Procurar produtos..." className="bg-gray-100 w-full py-2 px-4 rounded-xl" />
      <div>
        {categoriesNames.map(category => (
          <div key={category}>
            {products.find(p => p.category === category) && (
              <div>
                <h2 className="text-2xl py-5 capitalize">{category}</h2>
                <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                  {products.filter(p => p.category === category).map(pInfo => (
                    <div key={pInfo.id} className="px-5 snap-start">
                      <Product {...pInfo} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="py-4">
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  await initMongoose()

  return {
    props: {
      products: []
    }
  }
}