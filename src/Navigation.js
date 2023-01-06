import React from 'react'
import { Navbar,Nav,Container } from 'react-bootstrap'
import Timer from './Timer'
//import ShowEmployeesByDesignation from './ShowEmployeesByDesignation'
function Navigation() {
  return (
    <div>
         <Navbar bg="primary" variant="dark">
        <Container>
         
          <Nav className="me-auto">
            <Nav.Link href="/">ShowEmployee</Nav.Link>
            <Nav.Link href="/CreateUser">CreateEmployee</Nav.Link>
            
          </Nav>
        
            <Timer></Timer>
            
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigation