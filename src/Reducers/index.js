import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import courseReducer from "../slices/courseSlice";
import loadingBarReducer from "../slices/loadingBarSlice";
import viewCourseReducer from "../Slices/viewCourseSlice";
import  themeSlice  from "../Slices/themeSlice";


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