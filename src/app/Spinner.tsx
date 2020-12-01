import React from 'react'
import style from './spiner.module.css'

export const Spinner = () => {
  return (
    <div className={style.container}>
      <div className={style.threeDots}>
        <span className={style.dot}></span>
        <span className={style.dot}></span>
        <span className={style.dot}></span>
      </div>
    </div>
  )
}

export default Spinner
