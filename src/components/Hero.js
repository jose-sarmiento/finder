import React, {useState, useEffect} from 'react'
import { useGlobalContext } from '../context'

function Hero() {
  const [index, setIndex] = useState(0)
  const { state, dispatch } = useGlobalContext()
  const { popularIsLoading, top5 } = state 

  const focus = () => {
    dispatch({ type: 'SET_FOCUS' })
  }

  useEffect(() => {
       if(!top5) return;
    
    if(index > top5.length - 1) {
      setIndex(0)
    }
  }, [index, top5])

  useEffect(() => {
    if(!top5) return;

    const interval = setInterval(() => {
      setIndex(index + 1)
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [top5, index])

  if(popularIsLoading) return null;

  return (
    <section className='hero'>
      {
        top5.map((img, idx) => {
          let position = "hero__preview-image hero__preview-image--next"
          if (idx === index) {
            position = "hero__preview-image hero__preview-image--current"
          }
          if (idx === index -1 || (index === 0 && idx === top5.length - 1)) {
            position = "hero__preview-image hero__preview-image--prev"
          }
          return (
            <img 
              key={idx}
              src={`https://image.tmdb.org/t/p/w1280/${img.backdrop_path}`} alt="test"
              className={position} 
            />
            )
        })
      }

      <div className='hero-content'>
        <h2>Finding movies made Simple</h2>
        <h4>We provide millions of movies for your next watchlist</h4>
        <button className='btn-search' onClick={focus}>
          Search now
        </button>
      </div>
    </section>
  )
}

export default Hero
