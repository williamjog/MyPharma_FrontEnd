import { useContext, useEffect } from 'react';
import LoadingImage from 'react-lottie';
import * as loading from './loading.json';
import logo from './logo-mypharma-original.png';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MedicineForm from './components/MedicineForm';
import AddMedicineButton from './components/AddMedicineButton';
import MedicinesContext from './context/MedicinesContext';
import axios from 'axios';
import './App.css';

const App = () => {
  const { medicines, isLoading, setMedicines, setIsLoading } = useContext(MedicinesContext);

  useEffect(() => {
    const fetchMedicines = async () => {
      const allMedicines = await axios.get(process.env.REACT_APP_API_URL);
      setMedicines(allMedicines.data);
      setIsLoading(false);
    }
    fetchMedicines();
  }, [isLoading, setIsLoading, setMedicines])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
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
    <div>
     { isLoading ? 
      <LoadingImage 
        options={defaultOptions} 
        style={{  position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        height={400} 
        width={350}
      /> : 
      <div>
        <div className="header">
          <img className="imgHeader" src={logo} alt="logo"/>
        </div>
        <div className="cardWrapper"> 
          { medicines.map((medicine) => (
            <div className="medicineCard" key={medicine.cod}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    <div className="medicineTitle">
                    {capitalizeFirstLetter(medicine.nome)}
                    </div>
                  </Typography>
                  <Typography variant="body2" component="p">
                    {capitalizeFirstLetter(medicine.apresentacao)}.
                  </Typography>
                  <Typography variant="body2" component="p">
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
                  <Button variant="contained" color="primary" size="small">Editar</Button>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    size="small"
                    onClick={() => deleteMedicine(medicine)}
                  >
                    Deletar
                  </Button>
                </CardActions>
              </Card>
            </div>
        )
        )}
        </div>
        < MedicineForm />
        < AddMedicineButton />
      </div>
     }
    </div>
  );
}

export default App;
