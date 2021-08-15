import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import UndoIcon from '@material-ui/icons/Undo';
import MedicinesContext from '../context/MedicinesContext';
import '../style/App.css';

const FilterButtons = () => {
  const { setIsLoading, medicines, setMedicines,
    minimumValue, maximumValue } = useContext(MedicinesContext);

  const filterMedicines = () => {
    if (minimumValue < 0  || maximumValue < 0) {
      return alert('Não há valores negativos para estoque.');
    }
    const filteredMedicines = medicines.filter((medicine) => {
      return medicine.estoque >= minimumValue && medicine.estoque <= maximumValue;
    });
    setMedicines(filteredMedicines);
  }

  return (
    <div className="filterButtonsWrapper">
      <div className="filterButtons">
        <Button 
          variant="outlined" 
          color="primary" 
          size="small"
          onClick={() => filterMedicines()}
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
          onClick={() => setIsLoading(true)}
          startIcon={ <UndoIcon /> }
        >
          Desfazer filtro
        </Button>
      </div>
    </div>
  )
}

export default FilterButtons
