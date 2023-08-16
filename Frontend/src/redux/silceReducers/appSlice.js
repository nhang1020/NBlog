import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as appServices from "../../services/appServices";
import { toast } from 'react-toastify';

export const login = createAsyncThunk("app/login", async ({ email, password }) => {
    return appServices.loginService(email, password).then((res) =>
        res
    );
});

export const loginSocial = createAsyncThunk("app/loginSocial", async (data) => {
    return appServices.loginSocialService(data).then((res) =>
        res
    );
});

export const sendEmail = createAsyncThunk("app/sendEmail", async (data) => {
    return appServices.sendEmailService(data).then((res) =>
        res
    );
});

const isLogInStorage = localStorage.getItem('isLogIn');
const userInfoStorage = localStorage.getItem('userInfo');
const language = localStorage.getItem('language');
const appSlice = createSlice({
    name: 'app',
    initialState: {
        user: userInfoStorage ? JSON.parse(userInfoStorage) : {},
        loading: false,
        error: null,
        language: language ? language : 'vi',
        isLogIn: isLogInStorage ? isLogInStorage : null,
        keyWord: '',
    },
    reducers: {
        logOut: (state, action) => {
            state.isLogIn = null;
            state.user = {}
            localStorage.clear();
        },
        changeLanguage: (state, action) => {
            state.language = action.payload;
            localStorage.setItem('language', action.payload)
        },
        search: (state, action) => {
            state.keyWord = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            //login user
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                let res = action.payload;
                state.loading = false;
                state.error = null;
                if (res && res.errCode !== 0) {
                    toast.error(res.message);
                    return;
                } else {
                    state.user = res.user;
                    localStorage.setItem('isLogIn', true);
                    localStorage.setItem('userInfo', JSON.stringify(res.user));
                    state.isLogIn = true;
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //end email
            .addCase(sendEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(sendEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //login user
            .addCase(loginSocial.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginSocial.fulfilled, (state, action) => {
                let res = action.payload;
                state.loading = false;
                state.error = null;
                if (res && res.errCode !== 0) {
                    toast.error(res.message);
                    return;
                } else {
                    state.user = res.user;
                    localStorage.setItem('isLogIn', true);
                    localStorage.setItem('userInfo', JSON.stringify(res.user));
                    state.isLogIn = true;
                }
            })
            .addCase(loginSocial.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
})

export default appSlice;