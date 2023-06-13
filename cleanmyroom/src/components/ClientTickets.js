import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import supabase from "../supabaseClient" 
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";

function ClientTickets() {
  const {id} = useParams()
  const [fetchError,setFetchError] =useState(null)
  const [tickets,setTickets] =useState(null)
  const navigate = useNavigate()//add to nav

  useEffect(()=>{
      const fetchTickets = async()=>{
          const{data,error} =  await supabase
          .from('tickets')
          .select()
          .eq('id_room',id)
          .order('created_at', { ascending: false });
          if(error){
              console.log(error)
              setTickets(null)
              setFetchError("Brak tasków")
          }if(data){
            setTickets(data)
            setFetchError(null)
          }
      }
    
      fetchTickets()
      
    },[])

const detailsButton=(event, cellValues)=>{
  console.log(cellValues.row);
  navigate('/DetailsClientTickets/'+cellValues.row.id)
}


  const columns = [

      { field: 'id', headerName: 'ID', type: 'number', width: 50 },
      { field: 'created_at', headerName: 'data powstania',width: 130 },
      { field: 'details', headerName: 'Opis',width: 130 },
      {
          field: "Akcje",headerName: 'Akcje', width: 200 ,
          renderCell: (cellValues) => {
            return ( 
              <Button
              color="primary"
              onClick={(event) => {
                detailsButton(event, cellValues);
              }}
              >Szczegóły</Button>
            );
          }
        },
     
    ];



    return (
      <div>



        
        {fetchError &&(<p>{fetchError}</p>)}
        {tickets &&(
        <div>
      
      
      <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={tickets}
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
  
  export default ClientTickets;
  