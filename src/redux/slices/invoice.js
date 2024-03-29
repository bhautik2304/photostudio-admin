import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiRoutes } from '../../constants'


export const fetchProduct = createAsyncThunk('Product', async () => {
    const response = await axios(apiRoutes.costomer).then(res => res.data)
    return response.data
    // return response.data
})
const initialState = {

}

const invoice = createSlice({
    name: "Invoice",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProduct.fulfilled]: (state, action) => {
            state.customer = action.payload || []
            state.isLoading = false
        },
        [fetchProduct.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchProduct.rejected]: (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        }
    }
});

// export const {  } = invoice.actions

export default invoice.reducer