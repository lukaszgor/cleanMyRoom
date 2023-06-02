import React, { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import moment from "moment";
import supabase from "../supabaseClient" 
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


function AddRoom() {
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('brudne');
    const [description, setDescription] = useState('');
    const [date,setDate]=useState('09.02.2023')
  
   
    const handleStatusChange = (event) => {
      setStatus(event.target.value);
    };
    useEffect(()=>{
        currentDateFunction();
      },[])
  //insert
const insertRoom = async()=>{
    const{data,error} =  await supabase
    .from('rooms')
    .insert([{number:number,name:name,status:status,name:name,description:description,actionDate:date}])
    if(error){
        console.log(error)
    }if(data){
       console.log(data)
    }
  }
  
  //set current date rewards
  const currentDateFunction =()=>{
    let currentDate=moment().format();   ; 
    setDate(currentDate)
  }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Number:', number);
      console.log('Name:', name);
      console.log('Status:', status);
      console.log('Description:', description);
      
      
      insertRoom();
      handleClickAlert()
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
        Zapisz
      </Button>
    </form>

    <Snackbar open={open}
        autoHideDuration={2000}
        onClose={handleCloseAlert}>
      <Alert severity="success">Correct!</Alert>
      </Snackbar>

      </div>
     
     
      
    );
  }
  
  export default AddRoom;
  