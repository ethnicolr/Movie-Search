import React, {useState, useEffect} from 'react'

import { MovieType } from '../../api/movieApi'
import Movie from './moviesListItem'
import style from './moviesList.module.css'

interface MoviesProp {
  movies: MovieType[]
  favorite: MovieType[]
}

const List = ({ movies, favorite }: MoviesProp) => {
  const [isScroll, setScroll] = useState(false);

  function toggleVisibility(){
    if(window.pageYOffset > 300){
      setScroll(true)
    } else {
      setScroll(false)
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  useEffect(() => {
    document.addEventListener('scroll', toggleVisibility)
    return () => {
      document.removeEventListener('scroll', toggleVisibility)
    }
  })
  return (
    <ul className={style.moviesList}>
      {movies.map((movie) => {
        const isFav = favorite.some((favorite) => favorite.id === movie.id)
        return (
          <li className={style.item} key={movie.id}>
            <Movie movieData={movie} isFav={isFav} />
          </li>
        )
      })}
      {isScroll && <div onClick={scrollToTop} className={style.scroll}>Top</div>}
    </ul>
  )
}

export default List
