import React, { useContext } from 'react';
import MedicinesContext from '../context/MedicinesContext';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import '../style/App.css';

const MedicineForm = () => {

  const { cod, setCod, setName, setDescription, 
    setPrice, setStock, isEditing } = useContext(MedicinesContext);

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

  return (
      <div className="formWrapper">
        <form className={classes.root} noValidate autoComplete="off">
          <span className="medicineAdvertsing">
            Preencha para cadastrar um novo produto
          </span>
          <div className="codAndNameInput">
            <div className="individual">
              <TextField
                style={{width: 254}} 
                id="outlined-basic" 
                required={isEditing? false : true}
                label={isEditing? cod : 'Código EAN'}
                variant="outlined"
                onChange={(event) => setCod(event.target.value)}
                disabled={isEditing}
                InputProps={{
                  readOnly: (isEditing ? true : false)
                }}
              />
            </div>
            <div className="individual">
              <TextField 
                style={{width: 254}} 
                id="outlined-basic" 
                required 
                label="Nome do Produto" 
                variant="outlined"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          </div>
          <div className="input">
            <TextField 
              style={{width: 550}} 
              id="outlined-basic" 
              required label="Descrição" 
              multiline
              rows={4} 
              variant="outlined"
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="priceAndStockInput">
            <div className="individual"> 
              <TextField 
                id="outlined-basic" 
                required 
                label="Preço" 
                variant="outlined"
                onChange={(event) => setPrice(event.target.value)}
                style={{width: 253}} 
              />
            </div>
            <div className="individual">
              <TextField 
                id="outlined-basic"
                required 
                label="Estoque"
                variant="outlined"
                onChange={(event) => setStock(event.target.value)}
                style={{width: 253}} 
              />
            </div>
          </div>
      </form>
      </div>
  )
}

export default MedicineForm;