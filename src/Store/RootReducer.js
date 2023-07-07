import {combineReducers} from '@reduxjs/toolkit'
import UserDataSlice from './Slices/UserDataSlice';
import LuckyDrawSlice from './Slices/LuckyDrawSlice';
import AdminSlice from './Slices/AdminSlice';

const RootReducer = combineReducers({
    UserReducer: UserDataSlice,
    LuckyDrawReducer: LuckyDrawSlice,
    AdminReducer: AdminSlice,
})

export default RootReducer;
