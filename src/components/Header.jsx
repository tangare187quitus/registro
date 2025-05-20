import React, { useState, useEffect } from 'react';
import { IconButton, Typography, Dialog, DialogTitle, DialogContent, TextField, Button, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import logo from '../assets/images/logo.png';
import supabase from '../services/supabase'; // Importa supabase

function Header({ darkMode, toggleDarkMode }) {
  const [promo, setPromo] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [promoId, setPromoId] = useState(null);

  // Cargar promo desde la base de datos
  useEffect(() => {
    const fetchPromo = async () => {
      const { data, error } = await supabase.from('promo_marquesina').select('*').order('id', { ascending: false }).limit(1).single();
      if (!error && data) {
        setPromo(data.mensaje);
        setPromoId(data.id);
      }
    };
    fetchPromo();
  }, []);

  // Guardar promo en la base de datos
  const handleSavePromo = async () => {
    if (promoId) {
      await supabase.from('promo_marquesina').update({ mensaje: promo }).eq('id', promoId);
    } else {
      const { data } = await supabase.from('promo_marquesina').insert({ mensaje: promo }).select().single();
      setPromoId(data.id);
    }
    setOpenModal(false);
  };

  return (
    <header
      style={{
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        zIndex: 1201,
        boxShadow: darkMode
          ? '0 2px 8px rgba(0,0,0,0.7)'
          : '0 2px 8px rgba(0,0,0,0.1)',
        padding: '1.5rem 2rem 1rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: darkMode ? '#121212' : '#ffffff',
        color: darkMode ? '#ffffff' : '#000000',
        minHeight: '120px',
        boxSizing: 'border-box',
      }}
    >
      {/* Logo y Título */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: '80px',
            height: 'auto',
            marginRight: 0,
            objectFit: 'contain',
          }}
        />
        <div>
          <Typography variant="h5" style={{ margin: 0, fontWeight: 700 }}>
            TANGARÉ VINOS Y CHOCOLATES
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              margin: 0,
              fontSize: '0.9rem',
              color: darkMode ? '#cccccc' : '#666666',
              fontWeight: 400,
            }}
          >
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
          <Button variant="contained" color="primary" onClick={handleSavePromo}>
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