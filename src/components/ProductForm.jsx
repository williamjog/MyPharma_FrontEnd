import React, { useContext } from 'react';
import ProductContext from '../context/ProductContext';
import TextField from '@material-ui/core/TextField';
import ProductFormStyles from '../style/ProductFormStyles';
import '../style/App.css';

const ProductForm = () => {
  const { cod, setCod, setName, setDescription, 
    setPrice, setStock, isEditing } = useContext(ProductContext);

  const classes = ProductFormStyles();

  return (
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <span className="medicineAdvertsing" id="frase">
            Preencha para cadastrar ou editar um produto
          </span>
          <div className="individual">
            <TextField
              id="outlined-basic" 
              required={isEditing? false : true}
              label={isEditing? cod : 'Código'}
              variant="outlined"
              onChange={(event) => setCod(event.target.value)}
              disabled={isEditing}
              InputProps={{ readOnly: (isEditing ? true : false) }}
            />
          </div>
          <div className="individual">
            <TextField 
              id="outlined-basic" 
              required 
              label="Nome" 
              variant="outlined"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="individual">
            <TextField
              id="outlined-basic" 
              required label="Descrição" 
              multiline
              rows={4}
              variant="outlined"
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="individual"> 
            <TextField 
              id="outlined-basic" 
              required 
              label="Preço" 
              variant="outlined"
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className="individual">
            <TextField 
              id="outlined-basic"
              required 
              label="Estoque"
              variant="outlined"
              onChange={(event) => setStock(event.target.value)}
            />
          </div>
      </form>
    </div>
  )
}

export default ProductForm;