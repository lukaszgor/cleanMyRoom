import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';


function AddRoom() {
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
  
   
    const handleStatusChange = (event) => {
      setStatus(event.target.value);
    };
  
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Number:', number);
      console.log('Name:', name);
      console.log('Status:', status);
      console.log('Description:', description);
      // Możesz wykonać inne operacje, takie jak wysłanie danych do serwera itp.
    };


    return (
      <div>
          AddRoom
          <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          type="number"
          label="Number"
          value={number}
          onChange={(e) => 
            setNumber(e.target.value)}
          required
          style={{ marginBottom: '10px', maxWidth: '300px' }}
        />
        <TextField
          type="text"
          label="Name"
          value={name}
          onChange={(e) => 
            setName(e.target.value)}
          required
          style={{ marginBottom: '10px', maxWidth: '300px' }}
        />
        <FormControl required style={{ marginBottom: '10px', maxWidth: '300px' }}>
          <InputLabel>Status</InputLabel>
          <Select
          label="Status"
            value={status}
            onChange={handleStatusChange}
          >
            <MenuItem value="brudne">Brudne</MenuItem>
            <MenuItem value="czyste">Czyste</MenuItem>
          </Select>
        </FormControl>
        <TextField
         multiline
         label="Description"
         value={description}
         onChange={(e) => 
            setDescription(e.target.value)}
         required
         inputProps={{ maxLength: 200 }}
         rowsMax={Infinity}
         style={{ marginBottom: '10px', maxWidth: '300px' }}
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
      </div>
     
     
      
    );
  }
  
  export default AddRoom;
  