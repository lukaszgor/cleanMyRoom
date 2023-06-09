import { useNavigate } from "react-router-dom"
import { useState,useEffect } from 'react';
import supabase from "../supabaseClient" 
import Button from '@mui/material/Button';
//import { Box } from "@mui/system";
import RoomsDashboard from "../components/RoomsDashboard"
import WorkerHome from "../pages/WorkerHome"
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import RoomCardDashbord from '../components/RoomCardDashbord'

function Home() {
  const navigate = useNavigate()//add to nav
  const [userID,setUserID] =useState('')
//Verify loginuser
    let userIdFromLocalStorage;
    useEffect(()=>{
      fetchTypeUser(); //check type !=null
   // get user id
   userIdFromLocalStorage = localStorage.getItem('userIdFromLocalStorage');
   if(userIdFromLocalStorage ===null){
     navigate('/')
   }else{
setUserID(userIdFromLocalStorage);
   }
   },[])

   const SignOut = async () => {
    localStorage.clear();
      const {user,error}= await supabase.auth.signOut()
      if(error){
        console("Error with sigout")
      }else{
        navigate('/')
      }
    }

//Verifity User
const [isVerified,setisVerified] =useState(null)
const [isBlocked,setIsBlocked] =useState(null)
const fetchTypeUser = async()=>{
  const{data,error} =  await supabase
  .from('profiles')
  .select()
  .eq('id',userIdFromLocalStorage)
  .single()
  if(error){
      console.log(error)
  }if(data){
    setisVerified(data.type)
    setIsBlocked(data.blocked)
    if(data.blocked ===1){
      SignOut()
    }
  }
}

  return (
    <div>
     
      {/* {isVerified !== null && <div><RoomsDashboard></RoomsDashboard></div>} */}
      {isVerified === 'admin'  && <div><RoomCardDashbord></RoomCardDashbord></div>}
      {isVerified === 'worker'  && <div><WorkerHome></WorkerHome></div>}
      {isVerified === null && <div>
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <p> Zaczekaj na zatwierdzenie administratora!</p>
    <Button  onClick={SignOut}>
  Wyloguj się
</Button>
<p></p>
      <CircularProgress />
      Twoje ID:
<p>{userID}</p>

    </Box>
      </div>}
     
    </div>
   
    
  );
}

export default Home;
