import React, { Fragment } from 'react'
import styled from 'styled-components'

import { useAuth } from '../../context/authContext'
import { AuthModal } from './AuthModal'
import { AuthLogin } from './AuthLogin'
import { AuthSingup } from './AuthSingup'
import { useClickOutSide } from './../../hooks/useClickOutSide'

const Button = styled.button`
  color: #fff;
  font-weight: normal;
  font-size: 20px;
  transition: color 0.3s ease;
  outline: none;
  &:hover {
    color: #999;
  }
`

const Container = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
})

export function Auth() {
  const loginRef = React.createRef<HTMLDivElement>()
  const singUpRef = React.createRef<HTMLDivElement>()

  const {
    currentUser,
    logout,
    isOpenLogin,
    isOpenSingUp,
    handleLoginModal,
    handleSingUpModal,
  } = useAuth()

  useClickOutSide(loginRef, () => handleLoginModal(false))
  useClickOutSide(singUpRef, () => handleSingUpModal(false))

  return (
    <Container>
      {currentUser ? (
        <Button onClick={() => logout()}>logout</Button>
      ) : (
        <Fragment>
          <Button onClick={() => handleLoginModal(true)}>Login</Button>
          <Button onClick={() => handleSingUpModal(true)}>Registr</Button>

          <AuthModal title={'Login'} isOpen={isOpenLogin} ref={loginRef}>
            <Button onClick={() => handleLoginModal(false)}>Close</Button>
            <AuthLogin
              showRegister={() => {
                handleSingUpModal(true)
                handleLoginModal(false)
              }}
            />
          </AuthModal>

          <AuthModal title={'Register'} isOpen={isOpenSingUp} ref={singUpRef}>
            <Button onClick={() => handleSingUpModal(false)}>Close</Button>
            <AuthSingup />
          </AuthModal>
        </Fragment>
      )}
    </Container>
  )
}
