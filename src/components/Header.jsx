import React, { useState } from 'react';
import { IconButton, Typography, Dialog, DialogTitle, DialogContent, TextField, Button, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import logo from '../assets/images/logo.png';

function Header({ darkMode, toggleDarkMode }) {
  const [promo, setPromo] = useState('🎉 PROMOCIÓN DE LA SEMANA: VINO CATADOR - Llévalo por solo $3.99 🎉');
  const [openModal, setOpenModal] = useState(false);

  return (
    <header
      style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: darkMode ? '#121212' : '#ffffff',
        color: darkMode ? '#ffffff' : '#000000',
      }}
    >
      {/* Logo y Título */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: '100px',
            marginRight: '1rem',
          }}
        />
        <div>
          <Typography variant="h4" style={{ margin: 0 }}>
            TANGARÉ VINOS Y CHOCOLATES
          </Typography>
          <Typography variant="subtitle1" style={{ margin: 0, fontSize: '0.8rem', color: darkMode ? '#cccccc' : '#666666' }}>
            Local 187 Centro Comercial Quitus, Quito - Ecuador
          </Typography>
        </div>
      </div>

      {/* Marquesina */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          marginTop: '1rem',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            animation: 'marquee 15s linear infinite',
            background: 'linear-gradient(90deg, #ff5722, #ff9800)',
            color: '#ffffff',
            padding: '0.5rem',
            borderRadius: '5px',
          }}
        >
          {promo}
        </div>
      </div>

      {/* Botones horizontales (alineados a la derecha) */}
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1rem',
          alignSelf: 'flex-end',
        }}
      >
        {/* Modo oscuro/claro */}
        <IconButton onClick={toggleDarkMode}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        {/* Editar Promoción */}
        <IconButton onClick={() => setOpenModal(true)}>
          <EditIcon />
        </IconButton>

        {/* Ajustes */}
        <IconButton>
          <SettingsIcon />
        </IconButton>

        {/* WhatsApp */}
        <IconButton
          href="https://api.whatsapp.com/send?phone=593998741295&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20productos%20de%20la%20licoreria.%20GRACIAS."
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            '&:hover': {
              animation: 'whatsapp-bounce 1s infinite',
            },
          }}
        >
          <WhatsAppIcon sx={{ fontSize: '2rem', color: '#25D366' }} />
        </IconButton>
      </Box>

      {/* Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        PaperProps={{
          style: {
            width: '500px',
            maxWidth: '90vw',
          },
        }}
      >
        <DialogTitle>Editar Promoción</DialogTitle>
        <DialogContent>
          <TextField
            label="Promoción"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            fullWidth
            multiline
            rows={4}
            style={{ marginBottom: '1rem' }}
          />
          <Button variant="contained" color="primary" onClick={() => setOpenModal(false)}>
            Guardar
          </Button>
        </DialogContent>
      </Dialog>
    </header>
  );
}

// Animación de la marquesina
const styles = `
  @keyframes marquee {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateX(-100%);
      opacity: 0;
    }
  }

  @keyframes whatsapp-bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Header;