import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Container, Nav, Navbar } from 'react-bootstrap'

/**
 * MainMenu component
 *
 * Renders main top menu
 */
const MainMenu = () => {
  const { asPath } = useRouter()

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <span className="d-inline-block align-top" style={{ height: 30 }}>
            <Image
              src="/tc-logo.svg"
              width="30"
              height="30"
              alt="Topcoder Logo"
            />
          </span>{' '}
          Topcoder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={asPath}>
            <Link href="/" passHref><Nav.Link>Home</Nav.Link></Link>
            <Link href="/challenges" passHref><Nav.Link>Challenges</Nav.Link></Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MainMenu