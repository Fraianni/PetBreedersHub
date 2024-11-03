// DogsForSale.js
import React, { useState } from "react";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import AddAnimalModal from "./AddAnimalModal"; // Reuse the modal component
import AddLitterModal from "./AddLitterModal"; // Reuse the modal component

const DogsForSale = ({ onDogAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dogsForSale, setDogsForSale] = useState([]); // State to hold the dogs for sale
  const [isLitterModalOpen, setIsLitterModalOpen] = useState(false);

  const handleDogAdded = (newDog) => {
    // Logic to update the dogs for sale list
    setDogsForSale([...dogsForSale, newDog]);
    onDogAdded(); // Call the parent function to indicate a dog was added
  };

  const handleLitterAdded = async (newLitter) => {
    try {
      const response = await axiosInstance.post('/api/litter/', newLitter);
      const createdLitter = response.data;

      console.log("New Litter Added:", createdLitter);

      // Here, add logic to create dogs based on the litter information
      const dogPromises = newLitter.dogs.map(async (dog) => {
        const dogData = { ...dog, litter: createdLitter.id }; // Associate the dog with the litter
        const dogResponse = await axiosInstance.post('/api/dog/', dogData);
        return dogResponse.data;
      });

      const newDogs = await Promise.all(dogPromises);
      setDogsForSale([...dogsForSale, ...newDogs]);
    } catch (error) {
      console.error("Error adding litter:", error);
    }
  };
  return (
    <div>
      <h3>Dogs for Sale</h3>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Add Dog for Sale
      </Button>
      <Button variant="contained" color="secondary" onClick={() => setIsLitterModalOpen(true)}>
        Add New Litter
      </Button>
      <AddAnimalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDogAdded={handleDogAdded} isForSale={true} />
      <AddLitterModal isOpen={isLitterModalOpen} onClose={() => setIsLitterModalOpen(false)} onLitterAdded={handleLitterAdded} />

      <Box sx={{ mt: 2 }}>
        <List>
          {dogsForSale.map((dog, index) => (
            <ListItem key={index}>
              <ListItemText primary={dog.name} secondary={`Price: $${dog.sale_price}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default DogsForSale;
