import React from 'react'
import { StringDecoder } from 'string_decoder'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
`
const Dots = styled.div`
  padding: 5px;
`

type DotProps = {
  bgColor?: string
  width?: string
  height?: string
}
const Dot = styled.div<DotProps>`
  width: ${(props) => props.width || '20px'};
  height: ${(props) => props.height || '20px'};
  background-color: transparent;
  position: relative;
  display: inline-block;

  &::after {
    transform: scale(0.2);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    content: '';
    border-radius: 50%;
    background-color: ${(props) => props.bgColor || '#000000'};
    width: ${(props) => props.width || '20px'};
    height: ${(props) => props.height || '20px'};
    display: inline-block;
    animation-name: scale;
    animation-duration: 900ms;
    animation-iteration-count: infinite;
  }

  &:nth-child(2)::after {
    animation-delay: 150ms;
  }

  &:nth-child(3)::after {
    animation-delay: 300ms;
  }

  @keyframes scale {
    0% {
      transform: scale(0.2);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.2);
    }
  }
`

type SpinnerProps = {
  color?: string
  width?: string
  height?: string
}

export const Spinner = ({ color, width, height }: SpinnerProps) => {
  return (
    <Container>
      <Dots>
        <Dot width={width} height={height} bgColor={color} />
        <Dot width={width} height={height} bgColor={color} />
        <Dot width={width} height={height} bgColor={color} />
      </Dots>
    </Container>
  )
}
