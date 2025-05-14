import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Receipt as FacturacionIcon,
  Inventory as InventarioIcon,
  People as ClientesIcon,
  BarChart as ReportesIcon,
} from '@mui/icons-material';

function Sidebar() {
  return (
    <aside
      style={{
        width: '250px', // Ancho fijo del sidebar
        backgroundColor: '#1e1e2f',
        color: '#ffffff',
        padding: '1rem',
        height: '100vh',
        position: 'fixed', // Fijo en la pantalla
        overflowY: 'auto', // Scroll si es necesario
        paddingTop: '3.5rem', // Baja la palabra Menú
        '@media (max-width: 768px)': {
          width: '0px', // Colapsar en pantallas pequeñas
        },
      }}
    >
      <h3 style={{ marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px' }}>Menú</h3>
      <List>
        <ListItem disablePadding>
          <Button
            component={Link}
            to="/"
            startIcon={<DashboardIcon />}
            style={{
              color: '#ffffff',
              textTransform: 'none',
              justifyContent: 'flex-start',
              width: '100%',
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '0.9rem 0.7rem', // Aumenta el tamaño del botón
              borderRadius: '18px', // Más redondeado
            }}
          >
            <ListItemText primary={<span style={{ fontSize: '14px', fontWeight: 'bold' }}>Registro General</span>} />
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button
            component={Link}
            to="/facturacion"
            startIcon={<FacturacionIcon />}
            style={{
              color: '#ffffff',
              textTransform: 'none',
              justifyContent: 'flex-start',
              width: '100%',
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '0.9rem 0.7rem',
              borderRadius: '18px',
            }}
          >
            <ListItemText primary={<span style={{ fontSize: '14px', fontWeight: 'bold' }}>Facturación</span>} />
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button
            component={Link}
            to="/inventario"
            startIcon={<InventarioIcon />}
            style={{
              color: '#ffffff',
              textTransform: 'none',
              justifyContent: 'flex-start',
              width: '100%',
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '0.9rem 0.7rem',
              borderRadius: '18px',
            }}
          >
            <ListItemText primary={<span style={{ fontSize: '14px', fontWeight: 'bold' }}>Inventario</span>} />
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button
            component={Link}
            to="/clientes"
            startIcon={<ClientesIcon />}
            style={{
              color: '#ffffff',
              textTransform: 'none',
              justifyContent: 'flex-start',
              width: '100%',
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '0.9rem 0.7rem',
              borderRadius: '18px',
            }}
          >
            <ListItemText primary={<span style={{ fontSize: '14px', fontWeight: 'bold' }}>Clientes</span>} />
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button
            component={Link}
            to="/reportes"
            startIcon={<ReportesIcon />}
            style={{
              color: '#ffffff',
              textTransform: 'none',
              justifyContent: 'flex-start',
              width: '100%',
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '0.9rem 0.7rem',
              borderRadius: '18px',
            }}
          >
            <ListItemText primary={<span style={{ fontSize: '14px', fontWeight: 'bold' }}>Reportes</span>} />
          </Button>
        </ListItem>
      </List>
    </aside>
  );
}

export default Sidebar;