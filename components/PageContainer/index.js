import React from 'react'
import { Container } from 'react-bootstrap'
import MainMenu from '../MainMenu'

/**
 * PageContainer component
 *
 * Implements general layout for page and renders MainMenu
 */
const PageContainer = ({ children }) => (
  <>
    <MainMenu />
    <Container>
      {children}
    </Container>
  </>
)

export default PageContainer