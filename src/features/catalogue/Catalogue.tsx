import { Product } from "../../models/product";
import ProductList from "./ProductList";


interface Props {
    products: Product[];
    addProduct: () => void;
}


export default function Catalog({ products, addProduct }: Props) {
    return (
        <>
            <ProductList products={products}/>
            <button onClick={addProduct}>+ Product</button>
        </>
    )
}