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
  color?: string
}

const Title = styled.h2<TitleProps>`
  font-size: ${(props) => props.size || '18px'};
  color: ${(props) => props.color || '#fff'};
  margin-bottom: 15px;
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
  mobileM: `(max-width: 400px)`,
  mobileL: `(max-width: 520px)`,
  laptopS: `(max-width: 768px)`,
  laptopM: `(max-width: 1000px)`,
  laptopL: `(max-width: 1380px)`,
}

export { Input, FormGroup, Form, Button, Title, Text, device, Thumb }
