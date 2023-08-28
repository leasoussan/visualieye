import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer.js';
import globalDataReducer from './globalDataReducer.js';


const store =configureStore({
    reducer:{
        userReducer : userReducer,
        globalDataReducer: globalDataReducer,
    }
});


export default store