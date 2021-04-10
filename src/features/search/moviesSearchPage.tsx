import React, { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'
import { useHistory, useLocation } from 'react-router-dom'
import { useClickOutSide } from '../../hooks/useClickOutSide'
import { useAsync } from '../../hooks/useAsync'
import { getMovies, MoviesResult } from '../../api/movieApi'
import { MoviesSearchInput } from './moviesSearchInput'
import { MoviesSearchList } from './moviesSearchList'
import { Spinner } from '../../app/Spinner'
import { Title } from '../../app/lib'
import styled from 'styled-components'

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
const Text = styled.div`
  text-align: center;
  padding: 15px 5px;
`

export const MoviesSearchPage = () => {
  const [isHidden, setHidden] = useState(false)
  const history = useHistory()
  const location = useLocation()

  const wrapperRef = React.useRef<HTMLDivElement | null>(null)

  const {
    run,
    data,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useAsync<MoviesResult>()

  const delay = useCallback(
    debounce((value: string) => {
      if (value.length) {
        run(getMovies({ pathname: '/search', search: value }))
      }
    }, 500),
    []
  )

  useEffect(() => {
    setHidden(true)
  }, [location.key])

  useClickOutSide(
    wrapperRef,
    () => setHidden(true),
    () => setHidden(false)
  )

  const onSearchSubmit = (value: string): void => {
    history.push({
      pathname: '/search',
      search: value,
    })
  }

  let previewList

  if (isSuccess && data?.moviesList.length === 0) {
    previewList = (
      <Text>
        <Title size={'25px'} color={'#fff'}>
          Not found
        </Title>
      </Text>
    )
  } else if (isError) {
    previewList = (
      <Text>
        <Title size={'25px'} color={'#fff'}>
          {error}
        </Title>
      </Text>
    )
  } else if (isSuccess && data) {
    previewList = <MoviesSearchList movies={data.moviesList.slice(0, 5)} />
  } else if (isLoading) {
    previewList = <Spinner color={'#fff'} width={'15px'} height={'15px'} />
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
