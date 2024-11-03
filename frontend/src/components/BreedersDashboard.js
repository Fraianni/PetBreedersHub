// BreedersDashboard.js
import React, { useState } from "react";
import { Box, Button, Tabs, Tab } from "@mui/material";
import BreederDogsList from "./BreederDogsList";
import AddAnimalModal from "./AddAnimalModal";
import DogsForSale from "./DogsForSale";
const BreedersDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleDogAdded = () => {
    // Logica per aggiornare la lista dei cani dopo l'aggiunta
    console.log("Cane aggiunto con successo.");
  };

  return (
    <div>
      <h2>Breeders Dashboard</h2>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Your Dogs" />
        <Tab label="Dogs for Sale" /> {/* New tab for Dogs for Sale */}

      </Tabs>
      {tabIndex === 0 && (
        <Box sx={{ mt: 2 }}>
          <BreederDogsList />
          <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
            Aggiungi Esemplare
          </Button>
          <AddAnimalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDogAdded={handleDogAdded} />
        </Box>
      )}
            {tabIndex === 1 && ( // Render the DogsForSale component in the new tab
        <Box sx={{ mt: 2 }}>
          <DogsForSale onDogAdded={handleDogAdded} /> {/* Pass the onDogAdded function */}
        </Box>
      )}
    </div>
  );
};

export default BreedersDashboard;
