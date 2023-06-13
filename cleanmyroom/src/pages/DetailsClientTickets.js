import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import supabase from "../supabaseClient" 
import { useParams } from "react-router-dom";
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import WorkerAppTopBar from '../components/workerComponents/WorkerAppTopBar';

function DetailsClientTickets() {
  const {id} = useParams()
  const [fetchError,setFetchError] =useState(null)
  const [services,setServices] =useState(null)
  const [userType,setUserType] =useState(null)
  const [userID,setUserID] =useState('')
  //Verify loginuser
      let userIdFromLocalStorage;

  useEffect(()=>{
    userIdFromLocalStorage = localStorage.getItem('userIdFromLocalStorage');
      fetchTickets()
      fetchUserType()
    },[])

    const fetchTickets = async()=>{
        const{data,error} =  await supabase
        .from('toDoTickets')
        .select()
        .eq('id_ticket',id)
        .order('created_at', { ascending: false });
        if(error){
            console.log(error)
            setServices(null)
            setFetchError("Brak uslug")
        }if(data){
          setServices(data)
          setFetchError(null)
        }
    }
  
    const fetchUserType = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('type')
            .eq('id',userIdFromLocalStorage)
            .single();
  
          if (error) {
            console.error(error);
            return;
          }
  
          if (data) {
            setUserType(data.type);
          }
        } catch (error) {
          console.error(error);
        }
      };

  const columns = [

      { field: 'id', headerName: 'ID', type: 'number', width: 50 },
      { field: 'name', headerName: 'Nazwa',width: 130 },
    ];

    return (
      <div>

<div>
{userType === 'admin'  && <div><ResponsiveAppBar></ResponsiveAppBar></div>}
{userType === 'worker'  && <div><WorkerAppTopBar></WorkerAppTopBar></div>}
</div>

        {fetchError &&(<p>{fetchError}</p>)}
        {services &&(
        <div>
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
     
      
    );
  }
  
  export default DetailsClientTickets;
  