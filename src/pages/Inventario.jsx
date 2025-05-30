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
  InputAdornment,
  IconButton,
  CircularProgress,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Icono de búsqueda
import supabase from '../services/supabase';

function Inventario() {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Estado para el spinner
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add', 'edit', 'delete'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    codigo_barras: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
  });

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('productos').select('*');
        if (error) throw error;
        // Ordenar alfabéticamente por nombre
        const sorted = (data || []).sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
        setProductos(sorted);
        setFilteredProductos(sorted);
      } catch (err) {
        console.error('Error al cargar productos:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  // Filtrar productos según el término de búsqueda
  useEffect(() => {
    const filtered = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProductos(filtered);
  }, [searchTerm, productos]);

  const handleOpenModal = (type, product = null) => {
    setModalType(type);
    setSelectedProduct(product);
    if (product) {
      setFormData({
        codigo_barras: product.codigo_barras,
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        stock: product.stock,
      });
    } else {
      setFormData({
        codigo_barras: '',
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSave = async () => {
    try {
      console.log('Datos enviados:', formData); // Log para depuración
      if (modalType === 'add') {
        const { error } = await supabase.from('productos').insert([formData]);
        if (error) throw error;
      } else if (modalType === 'edit' && selectedProduct) {
        const { error } = await supabase
          .from('productos')
          .update(formData)
          .eq('id', selectedProduct.id);
        if (error) throw error;
      } else if (modalType === 'delete' && selectedProduct) {
        const { error } = await supabase
          .from('productos')
          .delete()
          .eq('id', selectedProduct.id);
        if (error) throw error;
      }
      handleCloseModal();
      // Recargar productos sin recargar la página
      const { data, error } = await supabase.from('productos').select('*');
      if (error) throw error;
      setProductos(data || []);
      setFilteredProductos(data || []);
    } catch (err) {
      console.error('Error al guardar cambios:', err.message);
      alert('Ocurrió un error al guardar los cambios.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Inventario</h2>

      {/* Spinner */}
      {loading ? (
        <CircularProgress style={{ display: 'block', margin: 'auto' }} />
      ) : (
        <>
          {/* Campo de búsqueda */}
          <TextField
            label="Buscar producto"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            style={{ marginBottom: '1rem' }}
          />

          {/* Botón para agregar producto */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal('add')}
            style={{ marginBottom: '1rem' }}
          >
            Agregar Producto
          </Button>

          {/* Tabla */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Código de Barras</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Precio</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Stock</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProductos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No hay productos disponibles.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProductos.map((producto) => (
                    <TableRow key={producto.id}>
                      <TableCell align="center">{producto.codigo_barras || '-'}</TableCell>
                      <TableCell align="center">{producto.nombre}</TableCell>
                      <TableCell align="center">{producto.descripcion}</TableCell>
                      <TableCell align="center">${producto.precio.toFixed(2)}</TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: producto.stock <= 5 ? 'red' : 'inherit',
                          fontWeight: producto.stock <= 5 ? 'bold' : 'normal',
                        }}
                      >
                        {producto.stock}
                        {producto.stock <= 5 && (
                          <Typography variant="caption" color="error">
                            {' '}
                            (Stock bajo)
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Box display="flex" flexDirection="column" gap={1}>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            onClick={() => handleOpenModal('edit', producto)}
                            style={{
                              marginBottom: '0.7rem',
                              background: 'rgba(33, 150, 243, 0.08)', // azul transparente
                              fontWeight: 'normal', // Quitar negrilla
                              fontSize: '0.9rem',   // Rebajar un punto el tamaño
                              letterSpacing: '1px',
                              minWidth: '140px',    // Botón más ancho
                            }}
                          >
                            MODIFICAR
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="large"
                            onClick={() => handleOpenModal('delete', producto)}
                            style={{
                              background: 'rgba(244, 67, 54, 0.08)', // rojo transparente
                              fontWeight: 'normal', // Quitar negrilla
                              fontSize: '0.9rem',   // Rebajar un punto el tamaño
                              letterSpacing: '1px',
                              minWidth: '100px',    // Botón más pequeño horizontalmente
                              alignSelf: 'flex-start', // Alinear a la izquierda para estilizar
                            }}
                          >
                            BORRAR
                          </Button>
                        </Box>
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
            ? 'Agregar Producto'
            : modalType === 'edit'
            ? 'Modificar Producto'
            : 'Eliminar Producto'}
        </DialogTitle>
        <DialogContent>
          {modalType !== 'delete' && (
            <>
              <TextField
                label="Código de Barras"
                value={formData.codigo_barras}
                onChange={(e) => setFormData({ ...formData, codigo_barras: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Descripción"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Precio"
                type="number"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                fullWidth
                margin="normal"
              />
            </>
          )}
          {modalType === 'delete' && (
            <Typography>¿Estás seguro de que deseas eliminar este producto?</Typography>
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

export default Inventario;