import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiRoutes } from '../../constants'
import { api } from '../../Api/api'


export const fetchCustomer = createAsyncThunk('Customer', async () => {
    const response = await api.customerApi.Read().then(res => res.data)
    return response.costomer
    // return response.data
})


const initialState = {
    isLoading: false,
    customer: [],
    error: null,
    message: null
}

const Customer = createSlice({
    name: "Customer",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCustomer.fulfilled]: (state, action) => {
            state.customer = action.payload || []
            state.isLoading = false
        },
        [fetchCustomer.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchCustomer.rejected]: (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        }
    }
});

// export const {   } = Customer.actions

export default Customer.reducer