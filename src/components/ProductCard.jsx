import React, { useContext } from 'react';
import MedicinesContext from '../context/MedicinesContext';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import '../style/App.css';

const ProductCard = ({ medicine }) => {
  const { setIsLoading, setIsEditing, setCod,
    setName, setDescription, setPrice, setStock } = useContext(MedicinesContext);
 
  const useStyles = makeStyles({
    root: { minWidth: 275 },
    bullet: { display: 'inline-block', margin: '0 2px', transform: 'scale(0.8)' },
    title: { fontSize: 14 },
    pos: { marginBottom: 12 },
  });

  const classes = useStyles();

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  
  const formatPrice = (price) => price.toFixed(2).replace('.', ',');

  const deleteMedicine = async (product) => {
    setIsLoading(true);
    await axios.delete(process.env.REACT_APP_API_URL, {
      data: {
        cod: product.cod,
        name: product.nome,
        description: product.apresentacao,
        price: product.preco,
        stock: product.estoque
      }
    });
    setIsEditing(false);
  }

  return (
      <div className="medicineCard" key={medicine.cod}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                <div className="medicineTitle">
                  { capitalizeFirstLetter(medicine.nome) }
                </div>
              </Typography>
              <Typography variant="body2" component="p">
                { capitalizeFirstLetter(medicine.apresentacao) }
              </Typography>
              <Typography id="eanCod" variant="body2" component="p">
                Código EAN: {medicine.cod}
              </Typography>
              <Typography variant="body2" component="p">
                Preço: R$ {formatPrice(medicine.preco)} un.
              </Typography>
              <Typography variant="body2" component="p">
                Em estoque: {medicine.estoque} un.
              </Typography>
            </CardContent>
            <CardActions>
              <div className="editAndDeleteButtonWrapper">
                <div className="editAndDeleteButton">
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => { 
                      setIsEditing(true); 
                      setCod(medicine.cod);
                      setName('');
                      setDescription('');
                      setPrice(0);
                      setStock(-1);
                    }}
                  >
                    Editar
                </Button>
                </div>
                <div className="editAndDeleteButton">
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    size="small"
                    onClick={() => deleteMedicine(medicine)}
                    startIcon={<DeleteIcon />}
                  >
                    Deletar
                  </Button>
                </div>
              </div>
            </CardActions>
          </Card>
        </div>
  )
}

export default ProductCard;
