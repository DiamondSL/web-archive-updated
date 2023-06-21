import React from 'react'
import { Container } from '@mui/material'

const ContainerDiv = ({ type, outlined = false, styles = { display: 'block' }, children }:{type?: 'primary' | 'accent' | 'transparent', outlined?: boolean, styles?: React.CSSProperties | undefined, children?: React.ReactNode}) => {
  return (
    <Container sx={{ ...styles, outline: outlined ? (type === 'accent' ? '1px solid black' : type === 'primary' ? '1px solid #FFFFF' : 'none') : 'none', backgroundColor: type === 'accent' ? 'var(--accentColor)' : type === 'primary' ? 'var(--containersColor)' : type === ('transparent') ? 'transparent' : styles.backgroundColor ? styles.backgroundColor : 'initial' }}>
    {children}
  </Container>)
}

export default ContainerDiv
