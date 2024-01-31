import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../../app/errors/NotFound';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { LoadingButton } from '@mui/lab';
import { addBasketItemAsync, removeBasketItemAsync } from '../basket/basketSlice';
import { fetchProductAsync, productSelectors } from './catalogSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import LikeButton from '../account/like/LikeButton';
import Comment from '../comment/Comment';
import { fetchCommentsForProductAsync } from "../comment/asyncThunks/fetchCommentsForProductAsync";
import CommentBox from '../comment/CommentBox';
import { setCommentParams } from '../comment/commentSlice';

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { basket, status } = useAppSelector(state => state.basket);
    const product = useAppSelector(state => productSelectors.selectById(state, parseInt(id!)));
    const { status: productStatus } = useAppSelector(state => state.catalog);
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(i => i.productId === product?.id);
    const { user } = useAppSelector(state => state.account);

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        if (!product && id) dispatch(fetchProductAsync(parseInt(id)));

        if (product?.id) {
            dispatch(setCommentParams({ pageNumber: 1, pageSize:10, productId: product.id }));
            dispatch(fetchCommentsForProductAsync(product.id));
        }
    }, [id, item, product?.id, dispatch]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        if (parseInt(event.currentTarget.value) >= 0)
            setQuantity(parseInt(event.currentTarget.value));
    }

    function handleUpdateCart() {
        if (!product) return;

        if (!item || quantity > item?.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({ productId: product.id, quantity: updatedQuantity }))
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({ productId: product.id, quantity: updatedQuantity }))
        }
    }

    if (productStatus.includes('pending')) return <LoadingComponent message='Loading product...' />

    if (!product) return <NotFound />
    return (
        <Grid>
            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h3'>{product.name}</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
                    <TableContainer>
                        <Table>
                            <TableBody sx={{ fontSize: '1.1em' }}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>{product.type}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Quantity in stock</TableCell>
                                    <TableCell>{product.quantityInStock}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container spacing={2}>
                        {user &&
                            <Grid item xs={4}>
                                <LikeButton productId={product.id} initialLiked={/* Fetch initial liked status */ false} />
                            </Grid>
                        }
                        <Grid item xs={user ? 4 : 6}>
                            <TextField
                                onChange={handleInputChange}
                                variant={'outlined'}
                                type={'number'}
                                label={'Quantity in Cart'}
                                fullWidth
                                value={quantity}
                            />
                        </Grid>
                        <Grid item xs={user ? 4 : 6}>
                            <LoadingButton
                                disabled={item?.quantity === quantity || !item && quantity === 0}
                                loading={status.includes('pending')}
                                onClick={handleUpdateCart}
                                sx={{ height: '55px' }}
                                color={'primary'}
                                size={'large'}
                                variant={'contained'}
                                fullWidth>
                                {item ? 'Update Quantity' : 'Add to Cart'}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid> 
            </Grid>
            <Grid item xs={12}> 
                { !user &&  <Typography variant='h6' sx={{ mb: 2 }}>Sign in to leave a comment.</Typography>}
                { user && <CommentBox productId={product.id}/> }
                <Divider sx={{ mb: 2 }} />
                <Comment productId={product.id} />
            </Grid>
        </Grid>
    )
}
