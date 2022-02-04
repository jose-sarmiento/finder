import React, { useState, useEffect } from 'react'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

function Stars({ count }) {
  const [stars, setStars] = useState(0)
  const [options, setOptions] = useState([])

  useEffect(() => {
    setStars(() => {
      return count / 2
    })

    const ooptions = []
    for (let index = 1; index <= 5; index++) {
      if (index <= Math.floor(stars)) {
        if (index === Math.floor(stars)) {
          if (index === stars) {
            ooptions.push(<BsStarFill key={index} />)
          } else {
            ooptions.push(<BsStarHalf key={index} />)
          }
        } else {
          ooptions.push(<BsStarFill key={index} />)
        }
      } else {
        ooptions.push(<BsStar key={index} />)
      }
    }
    setOptions(ooptions)
  }, [stars, count])

  return (
    <div>
      {options.map(op => {
        return op
      })}
    </div>
  )
}

export default Stars
