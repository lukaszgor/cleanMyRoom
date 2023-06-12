import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import supabase from '../supabaseClient';
import { useParams } from "react-router-dom";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const ClientRequest = () => {

//create ticket
  const [showTextField, setShowTextField] = useState(false);
  const [idTicket, setIdTicket] = useState(false);
  const handleCreateTicket = () => {
    setShowTextField(true);
    insetRecortTicket();
  };

  // Funkcja do wstawiania rekordu i otrzymywania numeru ID
async function insetRecortTicket() {
    try {
        const { error } = await supabase.from('tickets').insert([{ details: 'wartosc1',id_room:id,status:'nowy' }]);
    
        if (error) {
          console.error('Wystąpił błąd podczas wstawiania rekordu:', error.message);
          return;
        }
    
        const { data: insertedRecords, error: selectError } = await supabase
          .from('tickets')
          .select('id')
          .order('id', { ascending: false })
          .limit(1);
    
        if (selectError) {
          console.error('Wystąpił błąd podczas pobierania ostatnio wstawionego rekordu:', selectError.message);
          return;
        }
    
        if (insertedRecords && insertedRecords.length > 0) {
          const insertedRecordId = insertedRecords[0].id;
          console.log('Wstawiono rekord o numerze ID:', insertedRecordId);
setIdTicket(insertedRecordId);
        } else {
          console.error('Nie otrzymano danych zwrotnych po wstawieniu rekordu');
        }
      } catch (error) {
        console.error('Wystąpił nieoczekiwany błąd:', error.message);
      }
    
  }
  
  //ticket details

  const [services, setServices] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]); // Zaktualizowano: Zainicjalizowanie selectedServices jako pustej tablicy
    const [message, setMessage] = useState('');
    const { id } = useParams();

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        setShowTextField(false);
        updateDetails();

        const dataToInsert = selectedServices.map(service => ({
            name: service.name,
            id_room: id,
            id_ticket:idTicket,
        }));

        try {
            const { data, error } = await supabase
                .from('toDoTickets')
                .insert(dataToInsert);

            if (error) {
                console.log(error);
                // Obsługa błędu
            } else {
                console.log(data);
                // Obsługa sukcesu
            }
        } catch (error) {
            console.log(error);
            // Obsługa błędu połączenia
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        const { data, error } = await supabase
            .from('dictionaryServices')
            .select();

        if (error) {
            console.log(error);
            setServices(null);
            setFetchError("Brak usług!");
        } else if (data) {
            setServices(data);
            setFetchError(null);
        }
    };

    const updateDetails = async () => {
        const{data,error}=await supabase
        .from('tickets')
        .update({'details':message})
        .eq('id',idTicket)
  };


  return (
    <div>
      {!showTextField ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p></p>
    <Button variant="contained" onClick={handleCreateTicket}  style={{ marginBottom: '10px'}} >
          Utwórz zlecenie
        </Button>
        </div>
    
      ) : (
        <form
        onSubmit={handleFormSubmit}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}
    >
        <p>Wybierz usługi, które chcesz abyśmy zrealizowali</p>
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={services}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => setSelectedServices(value)}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.name}
                </li>
            )}
            style={{ width: 250 }}
            renderInput={(params) => (
                <TextField {...params} label="Dostępne usługi" placeholder="Co mamy zrealizować?" />
            )}
        />
        <TextField
            style={{
                margin: '8px',
                width: '300px',
            }}
            label="Wiadomość"
            multiline
            rows={4}
            variant="outlined"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
        />
        <Button
            style={{
                margin: '8px',
            }}
            variant="contained"
            color="primary"
            type="submit"
        >
            Poproś o realizację
        </Button>
    </form>
      )}
    </div>
  );
};

export default ClientRequest;
