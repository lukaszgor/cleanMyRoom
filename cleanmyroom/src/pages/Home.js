import { useNavigate } from "react-router-dom"
import { useState,useEffect } from 'react';
import supabase from "../supabaseClient" 
import Button from '@mui/material/Button';

function Home() {

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

  return (
    <div>
        Home
        <Button variant="outlined" color="error" onClick={SignOut}>Wyloguj</Button>
    </div>
   
    
  );
}

export default Home;
