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
        '@media (max-width: 768px)': {
          width: '0px', // Colapsar en pantallas pequeñas
        },
      }}
    >
      <h3 style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Menú</h3>
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
            }}
          >
            <ListItemText primary="Registro General" />
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
            }}
          >
            <ListItemText primary="Facturación" />
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
            }}
          >
            <ListItemText primary="Inventario" />
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
            }}
          >
            <ListItemText primary="Clientes" />
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
            }}
          >
            <ListItemText primary="Reportes" />
          </Button>
        </ListItem>
      </List>
    </aside>
  );
}

export default Sidebar;