import React, { useState } from 'react'
import { useAuth, singupType, loginType } from '../../context/authContext'

type FormProps = {
  buttenText: string
  onSubmit: singupType | loginType
}

export function AuthForm({ buttenText, onSubmit }: FormProps): JSX.Element {
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
      await onSubmit(email, password)
    } catch (err) {
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
        <button type='submit'>{buttenText}</button>
      </div>
      {error && <p>{error}</p>}
    </form>
  )
}
