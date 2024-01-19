import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Product } from "../../models/product";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor:'primary.main'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: {fontWeight: 'bold', color: 'primary.main'}
                }}
                />
            <CardMedia
                sx={{ height: 140, bgcolor: 'primary.light' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h5">
                    Rs {product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} -  {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add to cart</Button>
                <Button size="small">View</Button>
            </CardActions>
        </Card>
    )
}