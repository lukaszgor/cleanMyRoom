import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import supabase from "../../supabaseClient" 
import { useNavigate } from "react-router-dom"


function UserAdministration() {

    const [fetchError,setFetchError] =useState(null)
    const [user,setUser] =useState(null)
    const navigate = useNavigate()//add to nav

    useEffect(()=>{
        const fetchUsers = async()=>{
            const{data,error} =  await supabase
            .from('profiles')
            .select()
            if(error){
                console.log(error)
                setUser(null)
                setFetchError("Brak userów")
            }if(data){
              setUser(data)
              setFetchError(null)
            }
        }
    
      fetchUsers()
        
      },[])

const seetingsButton=(event, cellValues)=>{
    console.log(cellValues.row);
    navigate('/UserDetails/'+cellValues.row.id)
}
const addNewUser=()=>{
    navigate('/AdminNewUser')
}

    const columns = [

        { field: 'id', headerName: 'ID', type: 'number', width: 300 },
        { field: 'full_name', headerName: 'Imie i nazwisko', type: 'number',width: 200 },
        { field: 'type', headerName: 'Typ', width: 130 },
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
          {fetchError &&(<p>{fetchError}</p>)}
        {user &&(
        <div>
      <p> </p>
      {/* <Button color="primary" onClick={addNewUser}>Nowy</Button> */}
      <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={user}
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
  
  export default UserAdministration;
  