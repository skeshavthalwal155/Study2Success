import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from '../slice/cartSlice.js'
import loadingBarReducer from '../slice/loadingBarSlice.js'
import courseReducer from '../slice/courseSlice.js'
import viewCourseReducer from '../slice/viewCourseSlice.js'
import themeSlice from '../slice/themeSlice.js'
import profileReducer from '../slice/profileSlice.js'
import authReducer from '../slice/authSlice.js'

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