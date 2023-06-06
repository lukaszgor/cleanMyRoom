import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import supabase from '../../supabaseClient';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"

function WorkerRoomsView() {

    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
      fetchData();
    }, []);


          // Pobranie danych z Supabase
          const fetchData = async () => {
            const { data, error } = await supabase.from('rooms').select('*').in('status', ['oczekuje', 'realizacja']); ;
            if (error) {
              console.error(error);
            } else {
              setRooms(data);
            }
          };
//redirection to googlemaps
          const handleButtonClickLocation = (room) => {
            const locationString = room.geoLocation; 
            const [latitude, longitude] = locationString.split(',').map((coordinate) => coordinate.trim());
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            window.open(googleMapsUrl);
            console.log('Pole location:', room.geoLocation);
          };
        
          //redirection to details room
          const handleButtonClickRoomDetails=(room)=>{
            
            navigate('/roomWorker/'+room.id)
        }
          
    return (
      <div>
          <Grid container spacing={3}>
      {rooms.map((room) => (
        <Grid key={room.id} item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Numer: {room.number}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Nazwa: {room.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Status: {room.status}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Opis: {room.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Lokalizacja: 
                <Button variant="contained" color="secondary" style={{ marginLeft: '10px' }} onClick={() => handleButtonClickLocation(room)}> Mapa</Button>
              </Typography>
              <p></p>
              <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} onClick={() => handleButtonClickRoomDetails(room)} > Realizacja</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

      </div>
     
      
    );
  }
  
  export default WorkerRoomsView;
  