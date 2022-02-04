import React from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

function Button({ type, handleClick }) {
  if(type === 'next'){
    return (
       <button
      className='next-btn'
      onClick={() => handleClick(type)}
    >
      next
      <BsChevronRight/>
    </button>
    )
  }
  return (
       <button
      className='prev-btn'
      onClick={() => handleClick(type)}
    >
      <BsChevronLeft/>
      prev
    </button>
    )
}

export default Button
