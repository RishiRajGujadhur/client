import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { MetaData } from "../../models/pagination";
import { ProductParams, Product } from "../../models/product";
import { RootState } from "../../app/store/configureStore";

// Define the shape of the catalog state
interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    brands: string[];
    types: string[];
    productParams: ProductParams;
    metaData: MetaData | null;
}

// Create an entity adapter for managing the products
const productsAdapter = createEntityAdapter<Product>();

// Helper function to convert productParams to URLSearchParams
function getAxiosParams(productParams: ProductParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy);
    if (productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
    if (productParams.types.length > 0) params.append('types', productParams.types.toString());
    if (productParams.brands.length > 0) params.append('brands', productParams.brands.toString());
    return params;
}

// Async thunk for fetching products
export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
        try {
            const response = await agent.Catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

// Async thunk for fetching a single product
export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            const product = await agent.Catalog.details(productId);
            return product;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

// Async thunk for fetching filters
export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return agent.Catalog.fetchFilters();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message })
        }
    }
)

// Initial productParams
function initParams(): ProductParams {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name',
        brands: [],
        types: []
    }
}

// Create the catalog slice
export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        brands: [],
        types: [],
        productParams: initParams(),
        metaData: null
    }),
    reducers: {
        // Reducer for setting productParams
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload, pageNumber: 1}
        },
        // Reducer for setting pageNumber
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload}
        },
        // Reducer for setting metaData
        setMetaData: (state, action) => {
            state.metaData = action.payload
        },
        // Reducer for resetting productParams
        resetProductParams: (state) => {
            state.productParams = initParams()
        },
        // Reducer for setting a single product
        setProduct: (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.productsLoaded = false;
        },
        // Reducer for removing a single product
        removeProduct: (state, action) => {
            productsAdapter.removeOne(state, action.payload);
            state.productsLoaded = false;
        }
    },
    extraReducers: (builder => {
        // Extra reducer for handling fetchProductsAsync pending action
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts'
        });
        // Extra reducer for handling fetchProductsAsync fulfilled action
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        // Extra reducer for handling fetchProductsAsync rejected action
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        // Extra reducer for handling fetchProductAsync pending action
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct'
        });
        // Extra reducer for handling fetchProductAsync fulfilled action
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle'
        });
        // Extra reducer for handling fetchProductAsync rejected action
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle'
        });
        // Extra reducer for handling fetchFilters pending action
        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
        });
        // Extra reducer for handling fetchFilters fulfilled action
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.status = 'idle';
            state.filtersLoaded = true;
        });
        // Extra reducer for handling fetchFilters rejected action
        builder.addCase(fetchFilters.rejected, (state) => {
            state.status = 'idle';
        });
    })
})

// Export the actions
export const {setProductParams, resetProductParams, setMetaData, setPageNumber, setProduct, removeProduct} = catalogSlice.actions;

// Export the product selectors
export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);