import React, { useState } from 'react';
import supabase from '../services/supabase';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      window.location.href = '/'; // Redirige al dashboard
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  const handleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      alert('Registro exitoso. Verifica tu correo electrónico.');
    } catch (err) {
      setError(err.message || 'Error al registrarse');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Autenticación</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar Sesión</button>
      <button onClick={handleSignUp}>Registrarse</button>
    </div>
  );
}

export default Auth;