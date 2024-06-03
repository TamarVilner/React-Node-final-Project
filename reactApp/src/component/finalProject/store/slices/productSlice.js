import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (_, thunkAPI) => {
        const res = await axios.get('http://localhost:4000/product');
        return res.data;
    }
);

export const addOneProduct = createAsyncThunk(
    'product/addProduct',
    async (product, thunkAPI) => {
        const res = await axios.post(`http://localhost:4000/product`, product);
        return res.data;
    }
);

export const deleteOneProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id, thunkAPI) => {
        const res = await axios.delete(`http://localhost:4000/product/${id}`);
        return id;
    }
);

export const upDateProduct = createAsyncThunk(
    'product/upDateProduct',
    async (product, thunkAPI) => {
        const res = await axios.put(`http://localhost:4000/product/${product.id}`, product);
        return res.data;
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState: {
        allProducts: [],
        status: 'idle', // מצב הבקשה (idle, loading, succeeded, failed).
        error: null   // הודעת השגיאה במקרה של כשלון.
    },

    reducers: {

        addProduct: (state, action) => {
            state.allProducts.push(action.payload);
        },

        upProduct: (state, action) => {
            let index = state.allProducts.find(x => x.id === action.payload.id);
            if (index) {
                // state.allProducts[index] = action.payload;
                state.allProducts.push(action.payload);
            }
        },

        deleteProduct: (state, action) => {
            state.allProducts = state.allProducts.filter(x => x.id !== action.payload);
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allProducts = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addOneProduct.fulfilled, (state, action) => {
                addProduct(state, action);
            })
            .addCase(deleteOneProduct.fulfilled, (state, action) => {
                state.allProducts = state.allProducts.filter(x => x.id !== action.payload);
            })
            .addCase(upDateProduct.fulfilled, (state, action) => {
                let index = state.allProducts.findIndex(x => x.id === action.payload.id);
                if (index !== -1) {
                    state.allProducts[index] = action.payload;
                }
            });
    }
});

export const { addProduct, upProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
