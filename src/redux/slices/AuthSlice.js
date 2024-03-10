import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    isInitialized: true,
    user: {},
    errorMsg: false
}

const AuthSlice = createSlice({
    name: "second",
    initialState,
    reducers: {
        login: (state, action) => {
            if (action.payload.code === 200) {
                state.isInitialized = false
                state.isAuthenticated = true
                state.user = action.payload.user
                localStorage.setItem('accessToken', action.payload.accessToken)
            } else {
                state.isInitialized = true
                state.isAuthenticated = false
                state.errorMsg = action.payload.msg
            }
        },
        logout: (state, action) => {
            state.isAuthenticated = false
            state.isInitialized = true
            state.user = {}
            state.errorMsg = false
        }
    }
});

export const { login,logout } = AuthSlice.actions

export default AuthSlice.reducer