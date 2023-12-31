import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components';
import UseCart from '../context/UseCart';

function ProductDetail() {
    const {addItemCart} = UseCart();
    const state = useLocation().state;
    console.log(state)
    const {id, image, price, option, colors, title, description, category} = state;
    //console.log(option)
    const setopt = option.split(',').map((option)=>option.trim())
    const [selected, setSelected] = useState(setopt && setopt[0])
    const [sucess, setSuccess] = useState(); //장바구니 아이템 전송 여부 값
    
    const selectOpt =(e)=>{
        console.log(selected)
        setSelected(e.target.value)
    }

    const cartItem = ()=>{
        const product ={id, image, title, price, option:selected, quantity : 1}
        //quantity : 수량

        addItemCart.mutate(product,{
            onSuccess : ()=>{
                setSuccess('장바구니에 아이템이 추가되었습니다.')
            }
        })
    }
    return (
        <div className='container'>
            <DetailPage>
                <div className='detailImg'>
                <img src={image} alt={title}/>
                </div>
                <div className='detailText'>
                    <h3>{title}</h3>
                    <p className='price'>가격<span>{price}</span></p>
                    <p className='description'>{description}</p>

                    <div className='detailOpt'>
                        {/* 리액트에서는 label의 for대신에 htmlFor로 변경하여 사용 */}
                        <label className='labelText' htmlFor='optSelect'>옵션</label>
                        <select id="optSelect" onChange={selectOpt} value={selected} >
                            {setopt && setopt.map((option,index)=>(
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='detailBtns'>
                    <button className='cartBtn' onClick={cartItem}>장바구니 담기</button>
                    <button className='buyBtn'>구매하기</button>
                </div>
                {sucess && <p>{sucess}</p>}
            </DetailPage>
           
        </div>
    )
}

export default ProductDetail

const DetailPage = styled.div`
    width: 100%;
    display: flex;
    gap: 40px;
    .detailImg{
        max-width: 400px;
        img{
            width: 100%;
            display: block;
        }
    }
    .detailText{
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        h3{
            font-size: 24px;
            width: 100%;
            font-weight: normal;
            border-bottom: solid 1px rgba(0,0,0,0.1);
            padding-bottom: 20px;
        };
    }
    .price{
        display: flex;
        align-items: center;
        gap: 30px;
    }
`