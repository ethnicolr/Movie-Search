import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeGenres } from './filterSlice'
import { RootState } from '../../app/store'
import { fetchGenres } from './filterSlice'
// import style from './filterGenres.module.css'
import styled from 'styled-components'
import { device, Title } from '../../app/lib'

const Container = styled.div`
  padding-left: 15px;
  position: sticky;
  top: 145px;
  @media ${device.laptopS} {
    text-align: center;
    position: sticky;
    top: 150px;
  }
`

const List = styled.ul`
  @media ${device.laptopS} {
    padding: 1px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    text-align: center;
  }
`

const Item = styled.li`
  @media ${device.laptopS} {
    min-width: 150px;
    margin-right: 15px;
  }
`

const Label = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  user-select: none;
  font-size: 15px;
  padding: 8px 8px 8px 40px;

  &:hover {
    background-color: #e1e1e1;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  input:checked + label {
    background-color: #0f9fbf;
  }
  input:checked ~ span::after {
    display: block;
  }
`

const Checkmark = styled.span`
  position: absolute;
  top: 7px;
  left: 10px;
  height: 20px;
  width: 20px;
  background-color: #cfcfcf;

  &::after {
    content: '';
    position: absolute;
    display: none;
  }

  &::after {
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid #0f9fbf;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

export const FilterGenres = () => {
  const dispatch = useDispatch()
  const genres = useSelector((state: RootState) => state.filter.genres)

  useEffect(() => {
    if (genres.length === 0) {
      dispatch(fetchGenres())
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeGenres(e.currentTarget.name))
  }

  return (
    <Container>
      <Title size={'20px'}>Genres</Title>
      <List>
        {genres.length
          ? genres.map((genre) => {
              return (
                <Item key={genre.id}>
                  <Label>
                    {genre.name}
                    <input
                      type='checkbox'
                      onChange={handleChange}
                      checked={genre.selected}
                      name={genre.id}
                    />
                    <Checkmark />
                  </Label>
                </Item>
              )
            })
          : null}
      </List>
    </Container>
  )
}
