import React, { useContext, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import MedicinesContext from '../context/MedicinesContext';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import '../style/App.css';
import axios from 'axios';

const FindMedicine = () => {
  const { setMedicines, setIsLoading, searchCod, 
    setSearchCod, setIsFinding, searchName, 
    setSearchName, searchDescription, setSearchDescription } = useContext(MedicinesContext);

  const findMedicineByItsCode = useCallback(async () => {
    const codeURL = `${process.env.REACT_APP_API_URL}product/${searchCod}`;
    const medicineWithTheCod = await axios.get(codeURL);
    if (medicineWithTheCod.data) {
      setMedicines([medicineWithTheCod.data]);
      setIsFinding(true);
      setIsLoading(true);
    } else {
      return alert('Produto não encontrado!');
    }
  },[searchCod, setIsFinding, setIsLoading, setMedicines]);

  const findMedicineByItsName = useCallback(async () => {
    const codeURL = `${process.env.REACT_APP_API_URL}${searchName}`;
    const medicineWithTheName = await axios.get(codeURL);
    if (medicineWithTheName.data) {
      setMedicines([medicineWithTheName.data]);
      setIsFinding(true);
      setIsLoading(true);
    } else {
      return alert('Produto não encontrado!');
    }
  },[searchName, setIsFinding, setIsLoading, setMedicines]);

  const findMedicineByItsDescription = useCallback(async () => {
    const searchDescriptionWithPlus = searchDescription.replace(/ /g, '+');
    const codeURL = `${process.env.REACT_APP_API_URL}search?q=${searchDescriptionWithPlus}`;
    const medicinesWithTheDescription = await axios.get(codeURL);
    if (medicinesWithTheDescription.data) {
      setMedicines(medicinesWithTheDescription.data);
      setIsFinding(true);
      setIsLoading(true);
    } else {
      return alert('Produto não encontrado!');
    }
  },[searchDescription, setIsFinding, setIsLoading, setMedicines]);

  return (
    <div>
      <div className="group1Wraper">
        <div className="group1">
          <TextField 
            label="Buscar pelo Código"
            type="text"
            onChange={(event) => setSearchCod(event.target.value)}
            style={{width: 250}} 
            id="outlined-basic" 
            multiline
            rows={1} 
            variant="outlined"
          />
        </div>
        <div className="btn1">
          <Button 
            variant="outlined" 
            color="primary" 
            size="small"
            startIcon={<SearchIcon />}
            onClick={ findMedicineByItsCode }
          >
          </Button>
        </div>
      </div>
      <div className="group2Wraper">
        <div className="group2">
          <TextField 
            label="Buscar pelo Nome"
            onChange={(event) => setSearchName(event.target.value)}
            style={{width: 250}} 
            id="outlined-basic" 
            multiline
            rows={1} 
            variant="outlined"
          />
        </div>
        <div className="btn2">
          <Button 
            variant="outlined" 
            color="primary" 
            size="small"
            startIcon={<SearchIcon />}
            onClick={ findMedicineByItsName }
            label="Buscar Pelo Nome"
          >
          </Button>
        </div>
      </div>
      <div className="group3Wraper">
        <div className="group3">
            <TextField 
              label="Buscar pela descrição"
              style={{width: 550}} 
              id="outlined-basic"
              multiline
              rows={4}
              variant="outlined"
              onChange={(event) => setSearchDescription(event.target.value)}
            />
        </div>
        <div className="btn3">
          <Button 
            variant="outlined" 
            color="primary" 
            size="small"
            startIcon={<SearchIcon />}
            onClick={ findMedicineByItsDescription }
            id="outlined-basic"
          >
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FindMedicine;
