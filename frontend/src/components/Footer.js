import React from 'react';
import './Footer.css'; // Assicurati di importare il file CSS

const Footer = () => {
    return (
        <footer className="custom-footer mt-2">
            <div className="footer-content">
                <h2>Nome Azienda</h2>
                <p>Indirizzo: Via Esempio 123, Città, Stato</p>
                <p>Email: info@esempio.com</p>
                <p>Telefono: +39 012 345 6789</p>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Nome Azienda. Tutti i diritti riservati.</p>
            </div>
        </footer>
    );
};

export default Footer;
