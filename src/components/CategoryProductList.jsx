import React from 'react'
import DetailPageEvent from '../components/DetailPageEvent';

function CategoryProductList({category,product}) {
  
    return (
        <div>
            <div className='container'>
               <h2>{category}</h2>

               <ul className='productList'>
                {product.map((product)=>(
                    <li key={product.id}>
                        <DetailPageEvent product={product}/>
                    </li>
                ))}
               </ul>
            </div>
        </div>
    )
}


export default CategoryProductList
