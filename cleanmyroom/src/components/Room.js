import { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import supabase from "../supabaseClient";
import { useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Room() {
    const {id} = useParams()
    const [idRoom, setIdRoom] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('brudne');
    const [description, setDescription] = useState('');
    const [actionDate, setActionDate] = useState('');
    const [geoLocation, setGeoLocation] = useState('');
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Możesz wykonać inne operacje, takie jak wysłanie danych do serwera itp
        updateRoom();
      };
      const handleStatusChange = (event) => {
        setStatus(event.target.value);
      };

// google maps redirection
const handleOpenGoogleMaps = () => {
    const locationString = geoLocation; // wartość z jednej zmiennej, np. "50.090478332256566, 19.99966697848003"
    const [latitude, longitude] = locationString.split(',').map((coordinate) => coordinate.trim());
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(googleMapsUrl);
  };

     //alert configuration
const [open,setOpen] =useState(null)

const handleClickAlert = () => {
  setOpen(true);
};

const handleCloseAlert = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};



//download data
const fetchrooms = async()=>{
    const{data,error} =  await supabase
    .from('rooms')
    .select()
    .eq('id',id)
    .single()
    if(error){
        console.log(error)
        
    }if(data){
      setIdRoom(data.id);
      setCreatedAt(data.createdAt);
      setNumber(data.number);
      setName(data.name);
      setStatus(data.status);
      setDescription(data.description);
      setActionDate(data.actionDate);
      setGeoLocation(data.geoLocation);
    }
}
//update data 
const updateRoom =async()=>{
    const{data,error}=await supabase
    .from('rooms')
    .update({'number':number,'name':name,'status':status,'description':description,'geoLocation':geoLocation})
    .eq('id',id)
    console.log("update room")
    handleClickAlert()
}

useEffect(()=>{
    fetchrooms();
  },[])


    return (
      <div>
          
    <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
      <TextField
        type="number"
        label="ID"
        name="idRoom"
        value={idRoom}
        disabled
        onChange={(e) => 
            setIdRoom(e.target.value)}
        fullWidth
        style={{ marginBottom: '10px' }}
      />
      <TextField
        type="text"
        label="Data utworzenia"
        name="created_at"
        value={createdAt}
        disabled
        onChange={(e) => 
            setCreatedAt(e.target.value)}
        fullWidth
        style={{ marginBottom: '10px' }}
      />
      <TextField
        type="number"
        label="Numer"
        name="number"
        value={number}
        onChange={(e) => 
            setNumber(e.target.value)}
        required
        fullWidth
        style={{ marginBottom: '10px' }}
      />
      <TextField
        type="text"
        label="Nazwa"
        name="name"
        value={name}
        onChange={(e) => 
            setName(e.target.value)}
        fullWidth
        style={{ marginBottom: '10px' }}
      />
      <Select
        label="Status"
        name="status"
        value={status}
        onChange={handleStatusChange}
        fullWidth
        style={{ marginBottom: '10px' }}
      >
        <MenuItem value="brudne">Brudne</MenuItem>
        <MenuItem value="realizacja">Realizacja</MenuItem>
        <MenuItem value="czysty">Czyste</MenuItem>
      </Select>
      <TextField
        multiline
        label="Opis"
        name="description"
        value={description}
        onChange={(e) => 
            setDescription(e.target.value)}
        required
        inputProps={{ maxLength: 200 }}
        rowsMax={Infinity}
        fullWidth
        style={{ marginBottom: '10px' }}
      />
      <TextField
        type="text"
        label="Data modyfikacji"
        name="actionDate"
        value={actionDate}
        disabled
        onChange={(e) => 
            setActionDate(e.target.value)}
        fullWidth
        style={{ marginBottom: '10px' }}
      />
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <TextField
          multiline
          label="Lokalizacja"
          value={geoLocation}
          onChange={(event) => setGeoLocation(event.target.value)}
          inputProps={{ maxLength: 200 }}
          rowsMax={Infinity}
          fullWidth
        />
        <Button variant="contained" color="secondary" style={{ marginLeft: '10px' }} onClick={handleOpenGoogleMaps}>
          Mapa
        </Button>
      </div>
      <Button type="submit" variant="contained" color="primary">
      Zapisz
      </Button>
      <Snackbar open={open}
        autoHideDuration={2000}
        onClose={handleCloseAlert}>
      <Alert severity="success">Zaktualizowano!</Alert>
      </Snackbar>
    </form>

      </div>
     
      
    );
  }
  
  export default Room;
  