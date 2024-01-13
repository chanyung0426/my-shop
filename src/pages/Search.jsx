import React from 'react'
import { useEffect, useState } from 'react';
import { searchProducts } from '../api/firebase';
import DetailPageEvent from '../components/DetailPageEvent';


function Search() {

    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
   
    useEffect(()=>{
        const fetchProducts = async()=>{
            if(query.trim() === ''){
                setResult([])
            }else{
               try{
                const txt = await searchProducts(query);
                setResult(txt);
               }catch(error){
                console.error(error)
               }
            }
        }
         fetchProducts()
    }, [query])

    const onSearchEvent=(e)=>{
        e.preventdefault()
        setQuery(e.target.value);
        //onsole.log(query)
    }

    return (
        <>
         <div className='container'>
            <input type='text' value={query} onChange={onSearchEvent} className='searchForm'/>
           
           
        </div>
         <ul className='productList'>
         {result.map((product)=>(
             <li>
                 <DetailPageEvent key={product.id} product={product}/>
             </li>
         ))}
         </ul>
        </>
       
    )
}

export default Search



