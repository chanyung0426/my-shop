import React, { useEffect, useState } from 'react'
import DetailPageEvent from '../components/DetailPageEvent';
import SortButton from './SortButton';
import PropTypes from 'prop-types';

function CategoryProductList({category,product}) {
    const [ sortProducts, setSortProducts] = useState(product);

    useEffect(()=>{
        setSortProducts(product)
    }, [product]);

    const sortName = ()=>{
        const sortList = [...product].sort((a, b)=>{
            if(!a.name || !b.name){
                return 0
                //둘 중에 하나라도 이름이 정의되지 않았다면 순서를 변경하지 말 것
            }
            return a.name.charAt(0).localCompare(b.name.charAt(0))
            //localeCompare = 문자열과 문자열을 서로 비교하고 정렬순서에 따라 비교하는 함수
        })
        setSortProducts(sortList);
    }

    const sortPrice = ()=>{
        const sortList = [...product].sort((a,b)=>a.price - b.price);
        setSortProducts(sortList);
    }
  
    return (
        <div>
            <div className='container'>
               <h2>{category}</h2>

               <SortButton sortName={sortName} sortPrice={sortPrice}/>

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

CategoryProductList.propTypes={
    category : PropTypes.string.isRequired,
    product : PropTypes.arrayOf(PropTypes.Object).isRequired,
}

export default CategoryProductList
