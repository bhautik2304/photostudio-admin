import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiRoutes } from '../../constants'
import { api } from '../../Api/api'


export const fetchOrder = createAsyncThunk('orderReq', async () => {
    const response = await api.ordersApi.Read().then(res => res.data)
    return response.data.reverse()
    // return response.data
})
const initialState = {
    orders:[],
    isLoading:false,
    error:null,
}

const Order = createSlice({
  name: "Order",
  initialState,
    reducers: {},
    extraReducers: {
        [fetchOrder.fulfilled]: (state, action) => {
            state.orders = action.payload || []
            state.isLoading = false
        },
        [fetchOrder.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchOrder.rejected]: (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        }
    }
});

// export const {} = Order.actions

export default Order.reducer