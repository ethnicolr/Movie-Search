import React, { useState, useEffect, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { debounce } from 'lodash'
import { getMovies, MovieType } from '../../api/movieApi'
import { MoviesSearchInput } from './moviesSearchInput'
import { MoviesSearchList } from './moviesSearchList'
import styled from 'styled-components'

type searchStatus = 'indle' | 'pendiing' | 'succeeded' | 'failed'

const Search = styled.div`
  grid-area: in;
  position: relative;
  z-index: 20;
  grid-area: in;
`

const Container = styled.div`
  position: absolute;
  width: 100%;
  background: #212121;
  z-index: 10;
`

const HiddenContainer = styled(Container)`
  display: none;
`

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
      setStatus('pendiing')
      const fetchS = async () => {
        try {
          const data = await getMovies({ pathname: '/search', search: value })
          const list = data.moviesList.slice(0, 5)
          setList(list)
          setStatus('succeeded')
        } catch (err) {
          setStatus('failed')
          console.log('fail')
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
  }, [])

  const onSearchSubmit = (value: string): void => {
    history.push({
      pathname: '/search',
      search: value,
    })
  }

  let previewList

  if (list.length === 0 && searchStatus === 'succeeded') {
    previewList = <h2>Not found</h2>
  } else if (error) {
    previewList = <h2>{error}</h2>
  } else {
    previewList = <MoviesSearchList movies={list} />
  }

  const Wrapper = isHidden ? HiddenContainer : Container

  return (
    <>
      <Search ref={wrapperRef}>
        <MoviesSearchInput
          onSearchChange={delay}
          onSearchSubmit={onSearchSubmit}
        />
        <Wrapper>{previewList}</Wrapper>
      </Search>
    </>
  )
}
