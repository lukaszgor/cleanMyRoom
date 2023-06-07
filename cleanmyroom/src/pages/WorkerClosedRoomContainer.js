import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import supabase from '../supabaseClient';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import WorkerAppTopBar from '../components/workerComponents/WorkerAppTopBar';


function WorkerClosedRoomContainer() {

    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [sortStatus, setSortStatus] = useState('');
  

    const navigate = useNavigate()

    useEffect(() => {
      fetchData();
    }, []);

     // Filtruj dane na podstawie nazwy i statusu
  useEffect(() => {
    let filteredData = rooms;

    if (searchName !== '') {
      filteredData = filteredData.filter((room) => room.name.toLowerCase().includes(searchName.toLowerCase()));
    }

    if (sortStatus !== '') {
      filteredData = filteredData.filter((room) => room.status === sortStatus);
    }

    setFilteredRooms(filteredData);
  }, [rooms, searchName, sortStatus]);


          // Pobranie danych z Supabase
          const fetchData = async () => {
            const { data, error } = await supabase.from('rooms').select('*').in('status', ['zakonczone']); ;
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
          <WorkerAppTopBar></WorkerAppTopBar>
          <p></p>
        <div style={{ marginLeft: '20px',marginBottom: '20px' }}>
          <TextField
            label="Wyszukaj po nazwie"
            variant="outlined"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />

        </div>
  
        <Grid container spacing={3}>
          {filteredRooms.map((room) => (
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
                    <p></p>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleButtonClickLocation(room)}
                    >
                      Mapa
                    </Button>
                  </Typography>
                  <p></p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClickRoomDetails(room)}
                  >
                    Realizacja
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>      
    );
  }
  
  export default WorkerClosedRoomContainer;
  