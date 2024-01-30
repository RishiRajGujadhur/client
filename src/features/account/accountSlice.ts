import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from 'react-hook-form';
import agent from '../../app/api/agent';
import { router } from '../../app/router/Routes';
import { toast } from 'react-toastify';
import { setBasket } from '../basket/basketSlice';
import { User } from "../../models/user";

// Define the shape of the account state
interface AccountState {
    user: User | null
}

// Set the initial state of the account slice
const initialState: AccountState = {
    user: null
}

// Create an async thunk for signing in a user
export const signInUser = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkAPI) => {
        try {
            const userDto = await agent.Account.login(data);
            const {basket, ...user} = userDto;
            if (basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

// Create an async thunk for fetching the current user
export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)))
        try {
            const userDto = await agent.Account.currentUser();
            const {basket, ...user} = userDto;
            if (basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }, 
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)

// Create the account slice
export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        // Reducer for signing out a user
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/');
        },
        // Reducer for setting the user
        setUser: (state, action) => {
            const claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            const roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            state.user = {...action.payload, roles: typeof(roles) === 'string' ? [roles] : roles};
        }
    },
    extraReducers: (builder => {
        // Handle the case when fetching the current user is rejected
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Session expired - please login again');
            router.navigate('/');
        })
        // Handle the case when signing in or fetching the current user is fulfilled
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            const claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            const roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            state.user = {...action.payload, roles: typeof(roles) === 'string' ? [roles] : roles};
        });
        // Handle the case when signing in is rejected
        builder.addMatcher(isAnyOf(signInUser.rejected), (_state, action) => {
            throw action.payload;
        })
    })
})

// Export the actions from the account slice
export const {signOut, setUser} = accountSlice.actions;