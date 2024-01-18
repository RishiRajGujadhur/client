import { Product } from "../../models/product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function ProductList({products}: Props){
    return (
        <ul>
        { products.map(product => (
           <ProductCard key={product.id} product={product}/>
        ))}
    </ul>
    )
}