import React from 'react'
import { VscLoading } from 'react-icons/vsc'

function Loading() {
  return (
    <div className='loading'>
      <VscLoading className='spinner' />
      <p>Please wait...</p>
    </div>
  )
}

export default Loading
