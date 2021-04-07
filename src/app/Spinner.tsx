import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
`
const Dots = styled.div`
  padding: 5px;
`

type DotProps = {
  bgColor?: string
}
const Dot = styled.div<DotProps>`
  width: 20px;
  height: 20px;
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
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.bgColor || '#000000'};
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

export const Spinner = () => {
  return (
    <Container>
      <Dots>
        <Dot />
        <Dot />
        <Dot />
      </Dots>
    </Container>
  )
}

export default Spinner
