/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'

type ModalProps = {
  isOpen: boolean
  title: string
  children?: React.ReactElement | React.ReactElement[]
}
export default function Modal({
  isOpen,
  title,
  children,
}: ModalProps): JSX.Element | null {
  if (!isOpen) return null
  return (
    <div>
      <h1 css={{ color: 'red' }}>{title}</h1>
      {children}
    </div>
  )
}
