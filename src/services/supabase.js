import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const SUPABASE_URL = 'https://powkasxabbzbmvrzgtlb.supabase.co'; // URL del proyecto
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvd2thc3hhYmJ6Ym12cnpndGxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MjY5MzksImV4cCI6MjA2MDAwMjkzOX0.0RyQRWtxcXZoT2e5D17hvSXUDyfdIuL7R7ebGsyrYrY'; // Clave pública

// Crear el cliente de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;