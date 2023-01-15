import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Layout from "../components/Layout"
import Product from "../components/Product"
import { initMongoose } from "../lib/mongoose"
import { findAllProducts } from "./api/products"


export default function Home({products}) {

  const [pesquisa, setPesquisa] = useState('')

  const categoriesNames = [...new Set(products.map(p => p.category))]

  if (pesquisa) {
    products = products.filter(p => p.name.toLowerCase().includes(pesquisa))
  }

  return (<>
  <Header/>
    <Layout>
      <input value={pesquisa} onChange={e => setPesquisa(e.target.value)} type="text" placeholder="Procurar produtos..." className="bg-gray-100 w-full py-2 px-4 rounded-xl"/>
      <div>
        {categoriesNames.map(category => (
          <div className="flex justify-center" key={category}>
            {products.find(p => p.category === category) && (
              <div>
                <h2 className="text-2xl py-5 flex justify-center capitalize bg-blue-200 m-5 rounded-xl">{category}</h2>
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
    </Layout>
    </>
  )
}

export async function getServerSideProps() {
  await initMongoose()

  const products = await findAllProducts()

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}