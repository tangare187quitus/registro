import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Box, CircularProgress, Skeleton, Typography, CssBaseline, useTheme, useMediaQuery, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  // Altura del header según el breakpoint
  const headerHeight = isMobile ? 220 : 200; // Más espacio arriba para header visible

  return (
    <Router>
      <CssBaseline />
      {/* Header arriba, sin Box fijo */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* Dashboard: Sidebar + Main, con padding-top para dejar espacio al header */}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: '100vh',
          pt: `${headerHeight}px`, // Esto baja todo el dashboard
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Sidebar */}
        {isMobile ? (
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': { width: 240 },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
              <IconButton onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Sidebar onNavigate={() => setDrawerOpen(false)} />
          </Drawer>
        ) : (
          <Box
            sx={{
              width: 240,
              flexShrink: 0,
              display: { xs: 'none', md: 'block' },
              borderRight: 1,
              borderColor: 'divider',
              minHeight: `calc(100vh - ${headerHeight}px)`,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Sidebar />
          </Box>
        )}

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 1, sm: 2, md: 3 },
            width: '100%',
            minHeight: `calc(100vh - ${headerHeight}px)`,
            backgroundColor: theme.palette.background.default,
            transition: 'padding 0.3s',
          }}
        >
          <Routes>
            <Route path="/auth" element={<Auth />} />
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
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;