import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import supabase from '../../supabaseClient';
import { useParams } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function TaskServices() {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [options, setOptions] = useState([]);
    const {id} = useParams();
    const [services,setServices] =useState(null);
    const [fetchError,setFetchError] =useState(null);
  
    useEffect(() => {
      fetchOptions();
      fetchServices();
    }, []);
  
    const fetchOptions = async () => {
      const { data, error } = await supabase.from('dictionaryServices').select('name');
      if (error) {
        console.error(error);
      } else {
        setOptions(data.map((record) => record.name));
      }
    };
  
    //insert data
    const insertData =async ()=>{
        const { data, error } = await supabase.from('services').insert([{name:name,comment:comment,idtask:id }]);
        if (error) {
          console.error(error);
        } else {
          console.log('Dane zostały zapisane w bazie danych.');
          handleClickAlert();
          fetchServices();
        }
    };
       //download data
       const fetchServices = async()=>{
        const{data,error} =  await supabase
        .from('services')
        .select()
        .eq('idtask',id)
        if(error){
            console.log(error)
            setServices(null)
            setFetchError("Brak usług!")
        }if(data){
          setServices(data)
          setFetchError(null)
        }
    }

    const columns = [
        { field: 'name', headerName: 'Nazwa', width: 130 },
        { field: 'comment', headerName: 'Komentarz', width: 220 },
        {
            field: "Akcje",headerName: 'Akcje', width: 200 ,
            renderCell: (cellValues) => {
              return ( 
                <Button
                color="error"
                onClick={(event) => {
                    DeleteService(event, cellValues);
                }}
                >Usuń</Button>
              );
            }
          },
       
      ];

       //Delete
    const DeleteService = async(event, cellValues)=>{
        const{data,error} =  await supabase
    .from('services')
    .delete().eq('id', cellValues.row.id);
    handleClickAlert();
    fetchServices();
    if(error){
        console.log(error)
    }if(data){
     
    }
    }
   

    const handleAdd = () => {
      if (name && comment) {
        // Wykonaj dowolne operacje na przesłanych danych, np. zapisz w bazie danych
        insertData();
        // Wyczyść pola formularza po zapisaniu danych
        setName('');
        setComment('');
      }
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
 <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FormControl style={{ marginRight: '10px', width: '200px' }}>
          <InputLabel id="nazwa-label">Nazwa</InputLabel>
          <Select
            labelId="nazwa-label"
            id="nazwa-select"
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Komentarz"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          rows={4}
          style={{ marginRight: '10px', width: '300px' }}
        />
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Dodaj
        </Button>
      </form>

      <div>
        {fetchError &&(<p>{fetchError}</p>)}
        {services &&(
        <div>
      <p>Lista usług</p>
      <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={services}
              columns={columns}
              pageSize={12}
              rowsPerPageOptions={[12]}
            />
          </div>
      <div>
      </div>
        </div>
        )}
      
      </div>
      <div>
      <Snackbar open={open}
        autoHideDuration={2000}
        onClose={handleCloseAlert}>
      <Alert severity="success">Zaktualizowano!</Alert>
      </Snackbar>
      </div>
        </div>
       
       
     
      
    );
  }
  
  export default TaskServices;
  