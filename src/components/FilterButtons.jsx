import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import UndoIcon from '@material-ui/icons/Undo';
import ProductContext from '../context/ProductContext';
import axios from 'axios';
import '../style/App.css';

const FilterButtons = () => {
  const { products, setProducts, minimumValue, maximumValue, setMaximumValue,
    setIsEditing, setCod, setName, setDescription, setPrice, setStock } = useContext(ProductContext);

  const filterProducts = () => {
    if (minimumValue < 0 || maximumValue <= 0 || !minimumValue || !maximumValue) {
      return alert('Não há valores negativos para estoque.');
    }
    if (!maximumValue) {
      setMaximumValue(0);
    }
    if (Number(minimumValue) > Number(maximumValue)) {
      return alert('O valor mínimo precisa ser menor que o máximo');
    }
    const filteredMedicines = products.filter((product) => {
      return product.estoque >= minimumValue && product.estoque <= maximumValue;
    });
    setProducts(filteredMedicines);
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
          startIcon={ <SearchIcon /> }
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
          Desfazer filtro
        </Button>
      </div>
    </div>
  )
}

export default FilterButtons
