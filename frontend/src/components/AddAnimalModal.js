// AddAnimalModal.js
import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
import Select from 'react-select';
import { axiosMultipartInstance,axiosInstance } from "./axiosConfig";
const AddAnimalModal = ({ isOpen, onClose, onDogAdded, isForSale }) => {
  const [dogData, setDogData] = useState({
    name: "",
    gender: { value: "male", label: "Male" }, // Default value as an object for react-select
    breed: "",
    date_of_birth: "", // Changed from age to date_of_birth
    color: "",
    weight: "",
    height: "",
    photo: null,
    loi: "",
    sale_price: "",   // For DogForSale
    is_shippable: false, // For DogForSale
    contract_file: null // For DogForSale
  });
  const [breeds, setBreeds] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDogData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axiosMultipartInstance.get('breeder/breeds');
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



  const handleSelectChange = (selectedOption, field) => {
    setDogData({
      ...dogData,
      [field]: selectedOption
    });
  };

  const handleSubmit = async () => {
    try {
      const submittedData = {
        ...dogData,
        gender: dogData.gender.value, // Send only the value of gender
        breed: dogData.breed.value, // Invia il valore della razza

      };
      
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      for (const key in submittedData) {
        formData.append(key, submittedData[key]);
      }
  
      // Make the API call to add the animal
      await axiosMultipartInstance.post('animals/add-animal/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Ensure the content type is set correctly
        }
      });
  
      onDogAdded(submittedData); // Call the onDogAdded callback
      onClose(); // Close the modal
      setDogData({}); // Reset the form after submission
    } catch (error) {
      console.error("Failed to add dog:", error);
      // Optionally, handle error display to the user
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
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
      }}>        <h3>{isForSale ? "Add Dog for Sale" : "Add Dog"}</h3>
        <TextField
          label="Name"
          name="name"
          value={dogData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
     <Select
          name="gender"
          value={dogData.gender}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'gender')}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" }
          ]}
          placeholder="Select Gender"
          styles={{
            control: (base) => ({
              ...base,
              margin: 'normal',
              width: '100%',
            }),
          }}
        />



        <Select
            options={breeds}
            value={dogData.breed}
            onChange={(selectedOption) => handleSelectChange(selectedOption, 'breed')}
            placeholder="Seleziona la razza"
            required
          />
         <TextField
          label="Date of Birth"
          name="date_of_birth"
          type="date"
          value={dogData.date_of_birth}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true, // Ensure label stays above the input when date is selected
          }}
        />
        <TextField
          label="Color"
          name="color"
          value={dogData.color}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Weight"
          name="weight"
          type="number"
          value={dogData.weight}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Height"
          name="height"
          type="number"
          value={dogData.height}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <input
          type="file"
          name="photo"
          onChange={(e) => setDogData({ ...dogData, photo: e.target.files[0] })}
        />
        <TextField
          label="LOI"
          name="loi"
          value={dogData.loi}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Fields specific to DogForSale */}
        {isForSale && (
          <>
            <TextField
              label="Sale Price"
              name="sale_price"
              type="number"
              value={dogData.sale_price}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Is Shippable"
              name="is_shippable"
              type="checkbox"
              checked={dogData.is_shippable}
              onChange={handleChange}
            />
            <input
              type="file"
              name="contract_file"
              onChange={(e) => setDogData({ ...dogData, contract_file: e.target.files[0] })}
            />
          </>
        )}

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddAnimalModal;
