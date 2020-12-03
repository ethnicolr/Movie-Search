import React, { useState, useEffect, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { debounce } from 'lodash'
import { getMovies,MovieType } from '../../api/movieApi'
import { MoviesSearchInput } from './moviesSearchInput'
import { MoviesSearchList } from './moviesSearchList'
import style from './moviesSearchPage.module.css'

type searchStatus = 'indle' | 'pendiing' | 'succeeded' | 'failed'

export const MoviesSearchPage = () => {
  const [isHidden, setHidden] = useState(false)
  const [list, setList] = useState<MovieType[]>([])
  const [searchStatus, setStatus] = useState<searchStatus>('indle') 
  const [error, setError] = useState(null)
  const history = useHistory()
  const location = useLocation()

  const wrapperRef = React.useRef<HTMLDivElement | null>(null)

  const delay = useCallback(
    debounce((value: string) => {
      
    
      setStatus("pendiing")
      const fetchS = async () => {
        try {
          const data = await getMovies({pathname: '/search', search: value})
          const list = data.moviesList.slice(0, 5)
          setList(list)
          setStatus('succeeded')
        } catch (err){
          setStatus('failed')
          console.log("fail");
          setError(err)
        }
      }
      if (value.length) {
        fetchS()
      } else {
        setList([])
      }
    }, 500),
    []
  )

  useEffect(() => {
    setHidden(true)
  }, [location.key])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setHidden(true)
      } else {
        setHidden(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  },[])

  const onSearchSubmit = (value: string): void => {
    history.push({
      pathname: '/search',
      search: value
    })
  }

  let previewList

  if (list.length === 0 && searchStatus === 'succeeded') {
    previewList = <h2>Not found</h2>
  } else if (error) {
    <h2>{error}</h2>
  } else {
    previewList = <MoviesSearchList movies={list} />
  }

  return (
    <>
      <div className={style.search} ref={wrapperRef}>
        <MoviesSearchInput
          onSearchChange={delay}
          onSearchSubmit={onSearchSubmit}
        />
        <div
          className={
            isHidden
              ? `${style.container} ${style.hidden}`
              : `${style.container}`
          }
        >
          {previewList}
        </div>
      </div>
    </>
  )
}
