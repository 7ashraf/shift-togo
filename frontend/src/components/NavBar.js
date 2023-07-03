import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'


export default function NavBar() {
    const { user } = useAuthContext()

  return (
    <div>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Shift To-Go</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            
            {!user && (
            <div>
            <Navbar.Collapse className="justify-content-end">
                <Nav.Link href="/login">login</Nav.Link>
                <Nav.Link href="/signup">signup</Nav.Link>

            </Navbar.Collapse>
            </div>
          )}
          
          </Nav>
        </Container>
      </Navbar>
      
    </div>
    
  )
}
