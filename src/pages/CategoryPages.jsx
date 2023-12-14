import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CategoryProductList from '../components/CategoryProductList';
import { getCategoryProduct } from '../api/firebase';
import CategorySlider from '../components/CategorySlider';

function CategoryPages() {
    const {category} = useParams();
    const [products, setProducts] = useState([]);

    const [randomImages, setRandomImages] = useState([]);

    useEffect(()=>{
        getCategoryProduct(category).then((product)=>{
            setProducts(product);
        }).catch((error)=>{
            console.error(error)
        })
    }, [category])
    console.log(products)

    useEffect(()=>{
        if(products.length > 0){
            const randomImg = [...products].sort(()=> 0.5-Math.random())
            console.log(randomImg)
            const selectImg = randomImg.slice(0,4).map((el)=>el.image)
            setRandomImages(selectImg)
            console.log(randomImages)
        }
    },[products])
    
    //1. 모든순간 2.마운트되는순간 3.category가 바뀌는 순간
    return (
        <div>
            {category}
            <CategorySlider imgs={randomImages}/> 
            <CategoryProductList category={category} product={products}/>
        </div>
    )
}

export default CategoryPages
