/* eslint react/prop-types: 0 */
import React from 'react'
import styled from 'styled-components'

const Modal = styled.div({
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  margin: 'auto',
  backgroundColor: 'rgba(0,0,0, 0.5)',
})

const InnerModal = styled.div({
  position: 'absolute',
  left: '25%',
  right: '25%',
  top: '25%',
  bottom: '25%',
  width: '350px',
  height: 'fit-content',
  margin: 'auto',
  background: 'white',
  borderRadius: '2%',
  border: '1px solid black',
  padding: '20px 10px',
})

const Title = styled.h1({
  textAlign: 'center',
})

type Props = {
  isOpen: boolean
  title: string
  children?: React.ReactNode
}
type Ref = HTMLDivElement

export const AuthModal = React.forwardRef<Ref, Props>((props, ref) => {
  if (!props.isOpen) return null
  return (
    <Modal>
      <InnerModal ref={ref}>
        <Title>{props.title}</Title>
        {props.children}
      </InnerModal>
    </Modal>
  )
})

AuthModal.displayName = 'AuthModal'
