import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import supabase from "../supabaseClient" 
import { useNavigate } from "react-router-dom"
import ResponsiveAppBar from "../components/ResponsiveAppBar";
function RoomsDashboard() {

    const [fetchError,setFetchError] =useState(null)
    const [rooms,setRooms] =useState(null)
    const navigate = useNavigate()//add to nav

    useEffect(()=>{
        const fetchrooms = async()=>{
            const{data,error} =  await supabase
            .from('rooms')
            .select()
            .is('isActive', null);
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

const seetingsButton=(event, cellValues)=>{
    console.log(cellValues.row);
    navigate('/settings/'+cellValues.row.id)
}
const addNewRoom=()=>{
    navigate('/Add')
}

    const columns = [

        { field: 'id', headerName: 'ID', type: 'number', width: 50 },
        { field: 'number', headerName: 'Numer', type: 'number',width: 80 },
        { field: 'name', headerName: 'Nazwa', width: 130 },
        { field: 'status', headerName: 'Status', width: 80 },
        { field: 'actionDate', headerName: 'Zarejestrowano', width: 220 },
        {
            field: "Akcje",headerName: 'Akcje', width: 200 ,
            renderCell: (cellValues) => {
              return ( 
                <Button
                color="primary"
                onClick={(event) => {
                    seetingsButton(event, cellValues);
                }}
                >Szczegóły</Button>
              );
            }
          },
       
      ];



    return (
        <div>
               <ResponsiveAppBar></ResponsiveAppBar>
               <Button color="primary" onClick={addNewRoom}>Nowy</Button>
        {fetchError &&(<p>{fetchError}</p>)}
        {rooms &&(
        <div>
      <p>Wszystkie lokalizacje</p>
     
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
  