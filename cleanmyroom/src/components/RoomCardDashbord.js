import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import supabase from '../supabaseClient';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import ResponsiveAppBar from '../components/ResponsiveAppBar'

function RoomCardDashbord() {

    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [sortStatus, setSortStatus] = useState('');
    const [searchNumber, setsearchNumber] = useState('');
  

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
    if (searchNumber !== '') {
        filteredData = filteredData.filter((room) => room.number.toString().includes(searchNumber));
      }

    setFilteredRooms(filteredData);
  }, [rooms, searchName, sortStatus,searchNumber]);


          // Pobranie danych z Supabase
          const fetchData = async () => {
            const { data, error } = await supabase.from('rooms').select('*').is('isActive', null); 
            if (error) {
              console.error(error);
            } else {
              setRooms(data);
            }
          };

          //redirection to details room
          const handleButtonClickRoomDetails=(room)=>{
            
            navigate('/settings/'+room.id)
        }
        const addNewRoom=()=>{
            navigate('/Add')
        }
          
    return (

        <div>
             <ResponsiveAppBar></ResponsiveAppBar>
             <p></p>
             <Button color="primary" onClick={addNewRoom}>Nowy</Button>
             <p></p>
        <div style={{ marginBottom: '20px' }}>
          <TextField
          style={{ marginLeft: '20px',marginBottom: '20px' }}
            label="Wyszukaj po numerze "
            variant="outlined"
            value={searchNumber}
            onChange={(e) => setsearchNumber(e.target.value)}
          />
           <TextField
          style={{ marginLeft: '20px',marginBottom: '20px' }}
            label="Wyszukaj po nazwie "
            variant="outlined"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <FormControl variant="outlined" style={{ marginLeft: '20px',  width: sortStatus ? '300px' : '200px' }}>
            <InputLabel id="status-select-label">Sortuj po statusie</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={sortStatus}
              onChange={(e) => setSortStatus(e.target.value)}
              label="Sortuj po statusie"
            >
              <MenuItem value="">Wszystkie</MenuItem>
              <MenuItem value="oczekuje">Oczekuje</MenuItem>
              <MenuItem value="realizacja">Realizacja</MenuItem>
              <MenuItem value="zakonczone">Zakończone</MenuItem>
            </Select>
          </FormControl>
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
                    Data modyfikacji: {room.actionDate}
                  </Typography>
                  <p></p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClickRoomDetails(room)}
                  >
                    Szczegóły
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>      
    );
  }
  
  export default RoomCardDashbord;
  