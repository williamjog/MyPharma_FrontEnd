import React, { useState } from 'react';
import MedicinesContext from './MedicinesContext';

const MedicinesProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cod, setCod] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const contextValues = {
    medicines,
    setMedicines,
    isLoading,
    setIsLoading,
    cod,
    setCod,
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    stock,
    setStock
  }

  return (
    <MedicinesContext.Provider value={ contextValues }>
      { children }
    </MedicinesContext.Provider>
  )
}

export default MedicinesProvider;