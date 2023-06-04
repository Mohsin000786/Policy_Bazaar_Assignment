import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    users: [],
    error: null
}

// AsyncThunk are middleware used for calling api as an action functions.

export const usersAction = createAsyncThunk("fetchUser", async (data, { rejectWithValue }) => {
    const res = await fetch(`https://reqres.in/api/users?page=${data}&per_page=5`)
    try {
        const users = await res.json();
        return users
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const usersReducer = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(usersAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(usersAction.fulfilled, (state, action) => {
            state.loading = false
            state.users = [action.payload]
        });
        builder.addCase(usersAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
  }
})


export default usersReducer.reducer