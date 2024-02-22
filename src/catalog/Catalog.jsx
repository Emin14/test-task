import React from 'react'

export default function Catalog({products}) {

   if(products) {
      return (
         <div>
            {products.map(product => (
              <div className='block'>
                <p className='title'>{product.product}</p>
                <p>price: {product.price}</p>
                {product.brand && <p>brand: {product.brand}</p>}
                <p>ID: {product.id}</p>
              </div>
            ))}
         </div>
        )
   }
}
