import React from 'react';
import ProductCardWithPromo from './ProductCardWithPromo';
import { Product } from '../../models/product';
 

const FeaturedProducts = () => {
  const products: Product[] = [
    { id: 1, 
    name: 'Product 1', 
    price: 100,
    brand: 'Nike',
    description: 'Shoe brand',
    pictureUrl: 'http:picsum.photos/200',
    discountPercentage: 0
    }
  ];

  const handleApplyCode = (code: string) => {
    // TODO: Implement discount code application logic here
    console.log('Applying discount code:', code);
    // Update product prices or cart totals based on the applied code
  };

  return (
    <section className="featured-products">
      <h2>Featured Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCardWithPromo key={product.id} product={product} onApplyCode={handleApplyCode} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;