import React, { useState } from 'react';
import ProductContext  from './ProductContext';

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cod, setCod] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [minimumValue, setMinimumValue] = useState(0);
  const [maximumValue, setMaximumValue] = useState(0);
  const [searchCod, setSearchCod] = useState(undefined);
  const [isFinding, setIsFinding] = useState(false);
  const [searchName, setSearchName] = useState(undefined);
  const [searchDescription, setSearchDescription] = useState(undefined);

  const contextValues = {
    products,
    setProducts,
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
    setStock,
    isEditing,
    setIsEditing,
    minimumValue,
    setMinimumValue,
    maximumValue,
    setMaximumValue,
    searchCod,
    setSearchCod,
    isFinding,
    setIsFinding,
    searchName,
    setSearchName,
    searchDescription,
    setSearchDescription
  }

  return (
    <ProductContext.Provider value={ contextValues }>
      { children }
    </ProductContext.Provider >
  )
}

export default ProductProvider;