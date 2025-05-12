import { createSlice } from "@reduxjs/toolkit";

const initialState={
    courseSectionData:[],
    courseEntireData:[],
    completedLecture:[],
    totalNoOfLectures:0,
}

const viewCourseSlice = createSlice({
    name:"viewCourse",
    initialState,
    reducers:{
        setCourseSectionData:(state,action)=>{
            state.courseSectionData= action.payload
        },
        setEntireCourseData:(state,action)=>{
            state.courseEntireData= action.payload
        },
        setTotalNoOfLectures:(state,action)=>{
            state.totalNoOfLectures= action.payload
        },
        setCompletedLectures:(state,action)=>{
            state.completedLecture= action.payload
        },
        updateCompletedLectures:(state,action)=>{
            state.completedLecture= [...state.completedLecture, action.payload]
        }
    }
})

export const {
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
    setCompletedLectures,
    updateCompletedLectures,
} = viewCourseSlice.actions

export default viewCourseSlice.reducer