import React, { useEffect, useState } from 'react'
import styled from 'styled-components';


    

function TopBtn() {
    
    const [isVisible, setIsVisible] = useState(false); //상태변수
    const onScrollTop = ()=>{
        window.scrollTop({
            top : 0,
            behavior : 'smooth'
        })
    }
    const toggleVisible = ()=>{
        //스크롤값이 200보다 많으면 커서를 나오게 하고 200보다 작으면 버튼을 숨김 처리
        //상태변수
        
        if(window.pageXOffset > 200){
            setIsVisible(true)
        }else{
            setIsVisible(false)
        }

    }
    useEffect(()=>{
        window.addEventListener('scroll',toggleVisible);
        return ()=>{
            window.removeEventListener('scroll',toggleVisible) //중첩 방지
        }
    },[])

    return (
        isVisible && (
            <Top onClick={onScrollTop}>
                 top
           </Top>
        )
           
    )
}

export default TopBtn

const Top = styled.div`
   position: fixed; 
   bottom: 30px;
   right: 30px;
   background: black;
   color: #fff;
`
