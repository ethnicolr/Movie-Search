import React, { useState } from 'react'
import styled from 'styled-components'
import { Input, FormGroup, Form, Button } from './../../app/lib'

import { useAuth, singupType, loginType } from '../../context/authContext'
import { useAsync } from '../../hooks/useAsync'
import { Spinner } from '../../app/Spinner'

const LoginButton = styled(Button)`
  background-color: #0b0b0b;
  color: #fff;
  width: 100%;
`
const Link = styled.a`
  text-decoration: none;
  cursor: pointer;
  font-weight: 400;
  color: #0366d6;
`
const LinkContainer = styled.p`
  padding: 15px 20px;
  text-align: center;
  border: 1px solid var(--color-border-tertiary);
  border-radius: 6px;
  font-weight: 400;
`
type FormProps = {
  showLogin: () => void
}

export function AuthSingup({ showLogin }: FormProps): JSX.Element {
  const { login, singup } = useAuth()
  const { run, error, isLoading, isError } = useAsync()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
    }
    const email = target.email.value
    const password = target.password.value

    run(singup(email, password))
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

      <div>
        <LoginButton type='submit'>
          {isLoading ? (
            <Spinner color={'#fff'} width={'15px'} height={'15px'} />
          ) : (
            'Register'
          )}
        </LoginButton>
      </div>

      <FormGroup>{isError && <p>{error}</p>}</FormGroup>
      <LinkContainer>
        <Link onClick={showLogin}>Login</Link>
      </LinkContainer>
    </Form>
  )
}
