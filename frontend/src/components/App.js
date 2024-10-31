import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import BreedersDashboard from "./BreedersDashboard";
import UsersDashboard from "./UsersDashboard";
import GeneralDashboard from "./GeneralDashboard";
import Home from "./Home";

const App = () => {
  // Simuliamo un controllo di autenticazione
  const isAuthenticated = () => {
    // Qui puoi verificare il token dell'utente (es. token JWT o sessione)
    return Boolean(localStorage.getItem("authToken"));
  };

  // Componente di protezione delle route
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Pagine protette */}
        <Route
          path="/dashboard/allevatori"
          element={
            <ProtectedRoute>
              <BreedersDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/utenti"
          element={
            <ProtectedRoute>
              <UsersDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/generale"
          element={
            <ProtectedRoute>
              <GeneralDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
