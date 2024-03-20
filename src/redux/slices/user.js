import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../Api/api'


export const fetchAdminUsers = createAsyncThunk('adminusers', async () => {
    const response = await api.userModule.read().then(res => res.data)
    return response.data
    // return response.data
})
const initialState = {
    isLoading: false,
    users: [],
    error: null,
    message: null
}

const user = createSlice({
    name: "Users",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAdminUsers.fulfilled]: (state, action) => {
            state.users = action.payload || []
            state.isLoading = false
        },
        [fetchAdminUsers.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchAdminUsers.rejected]: (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        }
    }
});

// export const { } = user.actions

export default user.reducer