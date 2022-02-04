import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {FaHeart, FaSearch} from "react-icons/fa"
import Modal from './Modal'
import { useGlobalContext } from '../context'


const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { state, dispatch } = useGlobalContext()

  const searchInput = useRef(null)

  const handleChange = () => {
    const q = searchInput.current.value
    if (!q || q === '') {
      dispatch({ type: 'IS_NOT_SEARCHING' })
      dispatch({ type: 'CLEAR' })
    } else {
      dispatch({ type: 'IS_SEARCHING' })
      dispatch({ type: 'SEARCHTERM_CHANGED', payload: q })
    }
  }

  useEffect(() => {
    if(!state.isSearching) {
      searchInput.current.value = ''
    }
  }, [state.isSearching])

  useEffect(() => {
    if (state.isFocus === true) {
      searchInput.current.focus()
    }
  })

  return (
    <>
    <header>
      <div className='header-container'>
        <span className='logo'>
          <Link to='/'>
            <span className='text'>
              <span className='f'>F</span>inder
            </span>
          </Link>
        </span>
        <form className='search'>
          <input
            className='hide'
            type='text'
            placeholder='Search your favorite movie'
            ref={searchInput}
            onChange={handleChange}
            value={state.searchTerm}
          />
          <FaSearch className="m-glass" />
        </form>
      </div>
    </header>
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    <button className="favorites" onClick={() => setIsOpen(prev => !prev)}><FaHeart /></button>
    </>
  )
}

export default Header
