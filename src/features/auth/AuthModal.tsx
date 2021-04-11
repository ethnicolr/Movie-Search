/* eslint react/prop-types: 0 */
import React from 'react'
import styled from 'styled-components'
import { device } from '../../app/lib'

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
  zIndex: 100,
})

const InnerModal = styled.div`
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  width: 350px;
  height: fit-content;
  margin: auto;
  background: white;
  border-radius: 2%;
  padding: 20px 10px;

  @media ${device.laptopM} {
    left: 10%;
    right: 10%;
    width: 78vw;
  }
`

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
