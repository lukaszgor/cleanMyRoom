import { useNavigate } from "react-router-dom"
import { useState,useEffect } from 'react';
import supabase from "../supabaseClient" 
import Button from '@mui/material/Button';
import { Box } from "@mui/system";
import RoomsDashboard from "../components/RoomsDashboard"

import ResponsiveAppBar from "../components/ResponsiveAppBar";

function Home() {

  //Signout method
  const navigate = useNavigate()//add to nav
  const SignOut = async () => {
    localStorage.clear();
      const {user,error}= await supabase.auth.signOut()
      if(error){
        console("Error with sigout")
      }else{
        navigate('/')
      }
    }

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
        <ResponsiveAppBar></ResponsiveAppBar>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="outlined" color="error" onClick={SignOut}>Wyloguj</Button>
          </Box> 
     <p></p>
      {isVerified !== null && <div><RoomsDashboard></RoomsDashboard></div>}
      {isVerified === null && <div><p> Zaczekaj na zatwierdzenie administratora!</p></div>}
    </div>
   
    
  );
}

export default Home;
