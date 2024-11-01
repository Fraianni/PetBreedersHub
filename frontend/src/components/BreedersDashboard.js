import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
import Select from 'react-select'; // Import react-select
import axios from 'axios'; 

const DogForm = ({ onClose, onSubmit }) => {
  const [dogData, setDogData] = useState({
    name: "",
    gender: null, // Updated to null to match react-select
    breed: null, // Updated to null to match react-select
    age: "",
    color: "",
    weight: "",
    height: "",
    photo: null
  });

  const [breeds, setBreeds] = useState([]); // State to hold breeds
  const [photoPreview, setPhotoPreview] = useState(null);

  // Fetch breeds associated with the user (breeder)
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('/api/breeder/breeds'); // Update to your API endpoint
        const breedOptions = response.data.map(breed => ({
          value: breed.id,
          label: breed.name
        }));
        setBreeds(breedOptions);
      } catch (error) {
        console.error("Failed to fetch breeds:", error);
      }
    };

    fetchBreeds();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setDogData({
        ...dogData,
        photo: file
      });
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setDogData({
        ...dogData,
        [name]: value
      });
    }
  };

  const handleSelectChange = (selectedOption, field) => {
    setDogData({
      ...dogData,
      [field]: selectedOption // Update the selected field
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(dogData);
    onClose();
    setDogData({
      name: "",
      gender: null, // Reset gender
      breed: null, // Reset breed
      age: "",
      color: "",
      weight: "",
      height: "",
      photo: null
    });
    setPhotoPreview(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Inserisci i dettagli del cane</h3>
      <TextField label="Nome" name="name" value={dogData.name} onChange={handleChange} required fullWidth margin="normal" />
      
      {/* Select for Gender */}
      <div style={{ margin: '16px 0' }}>
        <label>Sesso</label>
        <Select
          name="gender"
          value={dogData.gender}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'gender')}
          options={[
            { value: "maschio", label: "Maschio" },
            { value: "femmina", label: "Femmina" }
          ]}
          required
          placeholder="Seleziona..."
        />
      </div>

      {/* Select for Breed */}
      <div style={{ margin: '16px 0' }}>
        <label>Razza</label>
        <Select
          options={breeds}
          value={dogData.breed}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'breed')}
          required
          placeholder="Seleziona la razza"
        />
      </div>

      <TextField label="Età (anni)" type="number" name="age" value={dogData.age} onChange={handleChange} required fullWidth margin="normal" />
      <TextField label="Colore" name="color" value={dogData.color} onChange={handleChange} required fullWidth margin="normal" />
      <TextField label="Peso (kg)" type="number" name="weight" value={dogData.weight} onChange={handleChange} required fullWidth margin="normal" />
      <TextField label="Altezza (cm)" type="number" name="height" value={dogData.height} onChange={handleChange} required fullWidth margin="normal" />

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        required
        style={{ margin: '16px 0', display: 'block' }}
      />

      {photoPreview && (
        <div style={{ margin: '16px 0' }}>
          <img src={photoPreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </div>
      )}

      <Button type="submit" variant="contained" color="primary">Aggiungi Cane</Button>
      <Button type="button" onClick={onClose} color="secondary">Chiudi</Button>
    </form>
  );
};

const BreedersDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDogSubmit = (dogData) => {
    console.log("Dati del cane:", dogData);
    // Handle the submission of data to the server
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Breeders Dashboard</h2>
      <p>Section dedicated to breeders.</p>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>Aggiungi Esemplare</Button>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
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
        }}>
          <DogForm onClose={() => setIsModalOpen(false)} onSubmit={handleDogSubmit} />
        </Box>
      </Modal>
    </div>
  );
};

export default BreedersDashboard;
