import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia, CircularProgress } from "@mui/material";
import axios from "axios";

const BreederDogsList = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get('/api/breeder/dogs'); // Endpoint per ottenere i cani del breeder
        setDogs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch dogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (dogs.length === 0) {
    return <Typography>No dogs found for this breeder.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Your Dogs</Typography>
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
              <Typography variant="h6">{dog.name}</Typography>
              <Typography variant="body2">Breed: {dog.breed.name}</Typography>
              <Typography variant="body2">Gender: {dog.gender}</Typography>
              <Typography variant="body2">Age: {dog.age} years</Typography>
              <Typography variant="body2">Color: {dog.color}</Typography>
              <Typography variant="body2">Weight: {dog.weight} kg</Typography>
              <Typography variant="body2">Height: {dog.height} cm</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default BreederDogsList;
