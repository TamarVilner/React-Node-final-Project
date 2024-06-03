import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (_, thunkAPI) => {
        const res = await axios.get('http://localhost:4000/user');
        console.log(res.data);
        return res.data;
    }
);

export const addUser = createAsyncThunk(
    'user/addUser',
    async (user, thunkAPI) => {
        const res = await axios.post('http://localhost:4000/user', user);
        return res.data;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userInfo: null,
        allUsers: [],
        status: 'idle', // מצב הבקשה (idle, loading, succeeded, failed).
        error: null   // הודעת השגיאה במקרה של כשלון.
    },

    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload;
            state.isLoggedIn = true;
            console.log("from userSlice", state.userInfo);
            console.log(state.isLoggedIn, "state.isLoggedIn");
        },

        logout: (state) => {
            state.isLoggedIn = false;
            state.userInfo = null;
            console.log("from logout", state.userInfo);
            console.log(state.isLoggedIn, "state.isLoggedIn");
        },

        addOneUser: (state, action) => {
            state.allUsers.push(action.payload);
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allUsers = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.allUsers.push(action.payload);
                state.userInfo = action.payload;
                state.isLoggedIn = true;
                console.log("from userSlice", state.userInfo);
                console.log(state.isLoggedIn, "state.isLoggedIn");
            })
    }

});

export const { login, logout, addOneUser } = userSlice.actions;
export default userSlice.reducer;
