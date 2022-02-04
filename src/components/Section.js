import React, { useState, useEffect } from 'react'
import Movie from './Movie'
import Button from './Button'

function Section({ movies, fromResults }) {
  const [activeMovies, setActiveMovies] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    setPageSize(10)
    const selectedMovies = paginate(movies, pageSize, pageNumber)
    setActiveMovies(selectedMovies)
    setPageCount(Math.floor(movies.length / pageSize))
  }, [pageNumber, movies, pageSize])

  const handleIncrease = () => {
    setPageNumber(prevState => {
      let count = prevState + 1
      if (count > pageCount) {
        return 1
      } else {
        return count
      }
    })
  }

  const handleDecrease = () => {
    setPageNumber(prevState => {
      let count = prevState - 1
      if (count < 1) {
        return pageCount
      } else {
        return count
      }
    })
  }

  const handleClick = type => {
    if (type === 'next') {
      handleIncrease()
    } else {
      handleDecrease()
    }
  }
 
  return (
    <div className='movies'>
      {activeMovies.map(item => {
        return <Movie key={item.id} {...item} fromResults={fromResults} />
      })}
      <div className='btn-wrapper'>
        <Button type='prev' handleClick={handleClick} />
        <Button type='next' handleClick={handleClick} />
      </div>
    </div>
  )
}

const paginate = (array, pageSize, pageNumber) => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
}

export default Section
