import React, { useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import github from './../style/github.svg'
import style from './navbar.module.css'

export const Navbar = () => {
  
  const wrapperRef = useRef<HTMLElement | null>(null)
  const location = useLocation()
  const [isHidden, setHidden] = React.useState<boolean>(true)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        document.body.classList.remove('overlay')
        setHidden(true)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
  return (
    <nav className={style.nav} ref={wrapperRef}>
      <div className={style.container}>
        <div
          className={
            isHidden
              ? `${style.toggle}`
              : `${style.toggle} ${style.toggleHidden}`
          }
        >
          <button
            className={style.btn}
            onClick={() => handleClickBtn()}
          ></button>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul
          className={
            isHidden ? `${style.items}` : `${style.items} ${style.itemsHidden}`
          }
        >
          <li className={style.item}>
            <NavLink
              className={style.link}
              exact
              activeClassName={style.selected}
              to='/'
            >
              Popular
            </NavLink>
          </li>
          <li className={style.item}>
            <NavLink
              className={style.link}
              activeClassName={style.selected}
              to='/upcoming'
            >
              Up comning
            </NavLink>
          </li>
          <li className={style.item}>
            <NavLink
              className={style.link}
              activeClassName={style.selected}
              to='/top_rated'
            >
              Top rated
            </NavLink>
          </li>
          <li className={style.item}>
            <NavLink
              className={style.link}
              activeClassName={style.selected}
              to='/favorite'
            >
              Favorite
            </NavLink>
          </li>
          <li className={style.item}>
            <NavLink
              className={style.link}
              activeClassName={style.selected}
              to='/filter'
            >
              Filter
            </NavLink>
          </li>
          <li className={style.item}>
            <a
              className={style.link}
              href='https://github.com/ethnicolr/Movie-Search'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src={github}
                alt='github'
                className={style.icon}
                width='40'
              />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
