import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import supabase from '../../supabaseClient';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function QRCodeConfig() {

  const [url, setUrl] = useState(null);

  const [error, setError] = useState('');



  //download url
  const FetchQRcodeURL = async () => {

    const { data, error } = await supabase
      .from('configQRcodeURL')
      .select('url')
      .eq('id', 1)
      .single()
    if (error) {
    } if (data) {
      setUrl(data.url)
    }
  }
  useEffect(() => {
    FetchQRcodeURL();
  }, [])

  const handleURLChange = async () => {
    const { data, error } = await supabase
      .from('configQRcodeURL')
      .upsert([{ id: 1, url }])
      .single();

    if (error) {
      // Obsłuż błąd
    } else {
      handleClickAlert();
    }
  };



  //alert configuration
  const [open, setOpen] = useState(null)

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p>Konfiguracja adresu URL do strony klienta</p>
      <TextField
        type="text"
        label="URL"
        name="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ marginBottom: '10px', width: '200px' }}
        inputProps={{ maxLength: 200 }}
        rowsMax={Infinity}
        fullWidth
        multiline
        focused
      />

      <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }} onClick={handleURLChange}>
        Zapisz
      </Button>



      <Snackbar open={open}
        autoHideDuration={2000}
        onClose={handleCloseAlert}>
        <Alert severity="success">Zaktualizowano!</Alert>
      </Snackbar>

    </div>


  );
}

export default QRCodeConfig;
