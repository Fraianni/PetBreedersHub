import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Reindirizza l'utente in base al ruolo
        if (data.role === "allevatore") {
          navigate("/dashboard/allevatori");
        } else if (data.role === "utente") {
          navigate("/dashboard/utenti");
        } else {
          navigate("/dashboard/generale"); // Altra pagina per utenti generici o ospiti
        }
      } else {
        setError(data.message || "Login fallito. Riprova.");
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      setError("Errore di connessione. Riprova più tardi.");
    }
  };

  return (
    <div className="login-container">
      <h2>Accedi</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Nome utente</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
