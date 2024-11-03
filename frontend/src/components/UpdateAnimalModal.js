import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { axiosInstance } from "./axiosConfig";

const UpdateAnimalModal = ({ dog, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: dog.name,
    breed: dog.breed.name,
    gender: dog.gender,
    age: dog.age,
    color: dog.color,
    weight: dog.weight,
    height: dog.height,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const updatedFormData = {
      ...formData,
      breed: { id: dog.breed.id, name: dog.breed.name }, // Send an object for breed
    };
  
    try {
      console.log("Submitting data:", updatedFormData); // Log the updated form data
      await axiosInstance.put(`breeder/dogs/${dog.id}/update/`, updatedFormData);
      onUpdate(); // Refresh the dog list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to update dog:", error);
    }
  };

  return (
    <Modal open={Boolean(dog)} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        maxHeight: '90vh',
        overflowY: 'auto',
        width: '80%',
      }}>        <Typography variant="h6" gutterBottom>Update {dog.name}</Typography>
        
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        
        <TextField
          label="Breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Color"
          name="color"
          value={formData.color}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Weight"
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Height"
          name="height"
          type="number"
          value={formData.height}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateAnimalModal;
