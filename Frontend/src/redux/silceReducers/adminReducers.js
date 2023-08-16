import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as adminServices from "../../services/adminServices";
import { toast } from 'react-toastify';

export const getAllCode = createAsyncThunk("admin/getAllCode", async () => {
    return adminServices.getAllCodeService().then((res) =>
        res.data
    );
});

export const getUsers = createAsyncThunk("admin/getUsers", async (limit) => {
    return adminServices.getUsersService(limit).then((res) =>
        res.data
    );
});
export const createUser = createAsyncThunk("admin/createUser", async (data) => {
    return adminServices.createUserService(data).then((res) =>
        res
    );
});
export const deleteUser = createAsyncThunk("admin/deleteUser", async (userId) => {
    return adminServices.deleteService(userId).then((res) =>
        res
    );
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        allCodes: [],
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //allcode
            .addCase(getAllCode.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCode.fulfilled, (state, action) => {
                state.allCodes = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getAllCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //users
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //create user
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                let res = action.payload;
                state.loading = false;
                state.error = null;
                if (res && res.errCode === 1) {
                    toast.error(res.message);
                    return;
                } else {
                    state.users.push(action.payload.user);
                    toast.success(res.message)
                }
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //delete user
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                let res = action.payload;
                state.loading = false;
                state.error = null;
                if (res && res.errCode === 1) {
                    toast.error(res.message);
                    return;
                } else {
                    state.users = state.users.filter(user => user.id !== res.userId)
                    toast.success(res.message)
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export default adminSlice;