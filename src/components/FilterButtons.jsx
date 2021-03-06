import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import UndoIcon from '@material-ui/icons/Undo';
import ProductContext from '../context/ProductContext';
import axios from 'axios';
import '../style/App.css';

const FilterButtons = () => {
  const { products, setProducts, minimumValue, 
          maximumValue, setIsEditing, setCod, 
          setName, setDescription, setPrice, setStock } = useContext(ProductContext);

  const filterProducts = () => {
    if (maximumValue) {
      if (Number(minimumValue) < 0 || Number(maximumValue) <= 0) {
        return alert('Não há valores negativos para estoque.');
      }
      if (Number(minimumValue) > Number(maximumValue)) {
        return alert('O valor mínimo precisa ser menor que o máximo');
      }
      const filteredProducts = products.filter((product) => {
        return minimumValue ? product.estoque >= minimumValue && product.estoque <= maximumValue 
        : product.estoque <= maximumValue;
      });
      setProducts(filteredProducts);
    } else {
      const filteredProducts = products.filter((product) => {
        return product.estoque >= minimumValue;
      });
      setProducts(filteredProducts);
    }
  }

  const reset = async () => {
    const allProducts = await axios.get(process.env.REACT_APP_API_URL).then((response) => response.data);
    setProducts(allProducts);
  }

  return (
    <div className="filterButtonsWrapper">
      <div className="filterButtons">
        <Button 
          variant="outlined" 
          color="primary" 
          size="small"
          onClick={() => filterProducts()}
          startIcon={ <FilterListIcon /> }
        >
          Filtrar
        </Button>
      </div>
      <div className="filterButtons"> 
        <Button 
          variant="outlined" 
          color="primary" 
          size="small"
          onClick={ () => {
            reset();
            setIsEditing(false);
            setCod('');
            setName('');
            setDescription('');
            setPrice(0);
            setStock('');
          }}
          startIcon={ <UndoIcon /> }
        >
          Desfazer filtros
        </Button>
      </div>
    </div>
  )
}

export default FilterButtons
