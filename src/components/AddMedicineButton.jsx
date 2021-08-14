import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import MedicinesContext from '../context/MedicinesContext';
import axios from 'axios';

const AddMedicineButton = () => {
  const { cod, name, description, price, stock, medicines, setMedicines, setIsLoading } = useContext(MedicinesContext);

  const addMedicine = async () => {
    if (!cod || !name || !description || price === 0 || stock === 0) {
      alert('Você precisa preencher todos os campos, preço e estoque não podem ser zero!');
    }

    const doubled = medicines.find((medicine) =>  medicine.cod === Number(cod));
    
    if (doubled) {
      return alert('Código EAN já cadastrado');
    }
    
    setIsLoading(true);

    await axios.post(process.env.REACT_APP_API_URL, {
      cod: Number(cod),
      name,
      description,
      price: Number(price),
      stock: Number(stock),
    });

    setMedicines([...medicines, {
      cod: Number(cod),
      nome: name,
      apresentacao: description,
      preco: Number(price),
      estoque: Number(stock),
    }]);
  }

  return (
    <div className="addButton"> 
      <Button onClick={addMedicine} variant="contained" color="primary">
        Adicionar
      </Button>
    </div>
  );
}

export default AddMedicineButton;