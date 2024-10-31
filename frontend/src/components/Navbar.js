import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assicurati di importare il file CSS

const CustomNavbar = () => {
    return (
        <Navbar className="custom-navbar d-flex justify-content-between " expand="lg">
            <Navbar.Brand href="/home">
                <img
                    src="/static/navbar-logo.png" // Usa il percorso corretto per l'immagine
                    alt="Company Logo"
                    height="80" // Regola l'altezza dell'immagine
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>    
                    <Nav.Link href="#about">About</Nav.Link>
                    <Nav.Link as={Link} to="/profumi">Allevatori</Nav.Link>
                    <Nav.Link href="#contact">Contatti</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
