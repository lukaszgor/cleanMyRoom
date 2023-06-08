import { useNavigate } from "react-router-dom"
import { useState,useEffect } from 'react';
import supabase from "../supabaseClient" 
import Button from '@mui/material/Button';
//import { Box } from "@mui/system";
import RoomsDashboard from "../components/RoomsDashboard"
import WorkerHome from "../pages/WorkerHome"
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Home() {
  const navigate = useNavigate()//add to nav
//Verify loginuser
    let userIdFromLocalStorage;
    useEffect(()=>{
      fetchTypeUser(); //check type !=null
   // get user id
   userIdFromLocalStorage = localStorage.getItem('userIdFromLocalStorage');
   console.log(userIdFromLocalStorage)
   if(userIdFromLocalStorage ===null){
     navigate('/')
   }
   },[])

//Verifity User
const [isVerified,setisVerified] =useState(null)
const fetchTypeUser = async()=>{
  const{data,error} =  await supabase
  .from('profiles')
  .select('type')
  .eq('id',userIdFromLocalStorage)
  .single()
  if(error){
      console.log(error)
  }if(data){
    setisVerified(data.type)
   
  }
}

  return (
    <div>
     
      {/* {isVerified !== null && <div><RoomsDashboard></RoomsDashboard></div>} */}
      {isVerified === 'admin' && <div><RoomsDashboard></RoomsDashboard></div>}
      {isVerified === 'worker' && <div><WorkerHome></WorkerHome></div>}
      {isVerified === null && <div><p> Zaczekaj na zatwierdzenie administratora!</p>
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
      </div>}
    </div>
   
    
  );
}

export default Home;
