import React, { useEffect, useContext, useReducer } from 'react'
import { reducer } from './reducer'
require('dotenv').config()

export const AppContext = React.createContext()

  const initialsState = {
    searchTerm: '',
    isSearching: false,
    searchresults: [],
    popular: [],
    nowPlaying: [],
    topRated: [],
    popularIsLoading: true,
    topRatedIsLoading: true,
    nowPlayingIsLoading: true,
    error: false,
    isFocused: false,
    favorites: []
  }

  const favoritesFromStorage = localStorage.getItem('moviedb.favorites') 
    ? JSON.parse(localStorage.getItem('moviedb.favorites')) : null

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialsState)

  useEffect(() => {
    if(!favoritesFromStorage) return;
    dispatch({type: 'ADD_ITEMS_TO_STORAGE', payload: favoritesFromStorage})
  }, [])

  const fetchMovies = async (url, action) => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      const { results } = data

      const finalResult = results.map(movie => {
        const {
          id,
          original_title,
          poster_path,
          backdrop_path,
          release_date,
          vote_average
        } = movie
        return {
          id,
          original_title,
          poster_path,
          backdrop_path,
          release_date,
          vote_average
        }
      })
      dispatch({ type: action, payload: finalResult })
    } catch (e) {
      console.log('error', e)
      dispatch({ type: 'ERROR' })
    }
  }

  useEffect(() => {
    fetchMovies(`${process.env.REACT_APP_API_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`, 'SET_POPULAR')
    fetchMovies(`${process.env.REACT_APP_API_URL}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`, 'SET_TOPRATED')
    fetchMovies(
      `${process.env.REACT_APP_API_URL}/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`,
      'SET_NOWPLAYING'
    )
  }, [])

  useEffect(() => {
    if (state.isSearching) {
      fetchMovies(
        `${process.env.REACT_APP_API_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${state.searchTerm}`,
        'SEARCHING'
      )
    }
  }, [state.searchTerm, state.isSearching])

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// custom hooks
export const useGlobalContext = () => {
  return useContext(AppContext)
}
