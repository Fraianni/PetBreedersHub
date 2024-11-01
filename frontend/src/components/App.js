import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import BreedersDashboard from "./BreedersDashboard";
import UsersDashboard from "./UsersDashboard";
import GeneralDashboard from "./GeneralDashboard";
import Home from "./Home";
import '../../static/css/App.css';
import CustomNavbar from "./Navbar";
import Footer from "./Footer";
import { AuthProvider } from './AuthContext'; // Assicurati di importare AuthProvider
import ProtectedRoute from "./ProtectedRoute";
import Register from './Register';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Pagine protette */}
          <Route path="/dashboard/allevatori" element={
            <ProtectedRoute>
              <BreedersDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/utenti" element={
            <ProtectedRoute>
              <UsersDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/generale" element={
            <ProtectedRoute>
              <GeneralDashboard />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
