import { configureStore, createAction } from '@reduxjs/toolkit';
import { basketSlice } from '../features/basket/basketSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Basket } from '../models/basket';

describe('basketSlice', () => {
    let store: any;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                basket: basketSlice.reducer,
            },
        });
    });

    test('setBasket should update the basket state', () => {
        const payload = {
            id: 1,
            name: 'Basket',
            items: ['item1', 'item2', 'item3'],
            totalPrice: 100,
        };
        store.dispatch(basketSlice.actions.setBasket(payload));

        const state = store.getState().basket;
        expect(state.basket).toEqual(payload);
    });

    test('clearBasket should set the basket state to null', () => {
        store.dispatch(basketSlice.actions.clearBasket());

        const state = store.getState().basket;
        expect(state.basket).toBeNull();
    });

    test('incrementItem should increment the quantity of an item in the basket', () => {
        interface BasketState {
            basket: null | Basket;
            status: 'idle' | 'loading' | 'succeeded' | 'failed';
            id: number;
            name: string;
            items: string[];
            totalPrice: number;
        }

        const initialState: BasketState = {
            basket: null,
            status: 'idle',
            id: 1,
            name: 'Basket',
            items: ['item1', 'item2', 'item3'],
            totalPrice: 100,
        };
        const expectedState = {
            id: 1,
            name: 'Basket',
            items: ['item1', 'item2', 'item3', 'item3'],
            totalPrice: 100,
        };

        const incrementItem = createAction<string>('basket/incrementItem');

        const state = basketSlice.reducer(initialState, incrementItem('item3'));
        expect(state).toEqual(expectedState);
    });

    test('decrementItem should decrement the quantity of an item in the basket', () => {
        interface BasketState {
            basket: null | Basket;
            status: 'idle' | 'loading' | 'succeeded' | 'failed';
            id: number;
            name: string;
            items: string[];
            totalPrice: number;
        }

        const initialState: BasketState = {
            basket: null,
            status: 'idle',
            id: 1,
            name: 'Basket',
            items: ['item1', 'item2', 'item3'],
            totalPrice: 100,
        };
        const expectedState = {
            id: 1,
            name: 'Basket',
            items: ['item1', 'item2'],
            totalPrice: 100,
        };

        const decrementItem = createAction<string>('basket/decrementItem');

        const state = basketSlice.reducer(initialState, decrementItem('item3'));
        expect(state).toEqual(expectedState);
    });

    test('calculateTotalPrice should update the totalPrice based on the items in the basket', () => {
        interface BasketState {
            basket: null | Basket;
            status: 'idle' | 'loading' | 'succeeded' | 'failed';
            id: number; // Add the 'id' property to the 'BasketState' type definition
            name: string;
            items: string[];
            totalPrice: number;
        }

        const basketSlice = createSlice({
            name: 'basket',
            initialState: {
                basket: null,
                status: 'idle',
                id: 1,
                name: 'Basket',
                items: ['item1', 'item2', 'item3'],
                totalPrice: 0,
            } as BasketState,
            reducers: {
                setBasket: (state: BasketState, action: PayloadAction<Basket>) => {
                    state.basket = action.payload;
                },
                clearBasket: (state: BasketState) => {
                    state.basket = null;
                },
                incrementItem: (state: BasketState, action: PayloadAction<string>) => {
                    const item = action.payload;
                    const index = state.items.indexOf(item);
                    if (index !== -1) {
                        state.items.splice(index, 0, item);
                    }
                },
                decrementItem: (state: BasketState, action: PayloadAction<string>) => {
                    const item = action.payload;
                    const index = state.items.indexOf(item);
                    if (index !== -1) {
                        state.items.splice(index, 1); // Remove the item from the items array
                    }
                },
                calculateTotalPrice: (state: BasketState) => {
                    // calculate total price logic
                },
            },
        });
    });
});