import React from 'react';
import DiscountBadge from './DiscountBadge';
import DiscountCodeInput from './DiscountCodeInput';
import { Product } from '../../models/product';

interface ProductCardWithPromoProps {
  product: Product;
  onApplyCode: (code: string) => void;
}

const ProductCardWithPromo: React.FC<ProductCardWithPromoProps> = ({
  product,
  onApplyCode,
}) => {
  return (
    <div className="product-card">
      {/* Product image, title, price, etc. */}
      {product.discountPercentage > 0 && (
        <DiscountBadge discountPercentage={product.discountPercentage} />
      )}
      <DiscountCodeInput onApplyCode={onApplyCode} />
    </div>
  );
};

export default ProductCardWithPromo;