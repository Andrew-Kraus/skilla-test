import { combineReducers } from '@reduxjs/toolkit';
import callsSlice from './callsSlice';


const rootReducer = combineReducers({
    calls: callsSlice
});

export default rootReducer;