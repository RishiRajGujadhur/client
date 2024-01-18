import { Product } from "../../models/product";

interface Props {
    product: Product;
}

export default function ProductCard({product}: Props){
    return (
        <li key={product.id}>{product.name} - {product.price}</li>
    )
}