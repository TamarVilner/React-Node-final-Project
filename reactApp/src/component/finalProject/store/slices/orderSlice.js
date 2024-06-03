import { Build } from '@mui/icons-material';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const addOrder = createAsyncThunk(
    'order/addOrder',
    async (order, thunkAPI) => {
        const res = await axios.post(`http://localhost:4000/order`, order);
        return res.data;
    }
);

export const fetchOrder = createAsyncThunk(
    'order/fetchOrder',
    async (thunkAPI) => {
        const res = await axios.get(`http://localhost:4000/order`);
        return res.data;
    }
);

export const getByUserId = createAsyncThunk(
    'order/getByUserId',
    async (id, thunkAPI) => {
        const res = await axios.get(`http://localhost:4000/order/${id}`);
        return res.data;
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderDate: null,
        OrderReceiptDate: null,
        cartArr: [], 
        allOrders: []
    },

    reducers: {
        upDateOrderDetails: (state, action) => {
            const id = action.payload.id;
            const q = action.payload.q;
            let index = state.cartArr.findIndex(x => x[0].p.id === id);
            if (index !== -1) {
                state.cartArr[index][0].q = parseInt(q, 10); // המרה
            }
        },

        addProductToCart: (state, action) => {
            const p = action.payload.p;
            const q = action.payload.quantities;
            const index = state.cartArr.findIndex(item => item[0].p.id === p.id);
            if (index === -1) {
                state.cartArr = [...state.cartArr, [{ p, q }]];
            } else {
                state.cartArr[index][0].q += parseInt(q, 10); //המרה
            }
        },

        deleteProductFromCart: (state, action) => {
            state.cartArr = state.cartArr.filter(x => x[0].p.id != action.payload)
        }


    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchOrder.fulfilled, (state, action)=>{
            state.allOrders = action.payload;
        })
        .addCase(getByUserId.fulfilled, (state, action)=>{
            state.allOrders = action.payload;
        })
    }
});

export const { upDateOrderDetails, addProductToCart, deleteProductFromCart } = orderSlice.actions;
export default orderSlice.reducer;