import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import supabase from "../../supabaseClient" 
import { useParams } from "react-router-dom";


function WorkerEquipment() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [fetchError,setFetchError] =useState(null)
    const [equipment,setEquipment] =useState(null)
    const {id} = useParams()

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


    const columns = [
        { field: 'name', headerName: 'Nazwa', width: 130 },
        { field: 'description', headerName: 'Opis', width: 220 },
      ];


    return (
      <div>
          <div>
        {fetchError &&(<p>{fetchError}</p>)}
        {equipment &&(
        <div>
      <p>Lista wyposazenia</p>
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
      </div>
     
      
    );
  }
  
  export default WorkerEquipment;
  