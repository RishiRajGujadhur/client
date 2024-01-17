import { useEffect, useState } from 'react';
import Catalog from '../../features/catalogue/Catalogue';
import { Product } from '../../models/product';


function App() {
  const [productsVariable, setProducts] = useState<Product[]>([]);


  useEffect(() => { 
    fetch('localhost:5000/api/products')
    .then(response => response.json())
    .then(data => setProducts(data))
  })


  function addProduct() {
    setProducts(prevState => [...prevState, {
      id: prevState.length + 101,
      name: 'Nike Air' + (prevState.length + 1),
      price: 100,
      brand: 'Nike',
      description: 'Shoe brand',
      pictureUrl: 'http:picsum.photos/200'
    }])
  }


  return (
    <div>
      <h1>Store</h1>
      <Catalog products={productsVariable} addProduct={addProduct} />
    </div>
  );
}

export default App;
