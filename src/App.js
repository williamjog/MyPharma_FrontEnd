import { useContext, useEffect } from 'react';
import LoadingAnimation from 'react-lottie-player';
import * as loading from './assets/loading.json';
import logo from './images/logo-mypharma-original.png';
import ProductCard from './components/ProductCard';
import MedicineForm from './components/MedicineForm';
import StockFilters from './components/StockInputFilters';
import FilterButtons from './components/FilterButtons';
import FindMedicine from './components/FindMedicine';
import AddOrEditMedicineButton from './components/AddOrEditMedicineButton';
import MedicinesContext from './context/MedicinesContext';
import axios from 'axios';
import './style/App.css';

const App = () => {
  const { medicines, setMedicines, isLoading, setIsLoading, isFinding } = useContext(MedicinesContext);
  
  useEffect(() => {
    const fetchMedicines = async () => {
      if (!isFinding) {
        const allMedicines = await axios.get(process.env.REACT_APP_API_URL);
        setMedicines(allMedicines.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
    fetchMedicines();
  }, [isLoading, setIsLoading, setMedicines, isFinding])

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
        <FindMedicine />
        <div className="inputNumberWrapper">
          <StockFilters />
          <FilterButtons />
        </div>
        <div className="cardWrapper"> 
          { medicines && medicines.map((medicine) => <ProductCard key={medicine.cod} medicine={medicine}/> )}
        </div>
        <MedicineForm />
        <AddOrEditMedicineButton />
      </div>
     }
    </>
  );
}

export default App;
