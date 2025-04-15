import React from 'react';
import { Navigate } from 'react-router-dom';
import supabase from '../services/supabase';

function ProtectedRoute({ children }) {
  const session = supabase.auth.getSession(); // Verifica la sesión actual

  if (!session) return <Navigate to="/auth" />; // Redirige si no hay sesión
  return children;
}

export default ProtectedRoute;