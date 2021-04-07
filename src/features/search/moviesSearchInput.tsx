import React, { useState } from 'react'
import styled from 'styled-components'
import seach from './../../style/search.svg'

interface InputProps {
  onSearchChange(value: string): void
  onSearchSubmit(value: string): void
}

const Input = styled.input`
  box-sizing: border-box;
  outline: none;
  border: none;
  padding: 10px;
  padding-left: 40px;
  width: 100%;
  color: #fff;
  font-size: 18px;
  background: transparent;
  border-bottom: 1px solid #0f9fbf;
`

const Button = styled.button`
  width: 30px;
  position: absolute;
  right: 8px;
  top: 13px;
  outline: none;
`

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
        <Input
          ref={inputEl}
          type='text'
          value={value}
          onChange={handleChange}
          placeholder='Seacrh movie...'
        />
        <Button>
          <img src={seach} alt='seach' />
        </Button>
      </form>
    </>
  )
}
