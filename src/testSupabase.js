const supabase = require('./services/supabase');

async function testConnection() {
  try {
    const { data, error } = await supabase.from('productos').select('*');
    if (error) throw error;
    console.log('Datos de productos:', data);
  } catch (err) {
    console.error('Error al conectar con Supabase:', err.message);
  }
}

testConnection();