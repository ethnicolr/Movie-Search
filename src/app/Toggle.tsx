import React from 'react'
import { device } from './lib'
import styled from 'styled-components'

const Container = styled.div`
  display: none;
  z-index: 1;
  position: relative;
  span {
    display: none;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    background: #ffffff;
    border-radius: 3px;
    z-index: 1;
    transform-origin: 4px 0px;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
  }

  @media ${device.laptopM} {
    display: block;
    span {
      display: block;
    }
  }

  span:first-child {
    transform-origin: 0% 0%;
  }

  span:nth-last-child(1) {
    transform-origin: 0% 100%;
  }
`
const ContainerHidden = styled(Container)`
  span {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
    background: #ffffff;
  }

  span:nth-last-child(2) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }

  span:nth-last-child(1) {
    transform: rotate(-45deg) translate(0, -1px);
  }
`
const Button = styled.button`
  width: 40px;
  height: 32px;
  position: absolute;
  top: -7px;
  left: -5px;
  z-index: 2;
  outline: none;
`

type PropsToggle = {
  isHidden: boolean
  onClick: () => void
}

export default function Toggle({ isHidden, onClick }: PropsToggle) {
  const СonditionContainer = isHidden ? Container : ContainerHidden
  return (
    <СonditionContainer>
      <Button onClick={onClick}></Button>
      <span></span>
      <span></span>
      <span></span>
    </СonditionContainer>
  )
}
