import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Box, CircularProgress, Skeleton, Typography, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Inicio from './pages/Inicio';
import Facturacion from './pages/Facturacion';
import Inventario from './pages/Inventario';
import Clientes from './pages/Clientes';
import Reportes from './pages/Reportes';
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import supabase from './services/supabase';

function App({ darkMode, toggleDarkMode }) {
  const [loading, setLoading] = useState(true); // Estado para el spinner
  const [showSkeleton, setShowSkeleton] = useState(false); // Estado para el skeleton

  useEffect(() => {
    // Simular carga inicial (puedes reemplazar esto con una llamada real a Supabase)
    const loadData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulación de carga
      setLoading(false);
      setShowSkeleton(true);

      await new Promise((resolve) => setTimeout(resolve, 1500)); // Tiempo del skeleton
      setShowSkeleton(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        textAlign="center"
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" mt={2}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (showSkeleton) {
    return (
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar Skeleton */}
        <Box sx={{ width: 250, backgroundColor: '#f5f5f5', padding: 2 }}>
          <Skeleton
            variant="rectangular"
            height={50}
            sx={{ mb: 2, borderRadius: 2 }}
          />
          <Skeleton
            variant="rectangular"
            height={30}
            sx={{ mb: 2, borderRadius: 2 }}
          />
          <Skeleton
            variant="rectangular"
            height={30}
            sx={{ mb: 2, borderRadius: 2 }}
          />
          <Skeleton
            variant="rectangular"
            height={30}
            sx={{ borderRadius: 2 }}
          />
        </Box>

        {/* Contenido principal Skeleton */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Skeleton
            variant="rectangular"
            height={50}
            sx={{ mb: 2, borderRadius: 2 }}
          />
          <Skeleton
            variant="rectangular"
            height={200}
            sx={{ mb: 2, borderRadius: 2 }}
          />
          <Skeleton
            variant="rectangular"
            height={100}
            sx={{ borderRadius: 2 }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Router>
      <CssBaseline /> {/* Asegura estilos consistentes */}
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Contenido principal */}
        <Box sx={{ flexGrow: 1, marginLeft: '250px', p: 3 }}>
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            {/* Ruta pública para autenticación */}
            <Route path="/auth" element={<Auth />} />

            {/* Rutas protegidas */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Inicio />
                </ProtectedRoute>
              }
            />
            <Route
              path="/facturacion"
              element={
                <ProtectedRoute>
                  <Facturacion />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inventario"
              element={
                <ProtectedRoute>
                  <Inventario />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clientes"
              element={
                <ProtectedRoute>
                  <Clientes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reportes"
              element={
                <ProtectedRoute>
                  <Reportes />
                </ProtectedRoute>
              }
            />

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;