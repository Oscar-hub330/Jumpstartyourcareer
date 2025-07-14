import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography, Box, Divider } from "@mui/material";

// Random user generator function
const generateRandomUsers = (count = 6) => {
  const firstNames = ['Thabo', 'Nomsa', 'Sipho', 'Lerato', 'Mpho', 'Bongani', 'Zanele'];
  const lastNames = ['Mokoena', 'Ndlovu', 'Botha', 'Van der Merwe', 'Khumalo', 'Dlamini'];
  const locations = ['Limpopo', 'Eastern Cape', 'KwaZulu-Natal', 'Free State', 'Gauteng'];
  const programs = ['Coding Bootcamp', 'Business Training', 'Digital Marketing', 'Agriculture Tech'];
  const outcomes = [
    'started a successful tech business',
    'got hired as a junior developer',
    'launched an e-commerce store',
    'created jobs for 3 people',
    'won a youth innovation award'
  ];

  return Array.from({ length: count }, () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const program = programs[Math.floor(Math.random() * programs.length)];
    const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];

    return {
      id: Math.random().toString(36).substr(2, 9),
      name: `${firstName} ${lastName}`,
      location: location,
      story: `${firstName} completed our ${program} and ${outcome} in ${location}.`,
      program: program,
      outcome: outcome,
      avatar: `https://i.pravatar.cc/150?u=${firstName}${lastName}`
    };
  });
};

const SuccessStoriesSection = () => {
  const [stories, setStories] = useState([]);

  // Generate new stories when component mounts
  useEffect(() => {
    setStories(generateRandomUsers(6));
  }, []);

  const refreshStories = () => {
    setStories(generateRandomUsers(6));
  };

  return (
    <Box sx={{ my: 8 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#fea434', fontWeight: 'bold' }}>
        Success Stories
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
          variant="outlined"
          onClick={refreshStories}
          sx={{
            borderColor: '#fea434',
            color: '#fea434',
            '&:hover': {
              backgroundColor: 'rgba(254, 164, 52, 0.08)'
            }
          }}
        >
          Generate New Stories
        </Button>
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
        gap: 4,
        px: { xs: 2, sm: 4 }
      }}>
        {stories.map((user) => (
          <Card key={user.id} sx={{
            border: '1px solid rgba(254, 164, 52, 0.3)',
            borderRadius: 2,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    marginRight: 12,
                    objectFit: 'cover'
                  }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {user.location}
                  </Typography>
                </Box>
              </Box>
              
              <Typography paragraph sx={{ mb: 2 }}>
                {user.story}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ color: '#fea434', fontWeight: 'bold' }}>
                  {user.program}
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  {new Date().toLocaleDateString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default SuccessStoriesSection;