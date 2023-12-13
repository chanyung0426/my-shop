import React from 'react'
import { useParams } from 'react-router-dom'
import CategoryProductList from '../components/CategoryProductList';

function CategoryPages() {
    const {category} = useParams();
    console.log(category)
    return (
        <div>
            {category}
            <CategoryProductList category={category}/>
        </div>
    )
}

export default CategoryPages
