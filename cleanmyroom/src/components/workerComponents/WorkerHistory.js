import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import supabase from "../../supabaseClient"  
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";


function WorkerHistory() {

    const {id} = useParams()
  const [fetchError,setFetchError] =useState(null)
  const [tasks,setTasks] =useState(null)
  const navigate = useNavigate()//add to nav

  useEffect(()=>{
  fetchtasks()
    
  },[])

  //fetch tasks
  const fetchtasks = async()=>{
    const{data,error} =  await supabase
    .from('tasks')
    .select()
    .eq('roomId',id)
    .order('created_at', { ascending: false });
    if(error){
        console.log(error)
        setTasks(null)
        setFetchError("Brak tasków")
    }if(data){
      setTasks(data)
      setFetchError(null)
    }
}

const detailsButton=(event, cellValues)=>{
console.log(cellValues.row);
navigate('/taskView/'+cellValues.row.id)
}


const columns = [

    { field: 'id', headerName: 'ID', type: 'number', width: 50 },
    { field: 'description', headerName: 'Opis',width: 130 },
    { field: 'whoDone', headerName: 'Realizator', width: 200 },
    { field: 'dateDone', headerName: 'Data i czas', width: 150 },
    { field: 'time', headerName: 'Czas wykonania', type: 'number', width: 150 },
    // {
    //     field: "Akcje",headerName: 'Akcje', width: 200 ,
    //     renderCell: (cellValues) => {
    //       return ( 
    //         <Button
    //         color="primary"
    //         onClick={(event) => {
    //           detailsButton(event, cellValues);
    //         }}
    //         >Szczegóły</Button>
    //       );
    //     }
    //   },
   
  ];

    return (
        <div>
        {fetchError &&(<p>{fetchError}</p>)}
        {tasks &&(
        <div>
      
      
      <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={tasks}
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
  
  export default WorkerHistory;