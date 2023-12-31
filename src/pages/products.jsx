import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/layout'
import ProductList from '../components/productsList'
import '../styles/products.css'
import Cookies from 'js-cookie'
import { TailSpin } from 'react-loader-spinner'

const Products = () => {
  const [productList, setProductList] = useState([])

  useEffect(() => {
    const getData = async () => {
      const jwtToken = Cookies.get('jwtToken')
      await axios
        .get('https://devstorebhargav.onrender.com/api/products', {
          headers: { authorization: `Bearer ${jwtToken}` },
        })
        .then((res) => {
          setProductList(res.data)
          console.log(productList)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadingScreen = () => {
    return (
      <div className='loader-container'>
        <TailSpin color='#00BFFF' height={100} width={100} />
      </div>
    )
  }

  return (
    <Layout>
      <div className='product-container'>
        <h1>products</h1>
        {productList.length < !0 ? (
          loadingScreen()
        ) : (
          <div className='card-container'>
            {productList.map((item) => {
              return <ProductList key={item.id} prods={item} />
            })}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Products
