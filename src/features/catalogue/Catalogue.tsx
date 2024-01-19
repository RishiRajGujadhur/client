import { useEffect, useState } from "react";
import { Product } from "../../models/product";
import ProductList from "./ProductList";

export default function Catalog() {
    const [productsVariable, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        fetch('http://localhost:5001/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])
    
    return (
        <>
            <ProductList products={productsVariable} /> 
        </>
    )
}