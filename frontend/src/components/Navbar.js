import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the useAuth hook for authentication status
import { FaUserCircle } from 'react-icons/fa'; // Import user icon from react-icons
import './Navbar.css';

const CustomNavbar = () => {
    const { user, isAuthenticated, logout } = useAuth(); // Access auth status and logout function

    return (
        <Navbar className="custom-navbar d-flex justify-content-between" expand="lg">
            <Navbar.Brand href="/home">
                <img
                    src="/static/navbar-logo.png" // Use the correct path for the image
                    alt="Company Logo"
                    height="80" // Adjust the image height
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link as={Link} to="/profumi">Allevatori</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                    <Nav.Link href="#contact">Contatti</Nav.Link>
                </Nav>
                <Dropdown align="end">
                    <Dropdown.Toggle as="div" id="user-dropdown" style={{ cursor: 'pointer' }}>
                        <FaUserCircle size={30} className="text-light" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {user ? (
                            <>
                                <Dropdown.Item as={Link} to="/dashboard/allevatori">
                                    Profilo
                                </Dropdown.Item>
                                <Dropdown.Item as="button" onClick={logout}>
                                    Logout
                                </Dropdown.Item>
                            </>
                        ) : (
                            <>
                            <Dropdown.Item as={Link} to="/login">
                                Login
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/register">Register</Dropdown.Item>
                            </>

                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
