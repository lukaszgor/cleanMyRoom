import React, { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import supabase from '../../supabaseClient';
import { useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function TaskDetails() {

    const [idtask, setIdTask] = useState('');
    const [description, setDescription] = useState('');
    const [whoRealized, setWhoRealized] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const {id} = useParams();
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Obsługa wysłania formularza
      updateTask();
  
 
    };

    //download data
const fetchTask = async()=>{
    const{data,error} =  await supabase
    .from('tasks')
    .select()
    .eq('id',id)
    .single()
    if(error){
        console.log(error)
        
    }if(data){
        setIdTask(data.id);
        setDescription(data.description);
        setWhoRealized(data.whoDone);
        setDate(data.dateDone);
        setTime(data.time);
    }
}
//update data 
const updateTask =async()=>{
    const{data,error}=await supabase
    .from('tasks')
    .update({'description':description,'whoDone':whoRealized,'time':time})
    .eq('id',id)
    handleClickAlert()
}

useEffect(()=>{
    fetchTask();
  },[])


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
          <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <TextField
        label="ID"
        value={idtask}
        onChange={(e) => setIdTask(e.target.value)}
        type="number"
        disabled
      />
      <TextField
        label="Opis"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        required
      />
      <TextField
        label="Kto zrealizował"
        value={whoRealized}
        onChange={(e) => setWhoRealized(e.target.value)}
        required
      />
      <TextField
        label="Data"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        type="text"
        disabled
      />
      <TextField
        label="Czas"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        type="number"
        required
      />
      <Button variant="contained" color="primary" type="submit">
        Dodaj
      </Button>
    </Box>

    <Snackbar open={open}
        autoHideDuration={2000}
        onClose={handleCloseAlert}>
      <Alert severity="success">Zaktualizowano!</Alert>
      </Snackbar>
          
      </div>
     
      
    );
  }
  
  export default TaskDetails;
  