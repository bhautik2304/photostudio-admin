import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiRoutes } from '../../constants'
import { api } from '../../Api/api'

// orientation thunk   
export const fetchOrientation = createAsyncThunk('orientation', async () => {
    const response = await api.productResourceApi.orientation.Read().then(res => res.data)
    //  (apiRoutes.orientationReq).then(res => res.data)
    return response.data.reverse()
})

// size thunk
export const fetchSize = createAsyncThunk('size', async () => {
    const response = await api.productResourceApi.Size.Read().then(res => res.data)
    return response.data.reverse()
})

export const fetchcountryzone= createAsyncThunk('countryzone', async () => {
    const response = await api.countryzoneApi.Read().then(res => res.data)
    return response.data.reverse()
})

// sheet thunk

export const fetchsheet= createAsyncThunk('sheet', async () => {
    const response = await api.productResourceApi.sheet.Read().then(res => res.data)
    return response.data.reverse()
})

// covers thunk

export const fetchcovers= createAsyncThunk('covers', async () => {
    const response = await api.productResourceApi.covers.Read().then(res => res.data)
    return response.data.reverse()
})

// coversupgrades thunk
export const fetchcoversupgrades= createAsyncThunk('oversupgrades', async () => {
    const response = await api.productResourceApi.coversupgrades.Read().then(res => res.data)
    return response.data.reverse()
})

export const fetchboxsleeveupgradesReq= createAsyncThunk('boxsleeveupgradesReq', async () => {
    const response = await api.productResourceApi.boxsleeveupgrades.Read().then(res => res.data)
    return response.data.reverse()
})

// colors thunk

export const fetchcolors= createAsyncThunk('colors', async () => {
    const response = await api.productResourceApi.colors.Read().then(res => res.data)
    return response.data.reverse()
})

// boxsleeve thunk

export const fetchboxsleeve= createAsyncThunk('boxsleeve', async () => {
    const response = await api.productResourceApi.boxsleeve.Read().then(res => res.data)
    return response.data.reverse()
})

// product thunk

export const fetchproduct= createAsyncThunk('product', async () => {
    const response = await api.productApi.Read().then(res => res.data)
    return response.data.reverse()
})

// paper thunk

export const fetchpaper= createAsyncThunk('paper', async () => {
    const response = await api.productResourceApi.paper.Read().then(res => res.data)
    return response.data.reverse()
})

export const fetchNotifications= createAsyncThunk('paper', async () => {
    const response = await api.notifications.getAll().then(res => res.data)
    return response.data.reverse()
})