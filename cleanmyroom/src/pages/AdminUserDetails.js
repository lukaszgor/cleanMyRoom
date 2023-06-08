import { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import supabase from '../supabaseClient';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import Checkbox from '@mui/material/Checkbox';

function AdminUserDetails() {
    const {id} = useParams()
    const [fullname, setFullName] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate()
    const [isChecked, setIsChecked] = useState(null);
  

    const handleSubmit = (event) => {
        event.preventDefault();
      updateUser();
       
      };

    const handleStatusChange = (event) => {
        setType(event.target.value);
      };
      const handleCheckboxChange = (event) => {
        setIsChecked((prevState) => (prevState === null ? 1 : null));
      };

    
//download data
const fetchUser = async()=>{
    const{data,error} =  await supabase
    .from('profiles')
    .select()
    .eq('id',id)
    .single()
    if(error){
        console.log(error)
        
    }if(data){
      setFullName(data.full_name);
      setType(data.type);
      setIsChecked(data.blocked)
     
    }
}
//update data 
const updateUser =async()=>{
    const{data,error}=await supabase
    .from('profiles')
    .update({'full_name':fullname,'type':type,'blocked':isChecked})
    .eq('id',id)
    console.log("update room")
    handleClickAlert()
}



useEffect(()=>{
    fetchUser();
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
         <ResponsiveAppBar></ResponsiveAppBar>   
         <p></p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            type="text"
            label="Imię i nazwisko"
            name="full_namet"
            value={fullname}
            onChange={(e) => 
                setFullName(e.target.value)}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <Select
            label="Typ"
            name="type"
            value={type}
            onChange={handleStatusChange}
            fullWidth
            style={{ marginBottom: '10px' }}
          >
             <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="worker">Worker</MenuItem>
          </Select>
          </div>
          <Checkbox
        checked={isChecked !== null}
        onChange={handleCheckboxChange}
        color="primary"
      />
      <label htmlFor="my-checkbox">Zablokowany</label>

          <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }}>
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
  
  export default AdminUserDetails;