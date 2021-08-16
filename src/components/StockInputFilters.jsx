import React, { useContext } from 'react';
import ProductContext from '../context/ProductContext';
import TextField from '@material-ui/core/TextField';
import '../style/App.css';

const StockFilters = () => {
  const { setMinimumValue, setMaximumValue } = useContext(ProductContext);
  return (
    <div className="stockInputWrapper">
      <div className="stockInput">
        <TextField 
          id="standard-number"
          label="Estoque Mínimo"
          type="number"
          onChange={(event) => setMinimumValue(event.target.value)}
          InputLabelProps={{ shrink: true }}
          InputProps={{ inputProps: { min: 0 } }}
        />
      </div>
      <div className="stockInput">
        <TextField 
          id="standard-number"
          label="Estoque Máximo"
          type="number"
          onChange={(event) => setMaximumValue(event.target.value)}
          InputLabelProps={{ shrink: true }}
          InputProps={{ inputProps: { min: 1 } }}
        />
      </div>
    </div>
  )
}

export default StockFilters;
