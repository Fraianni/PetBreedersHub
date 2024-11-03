import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia, CircularProgress, Button } from "@mui/material";
import axios from "axios";
import UpdateAnimalModal from "./UpdateAnimalModal"; // Import the UpdateAnimalModal component
import { axiosInstance } from "./axiosConfig";

const BreederDogsList = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDog, setSelectedDog] = useState(null); // For opening the update modal

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/breeder/dogs');
      setDogs(response.data);
    } catch (error) {
      console.error("Failed to fetch dogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`breeder/dogs/${id}/delete/`); // Use the correct DELETE URL
      setDogs(dogs.filter(dog => dog.id !== id)); // Remove the dog from the list
    } catch (error) {
      console.error("Failed to delete dog:", error);
    }
  };

  const openUpdateModal = (dog) => {
    setSelectedDog(dog); // Set the selected dog to open the modal
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (dogs.length === 0) {
    return <Typography>No dogs found for this breeder.</Typography>;
  }

  return (
    <Box>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {dogs.map((dog) => (
          <Card key={dog.id} sx={{ width: 300, margin: 1 }}>
            {dog.photo && (
              <CardMedia
                component="img"
                height="140"
                image={dog.photo}
                alt={`${dog.name}'s photo`}
              />
            )}
            <CardContent>
              <Typography variant="h6" style={{ textTransform: "uppercase" }}>
                {dog.name}
              </Typography>
              <Typography variant="body2">Breed: {dog.breed.name}</Typography>
              <Typography variant="body2">Loi: {dog.breed.loi}</Typography>
              <Typography variant="body2">Gender: {dog.gender}</Typography>
              <Typography variant="body2">Age: {dog.age} </Typography>
              <Typography variant="body2">Color: {dog.color}</Typography>
              <Typography variant="body2">Weight: {dog.weight} kg</Typography>
              <Typography variant="body2">Height: {dog.height} cm</Typography>
              
              {/* Delete Button */}
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => handleDelete(dog.id)}
                sx={{ mt: 1 }}
              >
                Delete
              </Button>
              
              {/* Update Button */}
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => openUpdateModal(dog)}
                sx={{ mt: 1, ml: 1 }}
              >
                Update
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Update Animal Modal */}
      {selectedDog && (
        <UpdateAnimalModal 
          dog={selectedDog} 
          onClose={() => setSelectedDog(null)} 
          onUpdate={fetchDogs} 
        />
      )}
    </Box>
  );
};

export default BreederDogsList;
