import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth, singupType, loginType } from '../../context/authContext'
import {
  Input,
  FormGroup,
  Form,
  Button,
  Spinner,
  Dots,
  Dot,
} from './../../app/lib'
import { useAsync } from './../../hooks/useAsync'

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
  showRegister: () => void
}

export function AuthLogin({ showRegister }: FormProps): JSX.Element {
  const { login } = useAuth()

  const { error, run, isLoading, isError } = useAsync()
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
    }
    const email = target.email.value
    const password = target.password.value

    run(login(email, password))
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
            <Spinner>
              <Dots>
                <Dot bgColor={'#fff'} />
                <Dot bgColor={'#fff'} />
                <Dot bgColor={'#fff'} />
              </Dots>
            </Spinner>
          ) : (
            'Login'
          )}
        </LoginButton>
      </div>
      <FormGroup>{isError && <p>{error}</p>}</FormGroup>

      <LinkContainer>
        Need account?
        <Link onClick={showRegister}> Create an account.</Link>
      </LinkContainer>
    </Form>
  )
}
