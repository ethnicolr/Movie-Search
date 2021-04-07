import React, { useState } from 'react'
import styled from 'styled-components'
import { Input, FormGroup, Form, Button } from './../../app/lib'

import { useAuth, singupType, loginType } from '../../context/authContext'

export function AuthSingup(): JSX.Element {
  const { login, singup } = useAuth()
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
      passwordConfirm: { value: string }
    }
    const email = target.email.value
    const password = target.password.value
    const passwordConfirm = target.passwordConfirm.value

    if (password !== passwordConfirm) {
      setError('Passwords do not match')
      return
    }

    try {
      await singup(email, password)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor='email'>Email</label>
        <Input id='email' type='text' />
      </FormGroup>
      <FormGroup>
        <label htmlFor='password'>Password</label>
        <Input id='password' type='password' />
      </FormGroup>
      <FormGroup>
        <label htmlFor='passwordConfirm'>Confirm password</label>
        <Input id='passwordConfirm' type='password' />
      </FormGroup>
      <FormGroup>
        <Button type='submit'>Register</Button>
      </FormGroup>
      {error && <h1>{error}</h1>}
    </Form>
  )
}
