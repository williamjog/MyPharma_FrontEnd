import React, { useContext } from 'react';
import ProductContext from '../context/ProductContext';
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

const ProductCard = ({ product }) => {
  const { setIsLoading, setIsEditing, setCod,
    setName, setDescription, setPrice, setStock } = useContext(ProductContext);
 
  const useStyles = makeStyles({
    root: { minWidth: 275 },
    bullet: { display: 'inline-block', margin: '0 2px', transform: 'scale(0.8)' },
    title: { fontSize: 14 },
    pos: { marginBottom: 12 },
  });

  const classes = useStyles();

  const capitalizeFirstLetter = (string) => {
    if (string) return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const formatPrice = (price) => {
    if (price) return price.toFixed(2).replace('.', ',');
  }

  const deleteProduct = async (deletedProduct) => {
    setIsLoading(true);
    await axios.delete(process.env.REACT_APP_API_URL, {
      data: {
        cod: deletedProduct.cod,
        name: deletedProduct.nome,
        description: deletedProduct.apresentacao,
        price: deletedProduct.preco,
        stock: deletedProduct.estoque
      }
    });
    setIsEditing(false);
  }

  return (
      <div className="medicineCard" key={product.cod}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                <div className="medicineTitle">
                  { capitalizeFirstLetter(product.nome) }
                </div>
              </Typography>
              <Typography variant="body2" component="p">
                { capitalizeFirstLetter(product.apresentacao) }
              </Typography>
              <Typography id="eanCod" variant="body2" component="p">
                Código EAN: {product.cod}
              </Typography>
              <Typography variant="body2" component="p">
                Preço: R$ {formatPrice(product.preco)} un.
              </Typography>
              <Typography variant="body2" component="p">
                Em estoque: {product.estoque} un.
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
                      setCod(product.cod);
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
                    onClick={() => deleteProduct(product)}
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
