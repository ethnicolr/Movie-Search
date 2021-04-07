import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortBy } from './filterSlice'
import { RootState } from './../../app/store'
import style from './filterSorting.module.css'
import styled from 'styled-components'
import { Title } from '../../app/lib'

const Container = styled.div`
  text-align: right;
  padding: 20px 25px 10px 0;
`

const Items = styled.ul`
  display: flex;
  justify-content: flex-end;
`

export const FilterSorting = () => {
  const dispatch = useDispatch()
  const active = useSelector((state: RootState) => state.filter.sortBy)

  const handleSort = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(sortBy(e.currentTarget.name))
  }

  const sortActivity = (field: string) => {
    return active === `${field}.desc`
      ? `${style.sortBtn} ${style.desc}`
      : `${style.sortBtn} ${style.asc}`
  }

  return (
    <Container className={style.sort}>
      <Title size={'20px'}>Sort by</Title>
      <Items>
        <li>
          <button
            className={sortActivity('popularity')}
            name='popularity'
            onClick={handleSort}
          >
            popularity
          </button>
        </li>
        <li className={style.item}>
          <button
            className={sortActivity('release_date')}
            name='release_date'
            onClick={handleSort}
          >
            date
          </button>
        </li>
        <li className={style.item}>
          <button
            className={sortActivity('vote_average')}
            name='vote_average'
            onClick={handleSort}
          >
            rating
          </button>
        </li>
      </Items>
    </Container>
  )
}
