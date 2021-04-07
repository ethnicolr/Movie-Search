import React, { useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import github from './../style/github.svg'
import styled from 'styled-components'
import { device } from './lib'
// import style from './navbar.module.css'
import Toggle from './Toggle'
import { useClickOutSide } from './../hooks/useClickOutSide'

const Nav = styled.nav`
  grid-area: nv;
  font-size: 20px;
  transition: ease 0.3s;
  media ${device.laptopM} {
    justify-self: center;
  }
`

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${device.laptopM} {
    flex-direction: column;
    align-items: flex-end;
    box-sizing: border-box;
    position: absolute;
    z-index: 100;
    left: 0;
    bottom: -361px;
    width: 250px;
    background-color: #212121;
    -webkit-font-smoothing: antialiased;
    transform-origin: 0% 0%;
    transform: translate(-100%, 0);
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  }
`

const ListHidden = styled(List)`
  transform: none;
`

const Item = styled.li`
  cursor: pointer;
  @media ${device.laptopM} {
    width: 100%;
    margin-left: 40px;
    display: block;
  }
  @media ${device.mobileM} {
    margin-left: 0;
  }
`
const activeClassName = 'nav-item-active'

const Link = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    &::after {
      transform: scaleY(1);
    }
    @media ${device.laptopM} {
      background-color: #252525;
    }
  }
  display: inline-block;
  color: #fff;
  font-weight: 400;
  line-height: 60px;
  position: relative;
  transition: color 0.3s ease;
  &:hover {
    color: #999;
  }

  &::after {
    content: '';
    position: absolute;
    background-color: #fff;
    width: 100%;
    height: 4px;
    bottom: 0px;
    left: 0;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 235ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  @media ${device.laptopM} {
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding-left: 25px;
    &::after {
      display: none;
    }
  }
`

const Icon = styled.img`
  transition: opacity 0.3s ease;
  width: 25px;
  &:hover {
    opacity: 0.6;
  }
`

export const Navbar = () => {
  const wrapperRef = useRef<HTMLElement | null>(null)
  const location = useLocation()
  const [isHidden, setHidden] = React.useState<boolean>(true)

  useClickOutSide(wrapperRef, () => {
    document.body.classList.remove('overlay')
    setHidden(true)
  })

  useEffect(() => {
    setHidden(true)
    document.body.classList.remove('overlay')
  }, [location.key])

  const handleClickBtn = () => {
    if (isHidden) {
      setHidden(false)
      document.body.classList.toggle('overlay')
    } else {
      setHidden(true)
      document.body.classList.toggle('overlay')
    }
  }

  const Items = isHidden ? List : ListHidden
  return (
    <Nav ref={wrapperRef}>
      <Toggle isHidden={isHidden} onClick={() => handleClickBtn()} />
      <Items>
        <Item>
          <Link exact to='/'>
            Popular
          </Link>
        </Item>
        <Item>
          <Link to='/upcoming'>Up comning</Link>
        </Item>
        <Item>
          <Link to='/top_rated'>Top rated</Link>
        </Item>
        <Item>
          <Link to='/favorite'>Favorite</Link>
        </Item>
        <Item>
          <Link to='/filter'>Filter</Link>
        </Item>
        <Item>
          <a
            href='https://github.com/ethnicolr/Movie-Search'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Icon src={github} alt='github' width='40' />
          </a>
        </Item>
      </Items>
    </Nav>
  )
}
