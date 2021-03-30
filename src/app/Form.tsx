/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React, { useState } from 'react'
import { useAuth } from './../context/authContext'

type FormProps = {
  buttenText: string
  onSubmit: Function
}

export default function Form({ buttenText }: FormProps): JSX.Element {
  const { singup } = useAuth()
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
    }
    const email = target.email.value // typechecks!
    const password = target.password.value
    try {
      await singup(email, password)
    } catch (err) {
      console.log(err)
      setError(err.message)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='email'>Email</label>
        <input id='email' type='text' />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input id='password' type='password' />
      </div>
      <div>
        <button type='submit' css={{ color: 'red' }}>
          {buttenText}
        </button>
      </div>
      {error && <h1>{error}</h1>}
    </form>
  )
}
