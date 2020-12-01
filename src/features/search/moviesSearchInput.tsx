import React, { useState } from 'react'

import seach from './../../style/search.svg'
import style from './moviesSearchInput.module.css'
interface InputProps {
  onSearchChange(value: string): void
  onSearchSubmit(value: string): void
}

export const MoviesSearchInput = ({
  onSearchChange,
  onSearchSubmit,
}: InputProps) => {
  const [value, setValue] = useState('')
  const inputEl = React.useRef<HTMLInputElement>(null!)

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value
    setValue(value)
    onSearchChange(value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (value.length) {
      onSearchSubmit(value)
      inputEl.current.blur()
      document.body.style.overflow = 'auto'
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputEl}
          className={style.input}
          type='text'
          value={value}
          onChange={handleChange}
          placeholder='Seacrh movie...'
        />
        <button className={style.btn}>
          <img src={seach} alt='seach' />
        </button>
      </form>
    </>
  )
}
