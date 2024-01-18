import React from 'react';

interface DiscountBadgeProps {
  discountPercentage: number;
  variant?: 'primary' | 'secondary' | 'success'; // Or define other variants
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({
  discountPercentage,
  variant = 'primary',
}) => {
  return (
    <span className={`discount-badge ${variant}`}>
      -{discountPercentage}%
    </span>
  );
};

export default DiscountBadge;