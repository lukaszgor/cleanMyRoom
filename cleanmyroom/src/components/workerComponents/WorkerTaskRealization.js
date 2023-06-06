import React, { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import moment from "moment";
import supabase from "../../supabaseClient" 
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useParams } from "react-router-dom";

function WorkerTaskRealization() {
    const {id} = useParams()
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('oczekuje');
    const [description, setDescription] = useState('');
    const [geolocation, setGeolocation] = useState('');
  //task var
  const [taskDescription, setTaskDescription] = useState('');
  const [userName, setUserName] = useState('');
  const [dateDone, setDateDone] = useState('');
  const [time, setTime] = useState('');
   
    const handleStatusChange = (event) => {
      setStatus(event.target.value);
    };

    useEffect(()=>{
        currentDateFunction();
        fetchrooms();
        FetchUserName();
        
      },[])

  //insert
const inserTask = async()=>{
    const{data,error} =  await supabase
    .from('tasks')
    .insert([{roomId:id,description:taskDescription,whoDone:userName,dateDone:dateDone,time:time}])
    handleClickAlert()
    if(error){
        console.log(error)
    }if(data){
     
    }
  }
 // update status
 const updateRoom =async()=>{
    const{data,error}=await supabase
    .from('rooms')
    .update({'status':status})
    .eq('id',id)
    console.log("update status")
    handleClickAlert()
}
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
     setNumber(data.number);
      setName(data.name);
      setStatus(data.status);
      setDescription(data.description);
      setGeolocation(data.geoLocation);
    }
}

  
  //set current date 
  const currentDateFunction =()=>{
    let currentDate=moment().format('L');
    setDateDone(currentDate)
  }

  //set current username 
  let userIdFromLocalStorage;
  const FetchUserName = async () => {
    userIdFromLocalStorage = localStorage.getItem('userIdFromLocalStorage');
    const{data,error} =  await supabase
    .from('profiles')
    .select('full_name')
    .eq('id',userIdFromLocalStorage)
    .single()
    if(error){
     
    }if(data){
        setUserName(data.full_name)
    }
    }

    const handleSubmit = (event) => {
      event.preventDefault();  
      updateRoom();
      inserTask();
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
         <div>
     
          <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          type="number"
          label="Numer"
          value={number}
          disabled
          style={{ marginBottom: '10px', maxWidth: '300px' }}
        />
        <TextField
          type="text"
          label="Nazwa"
          value={name}
            disabled
          style={{ marginBottom: '10px', maxWidth: '300px' }}
        />
        <FormControl required style={{ marginBottom: '10px', maxWidth: '300px' }}>
          <InputLabel>Status</InputLabel>
          <Select
          label="Status"
            value={status}
            onChange={handleStatusChange}
          >
            <MenuItem value="realizacja">W trakcie Realizacji</MenuItem>
            <MenuItem value="zakonczone">Zakończone</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="geolocation"
          label="Lokalizacja"
          value={geolocation}
          disabled
          style={{ marginBottom: '10px', maxWidth: '300px' }}
        />
        <TextField
         multiline
         label="Description"
         value={description}
         disabled
         inputProps={{ maxLength: 200 }}
         rowsMax={Infinity}
         style={{ marginBottom: '10px', maxWidth: '300px' }}
        />
        {/* Tasks section */}
        <TextField
         multiline
         label="Uwagi"
         value={taskDescription}
         onChange={(e) => 
            setTaskDescription(e.target.value)}
         required
         inputProps={{ maxLength: 200 }}
         rowsMax={Infinity}
         style={{ marginBottom: '10px', maxWidth: '300px' }}
        />
           <TextField
         multiline
         type="number"
         label="Czas pracy"
         value={time}
         onChange={(e) => 
            setTime(e.target.value)}
         required
         style={{ marginBottom: '10px', maxWidth: '300px' }}
        />
      </div>
      <Button type="submit" variant="contained" color="primary" >
        Zapisz
      </Button>
    </form>

    <Snackbar open={open}
        autoHideDuration={2000}
        onClose={handleCloseAlert}>
      <Alert severity="success">Zaktualizowano!</Alert>
      </Snackbar>

      </div>
      </div>
     
      
    );
  }
  
  export default WorkerTaskRealization;
  