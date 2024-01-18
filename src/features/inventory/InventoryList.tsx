import React from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    // ... other properties
}

interface InventoryListProps {
    products: Product[];
    onEditProduct: (productId: number) => void;
    onDeleteProduct: (productId: number) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ products, onEditProduct, onDeleteProduct }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>


                </tr>


            </thead>


            <tbody>
                {products.map((product) => (
                    <tr

                        key={product.id}>


                        <td>{product.name}</td>


                        <td>{product.description}</td>


                        <td>{product.price.toFixed(2)}</td>
                        <td>{product.quantity}</td>
                        <td>
                            <button onClick={() => onEditProduct(product.id)}>Edit</button>
                            <button onClick={() => onDeleteProduct(product.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default InventoryList;