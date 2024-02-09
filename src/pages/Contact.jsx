import React from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
function Contact() {
  const student = [{'id':1, 'name': 'chandresh', 'sch': 'axay', 'age': 25 },
                { 'id':2,'name': 'falguni', 'sch': 'shrjee', 'age': 22 },
                { 'id':3,'name': 'sahil', 'sch': 'lpsavani', 'age': 15 },
            ]
  return (
    <div>
      <div className='header'>
 <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </div>
      <Table striped bordered hover>
        <tbody>
        {student.map((item) =>(
          <tr  key={item.id}>
           
            <td>{item.id}</td>
          <td > {item.name}</td>
          <td> {item.sch}</td>
          <td> {item.age}</td>
        </tr>
        )

        )}
        </tbody>
      </Table>
    </div>
  )
}

export default Contact 
