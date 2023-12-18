import React from 'react'
import PropTypes from 'prop-types';

function SortButton({sortName, sortPrice}) {
    return (
        <>
            <button onClick={sortName}>이름순</button>
            <button onClick={sortPrice}>가격순</button>
        </>
    )
}

SortButton.PropTypes = {
    sortName : PropTypes.func.isRequired,
    sortPrice : PropTypes.func.isRequired,
}
export default SortButton
