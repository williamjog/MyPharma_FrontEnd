import { useContext, useEffect } from 'react';
import LoadingAnimation from 'react-lottie-player';
import * as loading from './assets/loading.json';
import logo from './logo-mypharma-original.png';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MedicineForm from './components/MedicineForm';
import StockFilters from './components/StockInputFilters';
import FilterButtons from './components/FilterButtons';
import AddOrEditMedicineButton from './components/AddOrEditMedicineButton';
import MedicinesContext from './context/MedicinesContext';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './style/App.css';

const App = () => {
  const { medicines, setMedicines, isLoading, 
    setIsLoading, setIsEditing, setCod, } = useContext(MedicinesContext);
  
  useEffect(() => {
    const fetchMedicines = async () => {
      const allMedicines = await axios.get(process.env.REACT_APP_API_URL);
      setMedicines(allMedicines.data);
      setIsLoading(false);
    }
    fetchMedicines();
  }, [isLoading, setIsLoading, setMedicines])

  const useStyles = makeStyles({
    root: { minWidth: 275 },
    bullet: { display: 'inline-block', margin: '0 2px', transform: 'scale(0.8)' },
    title: { fontSize: 14 },
    pos: { marginBottom: 12 },
  });

  const classes = useStyles();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const deleteMedicine = async (medicine) => {
    setIsLoading(true);
    await axios.delete(process.env.REACT_APP_API_URL, {
      data: {
        cod: medicine.cod,
        name: medicine.nome,
        description: medicine.apresentacao,
        price: medicine.preco,
        stock: medicine.estoque
      }
    });
  }

  const formatPrice = (price) => {
    return price.toFixed(2).replace('.', ',');
  }

  return (
    <>
     { isLoading ? 
      <LoadingAnimation 
        loop
        animationData={loading}
        play
        style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', height: 400, width: 350}}
      /> : 
      <div>
        <header className="header">
          <img className="imgHeader" src={logo} alt="MyPharma Logo"/>
        </header>
        <div className="inputNumberWrapper">
          <StockFilters />
          <FilterButtons />
        </div>
        <div className="cardWrapper"> 
          { medicines.map((medicine) => 
          (
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
                        onClick={() => { setIsEditing(true); setCod(medicine.cod); }}
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
        )}
        </div>
        <MedicineForm />
        <AddOrEditMedicineButton />
      </div>
     }
    </>
  );
}

export default App;
