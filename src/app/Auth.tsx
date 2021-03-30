/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React, { useState } from 'react'
import Modal from './Modal'
import Form from './Form'

export default function Auth() {
  const [openModal, setOpenModal] = React.useState('none')

  return (
    <div>
      <button
        onClick={() => setOpenModal('login')}
        css={{
          backgroundColor: 'hotpink',
          width: '100px',
          marginRight: '10px',
        }}
      >
        Login in
      </button>
      <button
        onClick={() => setOpenModal('register')}
        css={{
          backgroundColor: 'hotpink',
          width: '100px',
          marginRight: '10px',
        }}
      >
        registr
      </button>
      <Modal title={'login'} isOpen={openModal === 'login'}>
        <button onClick={() => setOpenModal('nonde')}>Close</button>
        <Form buttenText='login' />
      </Modal>
      <Modal title={'register'} isOpen={openModal === 'register'}>
        <Form buttenText='register' />

        <button onClick={() => setOpenModal('nonde')}>Close</button>
      </Modal>
    </div>
  )
}
