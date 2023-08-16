import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as userServices from "../../services/userServices";
import { toAlias } from "../../utils/constants";

export const getUserDetail = createAsyncThunk("user/getUserDetail", async (id) => {
    return userServices.getUserDetailService(id).then((res) =>
        res.user
    );
});
export const editUser = createAsyncThunk("user/editUser", async (data) => {
    return userServices.editUserService(data).then((res) =>
        res
    );
});
export const getUsers = createAsyncThunk("user/getUsers", async (option) => {
    return userServices.getUsersService(option).then((res) =>
        res
    );
});
export const followUser = createAsyncThunk("user/followUser", async (data) => {
    return userServices.followUserService(data).then((res) =>
        res
    );
});
export const getFollows = createAsyncThunk("user/getFollows", async () => {
    return userServices.getFollowsService().then((res) =>
        res
    );
});
const postSlice = createSlice({
    name: 'user',
    initialState: {
        userDetail: {},
        users: [],
        loading: false,
        error: null,
        relationships: [],
        search: '',
        status: 'all',
    },
    reducers: {
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload)
        },
        searchUser: (state, action) => {
            state.search = toAlias(action.payload);
        },
        statusFilterChange: (state, action) => {
            state.status = action.payload;
        },
        sortName: (state, action) => {
            if (action.payload === 'AtoZ') {
                state.users = state.users.sort((person1, person2) => {
                    const lastName1 = person1.firstName.toLowerCase();
                    const lastName2 = person2.firstName.toLowerCase();
                    return lastName1.localeCompare(lastName2);
                });
            } else {
                state.users = state.users.sort((person1, person2) => {
                    const lastName1 = person1.firstName.toLowerCase();
                    const lastName2 = person2.firstName.toLowerCase();
                    return lastName2.localeCompare(lastName1);
                });
            }
        },
    },
    extraReducers: (builder) => {
        builder
            //get
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // state.users = action.payload.data;
                if (action.payload.data) {
                    const newData = action.payload.data;
                    const updatedUsers = [...state.users];
                    // Loại bỏ những phần tử trùng lặp từ newData
                    newData.forEach(item => {
                        if (!updatedUsers.some(user => user.id === item.id)) {
                            updatedUsers.push(item);
                        }
                    });
                    state.users = updatedUsers;
                }

            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //get userDetail
            .addCase(getUserDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserDetail.fulfilled, (state, action) => {
                state.userDetail = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getUserDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //edit user
            .addCase(editUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                let res = action.payload;
                if (res.errCode === 0) {
                    state.userDetail = res.user;
                }
            })
            .addCase(editUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //like post
            .addCase(followUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(followUser.fulfilled, (state, action) => {
                let res = action.payload;
                state.loading = false;
                state.error = null;
                if (res && res.errCode !== 0) {
                    return;
                } else {
                    if (res.check === true) {
                        state.relationships = state.relationships.filter(like => like.id !== res.relate)
                    } else {
                        state.relationships.unshift(res.relate);
                    }
                }
            })
            .addCase(followUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //get follows
            .addCase(getFollows.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFollows.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.relationships = action.payload.data;
            })
            .addCase(getFollows.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default postSlice;