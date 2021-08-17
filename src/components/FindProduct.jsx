import React, { useContext, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import ProductContext from '../context/ProductContext';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import '../style/App.css';
import axios from 'axios';

const FindProduct = () => {
  const { setProducts, setIsLoading, searchCod, 
    setSearchCod, setIsFinding, searchName, 
    setSearchName, searchDescription, setSearchDescription } = useContext(ProductContext);

  const styles = makeStyles({
    root: { minWidth: 275 },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: { fontSize: 14 },
    pos: { marginBottom: 12 },
  });

  const classes = styles();

  const findProductByItsCode = useCallback(async () => {
    const codeURL = `${process.env.REACT_APP_API_URL}product/${searchCod}`;
    const medicineWithTheCod = await axios.get(codeURL);
    if (medicineWithTheCod.data) {
      setProducts([medicineWithTheCod.data]);
      setIsFinding(true);
      setIsLoading(true);
    } else {
      return alert('Produto não encontrado!');
    }
  },[searchCod, setIsFinding, setIsLoading, setProducts]);

  const findProductByItsName = useCallback(async () => {
    const codeURL = `${process.env.REACT_APP_API_URL}${searchName}`;
    const medicineWithTheName = await axios.get(codeURL);
    if (medicineWithTheName.data) {
      setProducts([medicineWithTheName.data]);
      setIsFinding(true);
      setIsLoading(true);
    } else {
      return alert('Produto não encontrado!');
    }
  },[searchName, setIsFinding, setIsLoading, setProducts]);

  const findProductByItsDescription = useCallback(async () => {
    const searchDescriptionWithPlus = searchDescription.replace(/ /g, '+');
    const codeURL = `${process.env.REACT_APP_API_URL}search?q=${searchDescriptionWithPlus}`;
    const medicinesWithTheDescription = await axios.get(codeURL);
    if (medicinesWithTheDescription.data) {
      setProducts(medicinesWithTheDescription.data);
      setIsFinding(true);
      setIsLoading(true);
    } else {
      return alert('Produto não encontrado!');
    }
  },[searchDescription, setIsFinding, setIsLoading, setProducts]);

  const classesName = `group1Wraper ${classes.root}`;
  
  return (
    <div>
      <div className={classesName}>
        <div className="group1">
          <TextField
            label="Buscar pelo Código"
            type="text"
            onChange={(event) => setSearchCod(event.target.value)}
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
            onClick={ findProductByItsCode }
          >
          </Button>
        </div>
      </div>
      <div className="group2Wraper">
        <div className="group2">
          <TextField 
            label="Buscar pelo Nome"
            onChange={(event) => setSearchName(event.target.value)}
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
            onClick={ findProductByItsName }
            label="Buscar Pelo Nome"
          >
          </Button>
        </div>
      </div>
      <div className="group3Wraper">
        <div className="group3">
            <TextField 
              label="Buscar pela descrição"
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
            onClick={ findProductByItsDescription }
            id="outlined-basic"
          >
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FindProduct;
