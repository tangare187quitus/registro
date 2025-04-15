import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  Box,
  CircularProgress, // Importar CircularProgress
} from '@mui/material';
import supabase from '../services/supabase';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para el spinner
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add', 'edit', 'delete'
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    telefono: '',
    email: '',
    direccion: '',
  });

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true); // Activar el spinner
        const { data, error } = await supabase.from('clientes').select('*');
        if (error) throw error;
        setClientes(data || []);
      } catch (err) {
        console.error('Error al cargar clientes:', err.message);
      } finally {
        setLoading(false); // Desactivar el spinner
      }
    };
    fetchClientes();
  }, []);

  const handleOpenModal = (type, cliente = null) => {
    setModalType(type);
    setSelectedCliente(cliente);
    if (cliente) {
      setFormData({
        nombre: cliente.nombre,
        cedula: cliente.cedula,
        telefono: cliente.telefono,
        email: cliente.email,
        direccion: cliente.direccion,
      });
    } else {
      setFormData({
        nombre: '',
        cedula: '',
        telefono: '',
        email: '',
        direccion: '',
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSave = async () => {
    try {
      if (modalType === 'add') {
        const { error } = await supabase.from('clientes').insert([formData]);
        if (error) throw error;
      } else if (modalType === 'edit' && selectedCliente) {
        const { error } = await supabase
          .from('clientes')
          .update(formData)
          .eq('id', selectedCliente.id);
        if (error) throw error;
      } else if (modalType === 'delete' && selectedCliente) {
        const { error } = await supabase
          .from('clientes')
          .delete()
          .eq('id', selectedCliente.id);
        if (error) throw error;
      }
      handleCloseModal();
      window.location.reload(); // Recargar la página para reflejar los cambios
    } catch (err) {
      console.error('Error al guardar cambios:', err.message);
      alert('Ocurrió un error al guardar los cambios.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Clientes</h2>

      {/* Spinner */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Botón para agregar cliente */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal('add')}
            style={{ marginBottom: '1rem' }}
          >
            Agregar Cliente
          </Button>

          {/* Tabla */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Cédula</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Dirección</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No hay clientes disponibles.
                    </TableCell>
                  </TableRow>
                ) : (
                  clientes.map((cliente) => (
                    <TableRow key={cliente.id}>
                      <TableCell align="center">{cliente.nombre}</TableCell>
                      <TableCell align="center">{cliente.cedula}</TableCell>
                      <TableCell align="center">{cliente.telefono || 'N/A'}</TableCell>
                      <TableCell align="center">{cliente.email || 'N/A'}</TableCell>
                      <TableCell align="center">{cliente.direccion || 'N/A'}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleOpenModal('edit', cliente)}
                          style={{ marginRight: '0.5rem' }}
                        >
                          Modificar
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleOpenModal('delete', cliente)}
                        >
                          Borrar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          {modalType === 'add'
            ? 'Agregar Cliente'
            : modalType === 'edit'
            ? 'Modificar Cliente'
            : 'Eliminar Cliente'}
        </DialogTitle>
        <DialogContent>
          {modalType !== 'delete' && (
            <>
              <TextField
                label="Nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Cédula"
                value={formData.cedula}
                onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Teléfono"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Dirección"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                fullWidth
                margin="normal"
              />
            </>
          )}
          {modalType === 'delete' && (
            <Typography>¿Estás seguro de que deseas eliminar este cliente?</Typography>
          )}

          {/* Botones alineados horizontalmente */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              style={{ marginRight: '1rem' }}
            >
              Guardar
            </Button>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancelar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Clientes;