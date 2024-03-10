import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiRoutes } from '../../constants'
import { api } from '../../Api/api'

// orientation thunk   
export const fetchOrientation = createAsyncThunk('orientation', async () => {
    const response = await api.productResourceApi.orientation.Read().then(res => res.data)
    //  (apiRoutes.orientationReq).then(res => res.data)
    return response.data
    // return response.data
})

// size thunk
export const fetchSize = createAsyncThunk('size', async () => {
    const response = await api.productResourceApi.Size.Read().then(res => res.data)
    return response.sizes
    // return response.data
})

export const fetchcountryzone= createAsyncThunk('countryzone', async () => {
    const response = await api.countryzoneApi.Read().then(res => res.data)
    return response.countryzone
    // return response.data
})

// sheet thunk

export const fetchsheet= createAsyncThunk('sheet', async () => {
    const response = await api.productResourceApi.sheet.Read().then(res => res.data)
    return response.sheet
    // return response.data
})

// covers thunk

export const fetchcovers= createAsyncThunk('covers', async () => {
    const response = await api.productResourceApi.covers.Read().then(res => res.data)
    return response.covers
    // return response.data
})

// coversupgrades thunk
export const fetchcoversupgrades= createAsyncThunk('oversupgrades', async () => {
    const response = await api.productResourceApi.coversupgrades.Read().then(res => res.data)
    return response.coversupgrades
    // return response.data
})

export const fetchboxsleeveupgradesReq= createAsyncThunk('boxsleeveupgradesReq', async () => {
    const response = await api.productResourceApi.boxsleeveupgrades.Read().then(res => res.data)
    return response.boxsleeveupgrade
    // return response.data
})

// colors thunk

export const fetchcolors= createAsyncThunk('colors', async () => {
    const response = await api.productResourceApi.colors.Read().then(res => res.data)
    return response.data
    // return response.data
})

// boxsleeve thunk

export const fetchboxsleeve= createAsyncThunk('boxsleeve', async () => {
    const response = await api.productResourceApi.boxsleeve.Read().then(res => res.data)
    return response.boxsleeve
    // return response.data
})

// product thunk

export const fetchproduct= createAsyncThunk('product', async () => {
    const response = await api.productApi.Read().then(res => res.data)
    return response.data
    // return response.data
})

// paper thunk

export const fetchpaper= createAsyncThunk('paper', async () => {
    const response = await api.productResourceApi.paper.Read().then(res => res.data)
    return response.paper
    // return response.data
})