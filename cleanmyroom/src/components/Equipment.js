import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import supabase from "../supabaseClient" 
import { useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Equipment() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [fetchError,setFetchError] =useState(null)
    const [equipment,setEquipment] =useState(null)
    const {id} = useParams()
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Wykonaj dowolne operacje na przesłanych danych, np. zapisz w bazie danych
      insertEquipment();
      // Wyczyść pola formularza po zapisaniu danych
      setName('');
      setDescription('');
    };

    //Delete
    const DeleteEquipment = async(event, cellValues)=>{
        const{data,error} =  await supabase
    .from('roomsequipment')
    .delete().eq('id', cellValues.row.id);
    handleClickAlert();
    fetchEquipment();
    if(error){
        console.log(error)
    }if(data){
     
    }
    }
      //insert
const insertEquipment = async()=>{
    const{data,error} =  await supabase
    .from('roomsequipment')
    .insert([{roomId:id,name:name,description:description}])
    handleClickAlert()
    fetchEquipment()
    if(error){
        console.log(error)
    }if(data){
     
    }
  }


    useEffect(()=>{
        fetchEquipment()
      },[])

      //download data
      const fetchEquipment = async()=>{
        const{data,error} =  await supabase
        .from('roomsequipment')
        .select()
        .eq('roomId',id)
        if(error){
            console.log(error)
            setEquipment(null)
            setFetchError("Brak wyposazenia!")
        }if(data){
          setEquipment(data)
          setFetchError(null)
        }
    }
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
    

    const columns = [
        { field: 'name', headerName: 'Nazwa', width: 130 },
        { field: 'description', headerName: 'Opis', width: 220 },
        {
            field: "Akcje",headerName: 'Akcje', width: 200 ,
            renderCell: (cellValues) => {
              return ( 
                <Button
                color="error"
                onClick={(event) => {
                    DeleteEquipment(event, cellValues);
                }}
                >Usuń</Button>
              );
            }
          },
       
      ];


    return (
      <div>
       
          <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <TextField
        label="Nazwa"
        value={name}
        onChange={(event) => setName(event.target.value)}
        style={{ marginRight: '10px' }}
      />
      <TextField
        label="Opis"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        style={{ marginRight: '10px' }}
      />
      <Button variant="contained" color="primary" type="submit">
        Dodaj
      </Button>
    </form>


    <div>
        {fetchError &&(<p>{fetchError}</p>)}
        {equipment &&(
        <div>
    <p></p>
      <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={equipment}
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
      <Snackbar open={open}
        autoHideDuration={2000}
        onClose={handleCloseAlert}>
      <Alert severity="success">Zaktualizowano!</Alert>
      </Snackbar>
      </div>
      
     
      
    );
  }
  
  export default Equipment;
  