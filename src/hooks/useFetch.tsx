import React, { useEffect, useState, useReducer } from 'react'
import { isEqual } from 'lodash'
import {
  fetchMovieType,
  getMovies,
  Options,
  MoviesResult,
} from '../api/movieApi'
import { usePrevious } from './usePrevious'

interface Props {
  pathname: fetchMovieType
  options: Options
}

type Status = 'indle' | 'fetching' | 'fetched' | 'error'

interface State {
  data: MoviesResult | null
  status: Status
  error: string | null
}

type ACTIONTYPE =
  | { type: 'FETCHING' }
  | { type: 'FETCHED'; payload: MoviesResult }
  | { type: 'FETCH_ERROR'; payload: string }

function reducer(state: State, action: ACTIONTYPE): State {
  switch (action.type) {
    case 'FETCHING':
      return { ...state, status: 'fetching' }
    case 'FETCHED':
      return { ...state, status: 'fetched', data: action.payload }
    case 'FETCH_ERROR':
      return { ...state, status: 'error', error: action.payload }
    default:
      return state
  }
}


export const useFetch = ( options :Options) => {
  console.log(options.pathname);
  const initialState: State = {
    data: null,
    status: 'indle',
    error: null
  }
  const previousOptions = usePrevious(options)
  
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (!options) return
    if(isEqual(previousOptions, options)) return
      const fetchData = async () => {
        dispatch({ type: 'FETCHING' })
        try {
          const response = await getMovies(options)
          dispatch({ type: 'FETCHED', payload: response })
        } catch (err) {
          dispatch({ type: 'FETCH_ERROR', payload: err })
        }
      }
      fetchData()
    
  }, [options])

  return state
}
