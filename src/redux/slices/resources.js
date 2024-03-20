import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { apiRoutes } from '../../constants'


export const fetchProduct = createAsyncThunk('Product', async () => {
    const response = await axios(apiRoutes.costomer).then(res => res.data)
    return response.data.reverse()
    // return response.data.reverse()
})
const initialState = {

}

const resources = createSlice({
    name: "resources",
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

// export const {  } = resources.actions

export default resources.reducer