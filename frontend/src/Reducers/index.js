import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from '../slices/profileSlice.js'
import cartReducer from '../slices/cartSlice.js'
import loadingBarReducer from '../slices/loadingBarSlice.js'
import courseReducer from '../slices/courseSlice.js'
import viewCourseReducer from '../slices/viewCourseSlice.js'
import themeSlice from '../slices/themeSlice.js'
import authReducer from '../slices/authSlice.js'

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