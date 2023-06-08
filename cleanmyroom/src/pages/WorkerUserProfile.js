import React, { useState,useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import supabase from '../supabaseClient';
import WorkerAppTopBar from '../components/workerComponents/WorkerAppTopBar';

function WorkerUserProfile() {
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userID, setUserID] = useState('');
  const [user,setUser] =useState(null)
  let userIdFromLocalStorage;


 //download username
 const FetchUserName = async () => {
    userIdFromLocalStorage = localStorage.getItem('userIdFromLocalStorage');
    const{data,error} =  await supabase
    .from('profiles')
    .select('full_name')
    .eq('id',userIdFromLocalStorage)
    .single()
    if(error){
     
    }if(data){
      setUser(data.full_name)
      setUserID(userIdFromLocalStorage)
     
    }
    }
    useEffect(()=>{
        FetchUserName();
      },[])

  const handlePasswordChange = async () => {
    await supabase.auth.updateUser({ password: password })

  };

  const handleFullNameChange = async () => {
        const{data,error}=await supabase
        .from('profiles')
        .update({'full_name':fullName})
        .eq('id',userID)
  };

  return (
    <div>
        <WorkerAppTopBar></WorkerAppTopBar>
   
    <div >
        <p></p>
      
        <Grid container direction="column" alignItems="center" spacing={3} component="form">
          <Grid item>
            <Typography variant="h6" >
              Zmiana hasła
            </Typography>
          </Grid>
          <Grid >
            <TextField
              label="Nowe hasło"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePasswordChange}
             
            >
              Zmień hasło
            </Button>
          </Grid>

          <Grid item>
            <Typography variant="h6" >
              Zmiana imienia i nazwiska
            </Typography>
          </Grid>
          <Grid item >
            <TextField
              label="Imię i nazwisko"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFullNameChange}
             
            >
              Zmień imię i nazwisko
            </Button>
          </Grid>
        </Grid>
    
    </div>
    </div>
  );
}

export default WorkerUserProfile;
