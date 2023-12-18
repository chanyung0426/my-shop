import React from 'react'
import { useLocation } from 'react-router-dom'

function BoardDetailPage() {
    const state = useLocation().state;
    const {id, use, date, title, text} = state
    return (
        <div className='container'>
            <div className='boardTextBox'>
                <strong>{title}</strong>
                <p>{text}</p>
                <p>{date}</p>
            </div>
        </div>
    )
}

export default BoardDetailPage
