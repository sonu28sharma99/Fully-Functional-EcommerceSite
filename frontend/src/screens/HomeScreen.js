import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fecthData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products')
        setProducts(data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fecthData();
  }, [])
  return (
    <div>
      {loading ? (<LoadingBox></LoadingBox>) :
        error ? (<MessageBox>{error}</MessageBox>) :
          (<div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
          )}
    </div>
  );
}
