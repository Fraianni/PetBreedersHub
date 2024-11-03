import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, IconButton, List, ListItem, ListItemText, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { axiosInstance } from './axiosConfig';

const style = {
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
};

const AddLitterModal = ({ isOpen, onClose, onLitterAdded }) => {
  const [selectedBreed, setSelectedBreed] = useState('');
  const [breeds, setBreeds] = useState([]); // Per le razze
  const [males, setMales] = useState([]); // Cani maschi
  const [females, setFemales] = useState([]); // Cani femmine
  const [litter, setLitter] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dogs, setDogs] = useState([{ name: '', sale_price: '' }]);

  // Carica le razze all'apertura del modal
  useEffect(() => {
    const fetchBreeds = async () => {
      const response = await axiosInstance.get('breeder/breeds/');
      setBreeds(response.data);
    };
    fetchBreeds();
  }, []);

  // Fetch maschi e femmine quando viene selezionata una razza
  useEffect(() => {
    const fetchDogsByBreed = async () => {
      if (selectedBreed) {
        const responseMales = await axiosInstance.get(`dogs/by-breed-and-gender/?breed=${selectedBreed}&gender=male`);
        setMales(responseMales.data);
        const responseFemales = await axiosInstance.get(`dogs/by-breed-and-gender/?breed=${selectedBreed}&gender=female`);
        setFemales(responseFemales.data);
      }
    };
    fetchDogsByBreed();
  }, [selectedBreed]);

  const handleDogChange = (index, event) => {
    const newDogs = [...dogs];
    newDogs[index][event.target.name] = event.target.value;
    setDogs(newDogs);
  };

  const addDog = () => {
    setDogs([...dogs, { name: '', sale_price: '' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newLitter = {
      mother: dogs.find(dog => dog.role === 'mother'),
      father: dogs.find(dog => dog.role === 'father'),
      litter: litter,
      date_of_birth: dateOfBirth,
      dogs: dogs,
    };

    try {
      const response = await axiosInstance.post('add-new-litter/', newLitter);
      onLitterAdded(response.data);
      onClose();
    } catch (error) {
      console.error("Error adding litter:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <h2>Add New Litter</h2>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel>Breed</InputLabel>
            <Select value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}>
              {breeds.map(breed => (
                <MenuItem key={breed.id} value={breed.id}>{breed.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel>Mother</InputLabel>
            <Select name="mother" onChange={(e) => handleDogChange(0, e)}>
              {females.map(female => (
                <MenuItem key={female.id} value={female.id}>{female.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel>Father</InputLabel>
            <Select name="father" onChange={(e) => handleDogChange(0, e)}>
              {males.map(male => (
                <MenuItem key={male.id} value={male.id}>{male.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Litter"
            value={litter}
            onChange={(e) => setLitter(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <h3>Dogs in Litter</h3>
          <List>
            {dogs.map((dog, index) => (
              <ListItem key={index}>
                <TextField
                  name="name"
                  label="Dog Name"
                  value={dog.name}
                  onChange={(e) => handleDogChange(index, e)}
                  required
                  sx={{ mb: 1 }}
                />
                <TextField
                  name="loi"
                  label="Loi"
                  type="number"
                  value={dog.loi}
                  onChange={(e) => handleDogChange(index, e)}
                  required
                  sx={{ mb: 1, ml: 2 }}
                />
              </ListItem>
            ))}
          </List>
          <Button variant="outlined" onClick={addDog} sx={{ mb: 2 }}>
            Add Another Dog
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Add Litter
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddLitterModal;
