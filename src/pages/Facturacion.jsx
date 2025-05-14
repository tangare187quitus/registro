import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Icono para eliminar productos
import supabase from '../services/supabase';

function Facturacion() {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedProductos, setSelectedProductos] = useState([]);
  const [searchCliente, setSearchCliente] = useState('');
  const [searchProducto, setSearchProducto] = useState('');
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [openModal, setOpenModal] = useState(false); // Estado para el modal
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    telefono: '',
    email: '',
    direccion: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      // Cargar clientes
      const { data: clientesData, error: clientesError } = await supabase.from('clientes').select('*');
      if (clientesError) console.error('Error al cargar clientes:', clientesError.message);
      else setClientes(clientesData || []);

      // Cargar productos
      const { data: productosData, error: productosError } = await supabase.from('productos').select('*');
      if (productosError) console.error('Error al cargar productos:', productosError.message);
      else setProductos(productosData || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filtrar clientes según el término de búsqueda
    const filtered = clientes.filter((cliente) =>
      cliente.nombre.toLowerCase().includes(searchCliente.toLowerCase())
    );
    setFilteredClientes(filtered);
  }, [searchCliente, clientes]);

  useEffect(() => {
    // Filtrar productos según el término de búsqueda
    const filtered = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(searchProducto.toLowerCase())
    );
    setFilteredProductos(filtered);
  }, [searchProducto, productos]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({
      nombre: '',
      cedula: '',
      telefono: '',
      email: '',
      direccion: '',
    });
  };

  const handleSaveCliente = async () => {
    try {
      if (!formData.nombre || !formData.cedula) {
        alert('El nombre y la cédula son obligatorios.');
        return;
      }
      const { error } = await supabase.from('clientes').insert([formData]);
      if (error) throw error;
      alert('Cliente agregado exitosamente.');
      handleCloseModal();
      // Recargar clientes sin recargar la página
      const { data, error: fetchError } = await supabase.from('clientes').select('*');
      if (fetchError) throw fetchError;
      setClientes(data || []);
    } catch (err) {
      console.error('Error al agregar cliente:', err.message);
      alert('Ocurrió un error al agregar el cliente.');
    }
  };

  const handleSeleccionarCliente = (cliente) => {
    setSelectedCliente(cliente);
    setSearchCliente(cliente.nombre); // Mostrar el nombre del cliente en el campo de búsqueda
    setFilteredClientes([]); // Limpiar resultados filtrados
  };

  const handleAgregarProducto = (producto) => {
    const productoExistente = selectedProductos.find((p) => p.id === producto.id);
    if (productoExistente) {
      setSelectedProductos(
        selectedProductos.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      );
    } else {
      setSelectedProductos([...selectedProductos, { ...producto, cantidad: 1 }]);
    }
    setSearchProducto(''); // Limpiar el campo de búsqueda
    setFilteredProductos([]); // Limpiar resultados filtrados
  };

  const handleModificarCantidad = (id, cantidad) => {
    setSelectedProductos(
      selectedProductos.map((p) =>
        p.id === id ? { ...p, cantidad: cantidad > 0 ? cantidad : 1 } : p
      )
    );
  };

  const handleEliminarProducto = (id) => {
    setSelectedProductos(selectedProductos.filter((p) => p.id !== id));
  };

  const handleImprimirFactura = async () => {
    if (!selectedCliente) {
      alert('Debes seleccionar un cliente antes de imprimir la factura.');
      return;
    }

    const total = selectedProductos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

    try {
      // Guardar la factura en la base de datos
      const { error } = await supabase.from('facturas_guardadas').insert([
        {
          cliente_id: selectedCliente.id,
          productos: selectedProductos.map((p) => ({
            nombre: p.nombre,
            cantidad: p.cantidad,
            precio_unitario: p.precio,
          })),
          total,
        },
      ]);
      if (error) throw error;

      // Mostrar la factura en la pantalla
      alert('Factura guardada exitosamente.');
      generarFacturaPDF();
    } catch (err) {
      console.error('Error al guardar la factura:', err.message);
      alert('Ocurrió un error al guardar la factura.');
    }
  };

  const generarFacturaPDF = () => {
    const total = selectedProductos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

    const facturaHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 10px; max-width: 600px; margin: auto;">
        <h1 style="text-align: center;">Factura</h1>
        <p><strong>Cliente:</strong> ${selectedCliente.nombre}</p>
        <p><strong>Cédula:</strong> ${selectedCliente.cedula}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Producto</th>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Cantidad</th>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Precio Unitario</th>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${selectedProductos
              .map(
                (p) => `
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">${p.nombre}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">${p.cantidad}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">$${p.precio.toFixed(2)}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">$${(p.precio * p.cantidad).toFixed(2)}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="text-align: right; padding: 8px;"><strong>Total:</strong></td>
              <td style="border: 1px solid #ccc; padding: 8px;">$${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Factura</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
          </style>
        </head>
        <body>
          ${facturaHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Facturación</h2>

      {/* Campo de búsqueda de cliente */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 1 }}>
        <TextField
          label="Buscar Cliente"
          value={searchCliente}
          onChange={(e) => setSearchCliente(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Agregar Cliente
        </Button>
      </Box>

      {filteredClientes.length > 0 && (
        <Box sx={{ border: '1px solid #ccc', maxHeight: '150px', overflowY: 'auto', marginTop: 1 }}>
          {filteredClientes.map((cliente) => (
            <Box
              key={cliente.id}
              sx={{
                padding: '8px',
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
              onClick={() => handleSeleccionarCliente(cliente)}
            >
              {cliente.nombre} ({cliente.cedula})
            </Box>
          ))}
        </Box>
      )}

      {/* Modal para agregar cliente */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Agregar Cliente</DialogTitle>
        <DialogContent>
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveCliente}
            style={{ marginTop: '1rem' }}
          >
            Guardar Cliente
          </Button>
        </DialogContent>
      </Dialog>

      {/* Separación adicional entre clientes y productos */}
      <Box sx={{ marginTop: 4 }} />

      {/* Campo de búsqueda de producto */}
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Buscar Producto"
          value={searchProducto}
          onChange={(e) => setSearchProducto(e.target.value)}
          fullWidth
        />
        {filteredProductos.length > 0 && (
          <Box sx={{ border: '1px solid #ccc', maxHeight: '150px', overflowY: 'auto', marginTop: 1 }}>
            {filteredProductos.map((producto) => (
              <Box
                key={producto.id}
                sx={{
                  padding: '8px',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                }}
                onClick={() => handleAgregarProducto(producto)}
              >
                {producto.nombre} (${producto.precio.toFixed(2)})
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Resumen de la factura */}
      <h3>Resumen de la Factura</h3>
      {selectedCliente && (
        <Typography variant="body1">
          <strong>Cliente:</strong> {selectedCliente.nombre} ({selectedCliente.cedula})
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio Unitario</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedProductos.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={producto.cantidad}
                    onChange={(e) => handleModificarCantidad(producto.id, parseInt(e.target.value))}
                    inputProps={{ min: 1 }}
                    sx={{ width: '60px' }}
                  />
                </TableCell>
                <TableCell>${producto.precio.toFixed(2)}</TableCell>
                <TableCell>${(producto.precio * producto.cantidad).toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleEliminarProducto(producto.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <tfoot>
            <TableRow>
              <TableCell colSpan={3} align="right">
                <strong>Total:</strong>
              </TableCell>
              <TableCell colSpan={2}>
                <strong>
                  $
                  {selectedProductos
                    .reduce((acc, p) => acc + p.precio * p.cantidad, 0)
                    .toFixed(2)}
                </strong>
              </TableCell>
            </TableRow>
          </tfoot>
        </Table>
      </TableContainer>

      {/* Botón Imprimir */}
      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" color="success" onClick={handleImprimirFactura}>
          Imprimir Factura
        </Button>
      </Box>
    </div>
  );
}

export default Facturacion;