import React from 'react'
import { FilterGenres } from './filterGenres'
import { FilterSorting } from './filterSorting'
import { LoadFilterMovies } from '../movies/moviesLoadFilter'
import style from './filerPage.module.css'
import styled from 'styled-components'
import { device } from '../../app/lib'

const Filter = styled.div`
  position: relative;
  width: 75%;
  min-height: 70vh;
  margin: 0 auto;
  display: grid;
  background-color: rgb(241, 241, 241);
  grid-template-columns: 6fr 1fr;
  grid-template-areas:
    'sr gl'
    'ml gl';
  grid-template-rows: 80px;
  min-height: 87vh;
  @media ${device.laptopS} {
    grid-template-areas:
      ' gl'
      'sr'
      'ml';
    grid-template-columns: 1fr;
  }
`

const Sort = styled.div`
  grid-area: sr;
  max-height: 45px;
  border-bottom: 1px solid #ddd;
`

const Genres = styled.div`
  grid-area: gl;
  border-left: 1px solid #ddd;
`

const Movies = styled.div`
  grid-area: ml;
`

export const FilterPage = () => {
  return (
    <Filter>
      <Sort>
        <FilterSorting />
      </Sort>
      <Genres>
        <FilterGenres />
      </Genres>
      <Movies>
        <LoadFilterMovies />
      </Movies>
    </Filter>
  )
}