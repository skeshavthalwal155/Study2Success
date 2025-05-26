import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const checkTokenValidity = (token) => {
    if (!token) return false;
    try {
        const decode = jwtDecode(token)
        return decode.exp > Date.now() / 1000;
    } catch (e) {
        return false;
    }
}

const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")):null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isAuthenticated: checkTokenValidity(localStorage.getItem('token')),
    loading: false,
    signupData: null
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignupData(state, action) {
            state.signupData = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setToken(state, action) {
            const token = action.payload;
            state.token = token;
            state.isAuthenticated = checkTokenValidity(token);
            if (token) {
                localStorage.setItem('token', JSON.stringify(token));
            } else {
                localStorage.removeItem('token')
            }

        },
        logout(state) {
            state.token = null;
            state.isAuthenticated = false
            localStorage.removeItem('token')
        },
        checkAuth(state) {
            state.isAuthenticated = checkTokenValidity(state.token)
            if (!state.isAuthenticated) {
                state.token = null;
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                state.user = null;
            }
        }
    }
})

export const { setToken, setSignupData, setLoading, logout, checkAuth } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated

export default authSlice.reducer;
