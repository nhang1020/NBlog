import { configureStore } from '@reduxjs/toolkit';
import adminSlice from './silceReducers/adminReducers';
import postSlice from './silceReducers/postSlice'
import appSlice from './silceReducers/appSlice'
import userSlice from './silceReducers/userSlice'
const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        admin: adminSlice.reducer,
        post: postSlice.reducer,
        user: userSlice.reducer
    },
    devTools: true,
});

export default store;