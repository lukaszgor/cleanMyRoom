import { useNavigate } from "react-router-dom"
import { useState,useEffect } from 'react';
import supabase from "../supabaseClient"  
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';


//navigate menu section
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'} variant={'body2'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
//end navigate
function Auth() {
//menu tabs
const [value, setValue] = useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};
    const navigate = useNavigate()//add to nav

  const [email, setEmail] = useState(''); // email of the user
  const [password, setPassword] = useState(''); // password of the user
  const [username, setUsername] = useState(''); // username of the user
  const [Rmsg, setRMsg] = useState(''); // Registration message
  const [Lmsg, setLMsg] = useState(''); // Login message
  const [user, setUser] = useState(''); // User object after registration / login
  const [session, setSession] = useState(''); // session object after registration / login

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/home')
      }
    };
    checkSession();
  });
  supabase.auth.onAuthStateChange((event,session) => {
    if (event == "SIGNED_IN") {
      navigate('/home')
      // setter
localStorage.setItem('userIdFromLocalStorage', session?.user.id);
    }
  });
 
  const Register = async () => {
    const {data, error} = await supabase.auth.signUp({
      email,
      password,
    },
    {
      data: {
        username
      }
    })
    if(error){
      setRMsg(error.message)
    }else{
      setRMsg('User created successfully')
      setUser(data.user)
    }
  }
let errorMessageLogin='Enter valid credentials'
  const Login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if(error){
      setLMsg(errorMessageLogin)
    }else{
      setLMsg('Login successful')
      setUser(data.user)
      setSession(data.session)
      console.log(data.session)
      navigate('/home')
    }
  }


return (
    <div className="App">
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Logowanie" {...a11yProps(0)} />
          <Tab label="Rejestracja" {...a11yProps(1)} />
         
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
      <h1>Zaloguj się</h1>
      <TextField id="standard-basic" label="E-mail" placeholder="Enter your email" type="email" onChange={(e) => setEmail(e.target.value)} variant="standard" />
      <br/>      
      <TextField id="standard-password-input" label="Hasło"  type="password" placeholder="Enter your Password" autoComplete="current-password" variant="standard" onChange={(e) =>
         setPassword(e.target.value)} />
      <br/>
      <br/>
      <Button size="small" variant="contained" onClick={Login}>Zaloguj się</Button>
      <p>{Lmsg}</p>
      <br/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <h1>Zarejestruj się</h1>
         <TextField id="standard-basic" label="E-mail" variant="standard" onChange={(e) => 
        setEmail(e.target.value)} />
      <br/>
         <TextField id="standard-password-input" label="Hasło" type="password" autoComplete="current-password" variant="standard" onChange={(e) =>
         setPassword(e.target.value)} />
           <br/>
        <TextField id="standard-basic" label="Imie" variant="standard" onChange={(e) => 
        setUsername(e.target.value)} />
          <br/>
          <br/>
      <Button size="small" variant="contained" onClick={Register}>Zarejestruj się</Button>
      <p>{Rmsg}</p>
      </TabPanel>
   
    </Box>
    </div>
  );
      }
export default Auth;
