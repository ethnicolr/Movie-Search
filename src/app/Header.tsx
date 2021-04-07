import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import { MoviesSearchPage } from '../features/search/moviesSearchPage'
import { Navbar } from './Navbar'
import { Auth } from '../features/auth/Auth'
import { device, Title } from './lib'
import logo from './../style/react-logo.png'

const Head = styled.header`
  position: sticky;
  top: 0;
  z-index: 200;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  background-color: #0b0b0b;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas:
    '  lg lg in in at'
    ' nv nv nv nv nv ';
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 18px;
  align-items: center;

  @media ${device.laptopM} {
    padding-bottom: 25px;
    width: auto;
    margin: 0 25px;
    grid-template-columns: repeat(9, 1fr);
    grid-template-areas:
      'nv . . lg lg lg . . .'
      '. in in in in in in in .';
  }

  @media ${device.mobileM} {
    grid-template-areas:
      'nv . . lg lg lg . . .'
      'in in in in in in in in in';
    margin: 0 15px;
  }
`

const Logo = styled(Link)`
  grid-area: lg;
  display: flex;
  justify-self: center;
  align-items: center;
  position: relative;
  z-index: 50;
  img {
    width: 40px;
    margin-right: 10px;
  }
`

export const Header = () => {
  return (
    <Head>
      <Container>
        <Logo to='/'>
          <img src={logo} alt='logo' />
          <Title size={'40px'}>Movies-Search</Title>
        </Logo>

        <MoviesSearchPage />
        <Auth />
        <Navbar />
      </Container>
    </Head>
  )
}
