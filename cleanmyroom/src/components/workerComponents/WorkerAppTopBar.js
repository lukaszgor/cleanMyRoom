import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from 'react';
import supabase from "../../supabaseClient" 
import DryCleaningIcon from '@mui/icons-material/DryCleaning';

const pages = ['Profil','Otwarte' ,'Zrealizowane'];


function WorkerAppTopBar() {
    const [user,setUser] =useState(null)
    let userIdFromLocalStorage;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [userType, setUserType] = useState('');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('type')
      .eq('id', userIdFromLocalStorage)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setUserType(data.type);
    }
  };



  useEffect(()=>{
    FetchUserName();

    userIdFromLocalStorage = localStorage.getItem('userIdFromLocalStorage');
    if(userIdFromLocalStorage ===null){
      navigate('/')
    }
    fetchProfile();

  },[])



  useEffect(() => {
    if (userType === 'worker') {
      // Pozostaj na stronie dla admina
    } else if (userType === 'admin') {
      // Przekieruj na podstronę dla pracownika
      window.location.href = '/home';
    }
  }, [userType]);



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
     
    }
    }

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

       //go to UserProfile
    const UserProfile =  () => {
          navigate('/WorkerUserProfile')
      }
         //go to closed room
    const ClosedRoomContainer =  () => {
          navigate('/WorkerClosedRoomContainer')
      }
      const inProgresstask =  () => {
        navigate('/home')
    }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DryCleaningIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CleanMyRoom
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
<Button onClick={UserProfile}  sx={{ my: 2, color: 'blue', display: 'block' }}>Profil</Button>
<Button onClick={inProgresstask}  sx={{ my: 2, color: 'blue', display: 'block' }}>Otwarte</Button>
<Button onClick={ClosedRoomContainer}  sx={{ my: 2, color: 'blue', display: 'block' }}>Zrealizowane</Button>
            </Menu>
          </Box>
          <DryCleaningIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
<Button onClick={UserProfile} sx={{ my: 2, color: 'white', display: 'block' }}>Profil</Button>
<Button onClick={inProgresstask} sx={{ my: 2, color: 'white', display: 'block' }}>Otwarte</Button>
<Button onClick={ClosedRoomContainer}  sx={{ my: 2, color: 'white', display: 'block' }}>Zrealizowane</Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <Typography
            noWrap
            component="a"
            href="/AdminUserProfile"
            sx={{
              mr: 2,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {user}
          </Typography>&nbsp;
          <Button variant="contained" color="error" onClick={SignOut} >Wyloguj</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default WorkerAppTopBar;