import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import ButtonGroup from '@mui/material/ButtonGroup';
import supabase from "../supabaseClient" 
import { useNavigate } from "react-router-dom"
function RoomsDashboard() {

    const [fetchError,setFetchError] =useState(null)
    const [rooms,setRooms] =useState(null)
    const navigate = useNavigate()//add to nav

    useEffect(()=>{
        const fetchrooms = async()=>{
            const{data,error} =  await supabase
            .from('rooms')
            .select()
            if(error){
                console.log(error)
                setRooms(null)
                setFetchError("Brak transakcji")
            }if(data){
              setRooms(data)
              setFetchError(null)
            }
        }
      console.log(rooms)
        fetchrooms()
        
      },[])




const seetingsButton=()=>{

}
const historyButton=()=>{

}
const cleanButton=()=>{

}
const addNewRoom=()=>{
    navigate('/Add')
}


    const columns = [

        { field: 'id', headerName: 'ID', type: 'number', width: 50 },
        { field: 'number', headerName: 'Numer', type: 'number',width: 80 },
        { field: 'name', headerName: 'Nazwa', width: 130 },
        { field: 'status', headerName: 'Status', width: 80 },
        { field: 'actionDate', headerName: 'Ostatnia akcja', width: 120 },
        {
            field: "Akcje",headerName: 'Akcje', width: 400 ,
            renderCell: (cellValues) => {
              return (
                <ButtonGroup>
                <Button
                  color="secondary"
                  onClick={(event) => {
                    cleanButton(event, cellValues);
                  }}
                >Do realizacji</Button>
                <Button
                color="error"
                onClick={(event) => {
                  historyButton(event, cellValues);
                }}
                >Historia</Button>
                <Button
                color="primary"
                onClick={(event) => {
                    seetingsButton(event, cellValues);
                }}
                >Opcje</Button>
              </ButtonGroup>
           
              );
            }
          },
       
      ];



    return (
        <div>
        {fetchError &&(<p>{fetchError}</p>)}
        {rooms &&(
        <div>
      <p>Wszystkie pokoje</p>
      <Button color="primary" onClick={addNewRoom}>Nowy</Button>
      <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rooms}
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
     
      
    );
  }
  
  export default RoomsDashboard;
  