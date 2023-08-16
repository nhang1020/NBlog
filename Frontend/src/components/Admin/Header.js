import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
const Header = () => {

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary mb-5">
                <Container>
                    <NavLink data-tooltip-content="Home"
                        className='nav-link'
                        to="/"><h1>Home</h1>
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <NavLink
                                data-tooltip-content="User"
                                className='nav-link'
                                to="/admin/users-manage">
                                Users Manage
                            </NavLink>
                            <NavLink className='nav-link'
                                data-tooltip-content="Admin"
                                to="/admin/posts-manage">
                                Posts Manage
                            </NavLink>

                        </Nav>

                        <NavDropdown className='right' title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2"> Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Log out
                            </NavDropdown.Item>
                        </NavDropdown>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Tooltip
                anchorSelect=".nav-link"
                effect="solid"
                border={true}
                className='bg-danger'
            />
        </>
    )
}

export default Header