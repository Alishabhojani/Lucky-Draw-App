import {combineReducers} from '@reduxjs/toolkit'
import TotalUsersSlice from './Slices/TotalUsersSlice';
import UserDataSlice from './Slices/UserDataSlice';
import LuckyDrawSlice from './Slices/LuckyDrawSlice';

const RootReducer = combineReducers({
    TotalUsersReducer: TotalUsersSlice,
    UserReducer: UserDataSlice,
    LuckyDrawReducer: LuckyDrawSlice,
})

export default RootReducer;
