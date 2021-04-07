import styled from 'styled-components'

const Input = styled.input({
  border: '1px solid #f1f1f4',
  background: '#f1f2f7',
  padding: '8px 12px',
})

const Button = styled.button`
  padding: 7px 15px;
  height: 38px;
  border: none;
  outline: none;
  lineheight: 1;
  border-radius: 5px;
  margin: 0 auto;
`

const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  fontSize: '18px',
  '> div': {
    margin: '10px auto',
    width: '100%',
    maxWidth: '300px',
  },
})

interface TitleProps {
  size?: string
}

const Title = styled.h2<TitleProps>`
  font-size: ${(props) => props.size || '18px'};
  color: #fff;
`

interface TextProps {
  size?: string
}

const Text = styled.p<TextProps>`
  font-size: ${(props) => props.size || '18px'};
  color: #dcdcdc;
  font-weight: 400;
`
interface ThumbProps {
  size?: string
}
const Thumb = styled.img<ThumbProps>`
  width: ${(props) => props.width || '10px'};
  margin-left: 5px;
`

const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

const device = {
  mobileL: `(max-width: 520px)`,
  mobileM: `(max-width: 400px)`,
  laptopL: `(max-width: 1380px)`,
  laptopM: `(max-width: 1000px)`,
  laptopS: `(max-width: 768px)`,
}

const Spinner = styled.div`
  text-align: center;
`
const Dots = styled.div`
  padding: 5px;
`

type DotProps = {
  bgColor: string | undefined
}
const Dot = styled.div<DotProps>`
  width: 15px;
  height: 15px;
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
    width: 15px;
    height: 15px;
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

export {
  Input,
  FormGroup,
  Form,
  Button,
  Title,
  Text,
  device,
  Thumb,
  Spinner,
  Dots,
  Dot,
}
