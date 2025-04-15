import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalFacturacion({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Facturación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Aquí puedes gestionar la facturación.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalFacturacion;