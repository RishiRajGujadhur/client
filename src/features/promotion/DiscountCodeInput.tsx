import React, { useState } from 'react';

interface DiscountCodeInputProps {
  onApplyCode: (code: string) => void;
}

const DiscountCodeInput: React.FC<DiscountCodeInputProps> = ({ onApplyCode }) => {
  const [code, setCode] = useState('');

  const handleApplyCode = () => {
    onApplyCode(code);
    setCode(''); // Clear the input after applying
  };

  return (
    <div className="discount-code-input">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter discount code"
      />
      <button onClick={handleApplyCode}>Apply Code</button>
    </div>
  );
};

export default DiscountCodeInput;