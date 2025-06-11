import type { CSSProperties } from 'react'
import { Button as MuiButton } from "@mui/material"

interface Props {
  buttonText: string,
  buttonType?: 'button' | 'submit' | 'reset',
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
  style?: CSSProperties
}


const styles: { [key: string]: CSSProperties } = {
  button: {
    backgroundColor: '#7700e9',
    color: 'black'
  }
}


const Button = ({ buttonText, buttonType = 'button', onClick = () => { }, style }: Props) => {
  return <MuiButton sx={{ ...styles.button, ...style }} type={buttonType} variant='contained' onClick={onClick}>{buttonText}</MuiButton>
}

export default Button
