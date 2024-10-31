import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'; // Import TextField
import './Login.css';
import { Container } from "react-bootstrap";
import axiosInstance from './axiosConfig'; // Ensure you import axiosInstance correctly

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
  
    try {
      const response = await axiosInstance.post("/login/", {
        username,
        password,
      });
  
      const data = response.data;
  
      if (data.role === "allevatore") {
        navigate("/dashboard/allevatori");
      } else if (data.role === "utente") {
        navigate("/dashboard/utenti");
      } else {
        navigate("/dashboard/generale");
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      const message = error.response?.data?.message || "Login fallito. Riprova.";
      setError(message);
    }
  };

  return (
    <Container className="mt-2">
      <div className="login-container">
        <h2>Accedi</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <TextField
              label="Nome utente"
              variant="outlined"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
            />
          </div>
          <div className="form-group">
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <Button variant="contained" type="submit">Login</Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
