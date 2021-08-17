import { useContext, useEffect } from 'react';
import LoadingAnimation from 'react-lottie-player';
import * as loading from './assets/loading.json';
import logo from './images/logo-mypharma-original.png';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';
import StockFilters from './components/StockInputFilters';
import FilterButtons from './components/FilterButtons';
import FindProduct from './components/FindProduct';
import AddOrEditProductButton from './components/AddOrEditProductButton';
import ProductContext from './context/ProductContext';
import axios from 'axios';
import './style/App.css';

const App = () => {
  const { products, setProducts, isLoading, setIsLoading, isFinding } = useContext(ProductContext);
  
  useEffect(() => {
    const fetchProducts = async () => {
      if (!isFinding) {
        const allMedicines = await axios.get(process.env.REACT_APP_API_URL);
        setProducts(allMedicines.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [isLoading, setIsLoading, setProducts, isFinding])

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
        <FindProduct />
        <div className="numericFilter">
          <StockFilters />
        </div>
        <div className="inputNumberWrapper">
          <FilterButtons /> 
        </div>
        <div className="cardWrapper"> 
          { products && products.map((product) => <ProductCard key={product.cod} product={product}/> )}
        </div>
        <ProductForm />
        <AddOrEditProductButton />
      </div>
     }
    </>
  );
}

export default App;
