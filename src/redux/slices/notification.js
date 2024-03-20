import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchNotifications } from '../thunk/index'

const initialState = {
    isLoading: false,
    notification: [],
    error: null,
    message: null
}

const Notification = createSlice({
    name: "Notification",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchNotifications.fulfilled]: (state, action) => {
            state.notification = action.payload || []
            state.isLoading = false
        },
        [fetchNotifications.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchNotifications.rejected]: (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        }
    }
});

// export const { } = Notification.actions

export default Notification.reducer