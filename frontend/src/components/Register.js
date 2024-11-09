// src/components/Register.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import { TextField, Button, Container, Typography, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { axiosInstance } from './axiosConfig';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        affisso: '',  // Add affisso to formData
        breeds: []
    });
    const [breeds, setBreeds] = useState([]);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const dogResponse = await axiosInstance.get('breeds/?type=dog');
                const catResponse = await axiosInstance.get('breeds/?type=cat');

                // Structure breeds data for select
                const breedOptions = [
                    {
                        label: 'Dogs',
                        options: dogResponse.data.map(breed => ({
                            value: breed.id,
                            label: breed.name
                        }))
                    },
                    {
                        label: 'Cats',
                        options: catResponse.data.map(breed => ({
                            value: breed.id,
                            label: breed.name
                        }))
                    }
                ];

                setBreeds(breedOptions);
            } catch (err) {
                setError('Failed to fetch breeds');
            }
        };
        fetchBreeds();
    }, []);

    const handleChange = (selectedOptions) => {
        setFormData({
            ...formData,
            breeds: selectedOptions
        });
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        const dataToSubmit = {
            ...formData,
            breeds: formData.breeds.map(breed => breed.value)
        };
        
        try {
            const response = await axiosInstance.post('breeder/register/', dataToSubmit); // Assicurati di includere l'URL completo
            console.log("Registration successful", response.data);
            navigate('/login');
        } catch (err) {
            console.log(err);
            setError(err.response?.data || "Registration failed");
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" gutterBottom>Register</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Affisso"  // New input field for affisso
                    name="affisso"
                    value={formData.affisso}
                    onChange={e => setFormData({ ...formData, affisso: e.target.value })}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                    fullWidth
                    margin="normal"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(prev => !prev)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    fullWidth
                    margin="normal"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowConfirmPassword(prev => !prev)}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Select
                    isMulti
                    name="breeds"
                    options={breeds}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleChange}
                    placeholder="Select Breeds"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                </Button>
            </form>
        </Container>
    );
};

export default Register;
