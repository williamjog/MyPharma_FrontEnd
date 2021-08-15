import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import MedicinesContext from '../context/MedicinesContext';
import axios from 'axios';

const AddMedicineButton = () => {
  const { cod, name, description, 
          price, stock,  medicines, setMedicines, 
          setIsLoading, isEditing, setIsEditing } = useContext(MedicinesContext);
  
  const addMedicine = async () => {
    if (!cod || !name || !description || price <= 0 || stock < 0) {
      return alert('Você precisa preencher todos os campos, preço não pode ser zero e estoque não pode ser negativo');
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

  const formatPrice = (currency) => {
    const model = currency.toString().replace(',', '.');
    return Number(model);
  }

  const editMedicine = async () => {
    if (!name || !description || price <= 0 || stock < 0) {
      return alert('Você precisa preencher todos os campos, preço não pode ser zero e estoque não pode ser negativo');
    }
    await axios.put(process.env.REACT_APP_API_URL, {
      cod: Number(cod),
      name,
      description,
      price: formatPrice(price),
      stock: Number(stock)
    })
    setIsEditing(false);
    setIsLoading(true);
  }
  
  return (
    <div className="addButton"> 
      <Button onClick={isEditing? editMedicine : addMedicine} variant="outlined" color="primary" size="large">
        { isEditing? <span>Confirmar</span> : <span>Adicionar</span>}
      </Button>
    </div>
  );
}

export default AddMedicineButton;