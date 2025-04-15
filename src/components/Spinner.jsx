import React from 'react';
import { CircularProgress } from '@mui/material';

function Spinner() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#1e1e2f',
        color: '#ffffff',
      }}
    >
      <CircularProgress size={80} thickness={4} sx={{ color: '#ff5722' }} />
      <p style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>Cargando...</p>
    </div>
  );
}

export default Spinner;