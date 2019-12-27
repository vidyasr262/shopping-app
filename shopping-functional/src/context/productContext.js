import React from 'react'

const ProductContext = React.createContext()

const ProductProvider = ProductContext.Provider
const ProductConsumer = ProductContext.Consumer

export {ProductProvider, ProductConsumer}
export default ProductContext