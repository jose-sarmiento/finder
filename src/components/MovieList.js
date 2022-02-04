import React from 'react'
import { useGlobalContext } from '../context'
import Section from './Section'
import Loading from './Loading'

function MovieList() {
  const { state } = useGlobalContext()
  const {
    popular,
    topRated,
    nowPlaying,
    popularIsLoading,
    nowPlayingIsLoading,
    topRatedIsLoading,
    searchResults,
    searchTerm,
    isSearching
  } = state

  if (searchResults && isSearching) {
    return (
      <main>
        <section className='popular-section'>
          <h2 className='title'>Showing results for: '{searchTerm}'</h2>
          <Section movies={searchResults} fromResults={true} />
        </section>
      </main>
    )
  }

  return (
    <main>
      <section className='popular-section'>
        <h2 className='title'>What's Popular</h2>
        {popularIsLoading ? <Loading /> : <Section movies={popular} />}
      </section>

      <section className='top-rated-section'>
        <h2 className='title'>Top Rated</h2>
        {topRatedIsLoading ? <Loading /> : <Section movies={topRated} />}
      </section>
      <section className='now-playing-section'>
        <h2 className='title'>Now Playing</h2>
        {nowPlayingIsLoading ? <Loading /> : <Section movies={nowPlaying} />}
      </section>
    </main>
  )
}

export default MovieList
