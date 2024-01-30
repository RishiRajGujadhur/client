import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from '../../app/api/agent';
import { getCookie } from '../../app/util/util';
import { Basket } from "../../models/basket";

export interface BasketState {
    basket: Basket | null; // Represents the current state of the basket
    status: string; // Represents the status of the async operations
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

// Async thunk to fetch the basket from the server
export const fetchBasketAsync = createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Basket.get();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    },
    {
        condition: () => {
            if (!getCookie('buyerId')) return false; // Only fetch the basket if the buyerId cookie is present
        }
    }
)

// Async thunk to add an item to the basket
export const addBasketItemAsync = createAsyncThunk<Basket, { productId: number, quantity?: number }>(
    'basket/addBasketItemAsync',
    async ({ productId, quantity = 1 }, thunkAPI) => {
        try {
            return await agent.Basket.addItem(productId, quantity);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

// Async thunk to remove an item from the basket
export const removeBasketItemAsync = createAsyncThunk<void,
    { productId: number, quantity: number, name?: string }>(
        'basket/removeBasketItemASync',
        async ({ productId, quantity }, thunkAPI) => {
            try {
                await agent.Basket.removeItem(productId, quantity);
            } catch (error: any) {
                return thunkAPI.rejectWithValue({ error: error.data })
            }
        }
    )

// Create the basket slice
export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload; // Set the basket state
        },
        clearBasket: (state) => {
            state.basket = null; // Clear the basket state
        }
    },
    extraReducers: builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingAddItem' + action.meta.arg.productId; // Set the status to indicate pending add item operation
        });
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name; // Set the status to indicate pending remove item operation
        })
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const { productId, quantity } = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity; // Update the quantity of the item in the basket
            if (state.basket?.items[itemIndex].quantity === 0)
                state.basket.items.splice(itemIndex, 1); // Remove the item from the basket if the quantity becomes zero
            state.status = 'idle'; // Set the status to idle
        });
        builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
            state.status = 'idle'; // Set the status to idle
            console.log(action.payload); // Log the error payload
        });
        builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled), (state, action) => {
            state.basket = action.payload; // Update the basket state
            state.status = 'idle'; // Set the status to idle
        });
        builder.addMatcher(isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected), (state, action) => {
            state.status = 'idle'; // Set the status to idle
            console.log(action.payload); // Log the error payload
        });
    }
})

export const { setBasket, clearBasket } = basketSlice.actions;