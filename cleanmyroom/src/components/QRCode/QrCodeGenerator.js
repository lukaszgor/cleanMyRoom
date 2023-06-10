import React from 'react';
import { saveAs } from 'file-saver';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import supabase from "../../supabaseClient";
import { useParams } from "react-router-dom";

function QrCodeGenerator() {

  const [url, setUrl] = useState(null);
  const {id} = useParams()
  const request='/clientRequest/'
  const [fullUrl, setfullUrl] = useState(null);
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
//createCorrectURL
function concatenateStrings(url, request, id) {
  const concatenatedString = url + request + id;
  return concatenatedString;
}

// let result;
  useEffect(() => {
    FetchQRcodeURL();
  }, [])


  const handleDownload = async () => {
    const result = concatenateStrings(url, request, id);
    try {
      const qrData = result;
      const qrCodeDataURL = await QRCode.toDataURL(qrData);
      const doc = new jsPDF();

      const qrImageWidth = 50 * 1.5; // Szerokość obrazka QR (px) - powiększona o 1,5 razy
      const qrImageHeight = 50 * 1.5; // Wysokość obrazka QR (px) - powiększona o 1,5 razy

      const canvasWidth = doc.internal.pageSize.getWidth();
      const canvasHeight = doc.internal.pageSize.getHeight();

      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      const text = 'W celu zamówienia sprzątania zeskanuj kod QR, a następnie wypełnij formularz';

      const availableWidth = canvasWidth - 20; // Dostępna szerokość dla tekstu - margines 10px z lewej i prawej strony

      const textLines = doc.splitTextToSize(text, availableWidth);
      const lineHeight = doc.getLineHeight();
      const totalHeight = lineHeight * textLines.length;

      let startY = centerY + qrImageHeight / 2 + 10 + totalHeight / 2; // Pozycja początkowa dla tekstu - poniżej obrazka QR

      if (startY + totalHeight / 2 > canvasHeight) {
        startY = centerY - qrImageHeight / 2 - 10 - totalHeight / 2; // Jeśli tekst przekracza dolną część strony, przenieś go powyżej obrazka QR
      }

      doc.setFontSize(16);
      doc.text(textLines, centerX, startY, {
        align: 'center',
        baseline: 'middle',
      });

      doc.addImage(qrCodeDataURL, 'JPEG', centerX - qrImageWidth / 2, centerY - qrImageHeight / 2, qrImageWidth, qrImageHeight);

      doc.save('dokument.pdf');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <Button variant="outlined" color="success" onClick={handleDownload}>Pobierz kod QR</Button>
    </div>
  );
}

export default QrCodeGenerator;
