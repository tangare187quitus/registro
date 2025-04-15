import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';

function PromoModal({ open, onClose, onSave }) {
  const [promo, setPromo] = useState('');

  const handleSave = () => {
    onSave(promo);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Promoción</DialogTitle>
      <DialogContent>
        <TextField
          label="Promoción"
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          fullWidth
          style={{ marginBottom: '1rem' }}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Guardar
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default PromoModal;