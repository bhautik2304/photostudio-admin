import { createSlice } from '@reduxjs/toolkit'
import { fetchOrientation,fetchboxsleeveupgradesReq, fetchSize, fetchpaper, fetchsheet, fetchboxsleeve, fetchcovers, fetchcolors, fetchcountryzone, fetchcoversupgrades, fetchproduct, } from '../thunk/index';

const initialState = {
    orientation: [],
    size: [],
    paper: [],
    sheet: [],
    cover: [],
    coverupgrade: [],
    boxsleevupgrade: [],
    boxsleev: [],
    color: [],
    product: [],
}

const resourceSlice = createSlice({
    name: "resources",
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchOrientation.fulfilled]: (state, action) => {
            state.orientation = action.payload
        },
        [fetchSize.fulfilled]: (state, action) => {
            state.size = action.payload
        },
        [fetchpaper.fulfilled]: (state, action) => {
            state.paper = action.payload
        },
        [fetchsheet.fulfilled]: (state, action) => {
            state.sheet = action.payload
        },
        [fetchboxsleeve.fulfilled]: (state, action) => {
            state.boxsleev = action.payload
        },
        [fetchcovers.fulfilled]: (state, action) => {
            state.cover = action.payload
        },
        [fetchcolors.fulfilled]: (state, action) => {
            state.color = action.payload
        },
        [fetchcountryzone.fulfilled]: (state, action) => {
            state.countryzone = action.payload
        },
        [fetchcoversupgrades.fulfilled]: (state, action) => {
            state.coverupgrade = action.payload
        },
        [fetchproduct.fulfilled]: (state, action) => {
            state.product = action.payload
        },
        [fetchboxsleeveupgradesReq.fulfilled]: (state, action) => {
            state.boxsleevupgrade = action.payload
        }
    }
});

// export const { } = resourceSlice.actions

export default resourceSlice.reducer