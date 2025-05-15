import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Paper,
} from '@mui/material';

function Reportes() {
  // Estados para controlar la apertura de los modales
  const [openLibroDiario, setOpenLibroDiario] = useState(false);
  const [openReporteMensual, setOpenReporteMensual] = useState(false);

  // Funciones para abrir y cerrar los modales
  const handleOpenLibroDiario = () => {
    setOpenLibroDiario(true);
  };

  const handleCloseLibroDiario = () => {
    setOpenLibroDiario(false);
  };

  const handleOpenReporteMensual = () => {
    setOpenReporteMensual(true);
  };

  const handleCloseReporteMensual = () => {
    setOpenReporteMensual(false);
  };

  // Si en el futuro agregas acciones de guardado, usa el mismo patrón: actualiza el estado local tras la acción y no recargues la página.

  return (
    <Box sx={{ display: 'flex', padding: '2rem' }}>
      {/* Barra lateral izquierda con botones */}
      <Box
        sx={{
          width: 200,
          marginRight: 4,
          borderRight: '1px solid #ccc',
          paddingRight: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleOpenLibroDiario}
          sx={{ marginBottom: 2 }}
        >
          Libro Diario
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleOpenReporteMensual}
        >
          Reporte Mensual
        </Button>
      </Box>

      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4">Reportes</Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Selecciona un tipo de reporte desde la barra lateral.
        </Typography>
      </Box>

      {/* Modal para Libro Diario */}
      <Dialog open={openLibroDiario} onClose={handleCloseLibroDiario}>
        <DialogTitle>Libro Diario</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Este es el contenido del Libro Diario. Aquí puedes mostrar transacciones diarias, balances, etc.
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Modal para Reporte Mensual */}
      <Dialog open={openReporteMensual} onClose={handleCloseReporteMensual}>
        <DialogTitle>Reporte Mensual</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Este es el contenido del Reporte Mensual. Aquí puedes mostrar resúmenes mensuales, ingresos, egresos, etc.
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Reportes;