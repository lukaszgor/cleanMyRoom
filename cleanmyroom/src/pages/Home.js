import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import supabase from "../supabaseClient" 
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import RoomCardDashbord from '../components/RoomCardDashbord';
import WorkerHome from '../pages/WorkerHome';

function Home() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState('');
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem('userIdFromLocalStorage');
    if (userIdFromLocalStorage === null) {
      navigate('/');
    } else {
      setUserID(userIdFromLocalStorage);
      fetchTypeUser(userIdFromLocalStorage);
    }
  }, []);

  const SignOut = async () => {
    localStorage.clear();
    const { user, error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error with sign out");
    } else {
      navigate('/');
    }
  };

  const fetchTypeUser = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('type')
      .eq('id', userId)
      .single();

    if (error) {
      console.log(error);
    } else if (data) {
      setIsVerified(data.type);
    }
  }

  return (
    <div>
      {isVerified === 'admin' && <RoomCardDashbord />}
      {isVerified === 'worker' && <WorkerHome />}
      {isVerified === null && (
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p> Zaczekaj na zatwierdzenie administratora!</p>
          <Button onClick={SignOut}>
            Wyloguj się
          </Button>
          <p></p>
          <CircularProgress />
          Twoje ID:
          <p>{userID}</p>
        </Box>
      )}
    </div>
  );
}

export default Home;
