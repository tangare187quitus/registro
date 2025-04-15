import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Whisky', stock: 10 },
    { id: 2, nombre: 'Chocolate Negro', stock: 3 },
    { id: 3, nombre: 'Vino Tinto', stock: 7 },
  ]);

  return (
    <AppContext.Provider value={{ productos, setProductos }}>
      {children}
    </AppContext.Provider>
  );
};