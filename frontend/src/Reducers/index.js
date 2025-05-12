import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice.js";
import courseReducer from "../slices/courseSlice.js";
import loadingBarReducer from "../slices/loadingBarSlice.js";
import viewCourseReducer from "../slices/viewCourseSlice.js";
import themeSlice from "../slices/themeSlice.js";
import authReducer from '../slices/authSlice.js'
import profileReducer from '../slices/profileSlice.js'


const rootReducer = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
    loadingBar:loadingBarReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer,
    theme:themeSlice
})

export default rootReducer;