import React, { useContext } from 'react';
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

  const findMedicineByItsCode = async () => {
    const codeURL = `${process.env.REACT_APP_API_URL}product/${searchCod}`;
    const medicineWithTheCod = await axios.get(codeURL);
    if (medicineWithTheCod.data) {
      setMedicines([medicineWithTheCod.data]);
      setIsFinding(true);
      setIsLoading(true);
    } else {
      return alert('Produto não encontrado!');
    }
  }

  const findMedicineByItsName = async () => {
    const codeURL = `${process.env.REACT_APP_API_URL}${searchName}`;
    const medicineWithTheCod = await axios.get(codeURL);
    if (medicineWithTheCod.data) {
      setMedicines([medicineWithTheCod.data]);
      setIsFinding(true);
      setIsLoading(true);
    } else {
      console.log(medicineWithTheCod)
      return alert('Produto não encontrado!');
    }
  }

  const findMedicineByItsDescription = async () => {
    const searchDescriptionWithPlus = searchDescription.replace(/ /g, '+');
    const codeURL = `${process.env.REACT_APP_API_URL}search?q=${searchDescriptionWithPlus}`;
    const medicineWithTheDescription = await axios.get(codeURL).then((response) => response.data);
    if (medicineWithTheDescription) {
      setMedicines(medicineWithTheDescription);
      setIsFinding(true);
      setIsLoading(true);
    } else {
      return alert('Produto não encontrado!');
    }
  }

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
