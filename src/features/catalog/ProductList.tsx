import { Grid } from "@mui/material"; 
import ProductCard from "./ProductCard"; 
import ProductCardSkeleton from './ProductCardSkeleton';
import { useAppSelector } from "../../app/store/ConfigureStore";
import { Product } from "../../models/product";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    const { productsLoaded } = useAppSelector(state => state.catalog);
    return (
        <Grid container spacing={4}>
            {products.map(product => (
                <Grid item xs={4} key={product.id}>
                    {!productsLoaded ? (
                        <ProductCardSkeleton />
                    ) : (
                        <ProductCard product={product} />
                    )}
                </Grid>
            ))}
        </Grid>
    )
}