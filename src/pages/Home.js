import React, {useEffect} from 'react'
import Hero from '../components/Hero'
import MovieList from '../components/MovieList'
import {useGlobalContext} from "../context"

function Home() {
  const {state: {searchTerm}, dispatch} = useGlobalContext()

  useEffect(() => {
    if(!searchTerm) dispatch({type: "CLEAR"})
  }, [searchTerm, dispatch])
  
  return (
    <>
      <Hero />
      <MovieList />
    </>
  )
}

export default Home
