import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div class='error-container'>
      <h3>Error: 404!</h3>
      <h2 className='error'>PAGE NOT FOUND</h2>
      <Link to='/' className='btn'>
        Back to Home
      </Link>
    </div>
  )
}

export default Error
