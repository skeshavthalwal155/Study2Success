import { toast } from 'react-hot-toast'
import { setProgress } from '../../slice/loadingBarSlice'

// import { updateCompletedLectures } from '../../slice/viewCourseSlice'
// import {setLoading}  from '../../slice/profileSlice'
import { apiConnector } from '../apiconnector'
import { courseEndpoints, categories } from '../apis'

const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    CREATE_CATEGORY_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
    ADD_COURSE_TO_CATEGORY_API,
    SEARCH_COURSES_API,
} = courseEndpoints

const {
    CATEGORY_DELETE
} = categories

export const getAllCourses = async () => {
    const toastId = toast.loading("Loading...")
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_COURSE_API)
        if (!response?.data?.success) {
            console.log("Error=", response?.data?.message);
            toast.error(response?.data?.message || "Could Not Fetch All Courses");
            return;
        }
        result = response?.data?.data
        console("GET_ALL_COURSE_API_DATA", result);
    } catch (error) {
        console.log("FETCH COURSE_DETAILS ERROR............", error);

        // Handle 404 and other errors
        if (error.response) {
            // The request was made and server responded with status code not in 2xx
            const serverMessage = error.response.data?.message ||
                `Request failed with status ${error.response.status}`;
            toast.error(serverMessage);
        } else if (error.request) {
            // The request was made but no response received
            toast.error("No response from server. Please try again.");
        } else {
            // Something happened in setting up the request
            toast.error(error.message || "Failed to fetch all courses");
        }
    } finally {
        toast.dismiss(toastId);
        return result;
    }
}

export const fetchCourseDetails = async (courseId, dispatch) => {
    dispatch(setProgress(50));
    let result = null
    try {
        const response = await apiConnector("POST", COURSE_DETAILS_API, {
            courseId
        })
        // console.log("COURSE_DETAILS_API_RESPONSE........", response?.data)
        if (!response?.data?.success) {
            console.log("Error=", response?.data?.message);
            toast.error(response?.data?.message || "Could not Fetch Course Categories");
            return;
        }
        result = response?.data?.data[0];
    } catch (error) {
        console.log("FETCH COURSE_DETAILS ERROR............", error);

        // Handle 404 and other errors
        if (error.response) {
            // The request was made and server responded with status code not in 2xx
            const serverMessage = error.response.data?.message ||
                `Request failed with status ${error.response.status}`;
            toast.error(serverMessage);
        } else if (error.request) {
            // The request was made but no response received
            toast.error("No response from server. Please try again.");
        } else {
            // Something happened in setting up the request
            toast.error(error.message || "Failed to Fetch Course Detials");
        }
    } finally {
        // toast.dismiss(toastId);
        dispatch(setProgress(100))
        return result;
    }
}

// Fetching the Available Course Categories
export const fetchCourseCategories = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API);
        // console.log("COURSE_CATEGORIES_API_RESPONSE", response)
        if (!response?.data?.success) {
            console.log("Error=", response?.data?.message);
            toast.error(response?.data?.message || "Could not Fetch Course Categories");
            return;
        }
        result = response?.data?.data
    } catch (error) {
        console.log("FETCH COURSE_CATEGORIES ERROR............", error);

        // Handle 404 and other errors
        if (error.response) {
            // The request was made and server responded with status code not in 2xx
            const serverMessage = error.response.data?.message ||
                `Request failed with status ${error.response.status}`;
            toast.error(serverMessage);
        } else if (error.request) {
            // The request was made but no response received
            toast.error("No response from server. Please try again.");
        } else {
            // Something happened in setting up the request
            toast.error(error.message || "Failed to Fetch Categories");
        }
    } finally {

        return result;
    }
}

// add the course details
export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`
        })
        // console.log("CREATE COURSE_API RESPONSE.....", response)
        if (!response?.data?.success) {
            console.log("ERROR=", response?.data?.message)
            toast.error(response?.data?.message || `failed to add course`)
            return
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("FETCH ADD_COURSE ERROR............", error);

        // Handle 404 and other errors
        if (error.response) {
            // The request was made and server responded with status code not in 2xx
            const serverMessage = error.response.data?.message ||
                `Request failed with status ${error.response.status}`;
            toast.error(serverMessage);
        } else if (error.request) {
            // The request was made but no response received
            toast.error("No response from server. Please try again.");
        } else {
            // Something happened in setting up the request
            toast.error(error.message || "Error While Adding a Course");
        }
    } finally {
        toast.dismiss(toastId);
        return result;
    }
}

// Edit Course Details
export const editCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });
        // console.log("EDIT COURSE API RESPONSE............", response);
        if (!response?.data?.success) {
            // console.log("Could Not Update Course Details");
            toast.error(response?.data?.message || `Could Not Update Course Details`)
            return
        }
        toast.success("Course Details Updated Successfully");
        result = response?.data?.data;
    } catch (error) {
        console.log("EDIT COURSE API ERROR", error)
        if (error.response) {
            // The request was made and server responded with status code not in 2xx
            const serverMessage = error.response.data?.message ||
                `Request failed with status ${error.response.status}`;
            toast.error(serverMessage);
        } else if (error.request) {
            // The request was made but no response received
            toast.error("No response from server. Please try again.");
        } else {
            // Something happened in setting up the request
            toast.error(error.message || "Error in Editing a Course");
        }
    } finally {
        toast.dismiss(toastId);
        return result;
    }
};

// create a section
export const createSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        // console.log("CREATE SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            // console.log("Could Not Create Section");
            toast.error(response?.data?.message || "Could Not Create Section")
            return
        }
        toast.success("Course Section Created");
        result = response?.data?.data;
        return result
        // console.log("create API RESULT............", result);
    } catch (error) {
        console.log("Create Section Api ERROR............", error);

        // Handle 404 and other errors
        if (error.response) {
            // The request was made and server responded with status code not in 2xx
            const serverMessage = error.response.data?.message ||
                `Request failed with status ${error.response.status}`;
            toast.error(serverMessage);
        } else if (error.request) {
            // The request was made but no response received
            toast.error("No response from server. Please try again.");
        } else {
            // Something happened in setting up the request
            toast.error(error.message || "Failed to Create Section");
        }
    } finally {
        toast.dismiss(toastId);
        return result;
    }
};

// create a subsection
export const createSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Uploading...");
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        // console.log("CREATE SUB-SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            // console.log("Could Not Add Lecture");
            toast.error(response?.data?.message || "Could Not Add Lecture")
            return
        }
        toast.success("Lecture Added");
        result = response?.data?.data;
    } catch (error) {
        console.log("CREATE SUB-SECTION API ERROR............", error);
        if (error.response) {
            // The request was made and server responded with status code not in 2xx
            const serverMessage = error.response.data?.message ||
                `Request failed with status ${error.response.status}`;
            toast.error(serverMessage);
        } else if (error.request) {
            // The request was made but no response received
            toast.error("No response from server. Please try again.");
        } else {
            // Something happened in setting up the request
            toast.error(error.message || "Error Create Lecture");
        }
    } finally {
        toast.dismiss(toastId);
        return result;
    }

};

// update a section
export const updateSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        // console.log("UPDATE SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            // console.log("Could Not Update Section");
            toast.error(response?.data?.message || "Could Not Update Section")
            return

        }
        toast.success("Course Section Updated");
        result = response?.data?.data;
        // console.log("Update API RESULT............", result);
    } catch (error) {
        console.log("UPDATE SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

// update a subsection
export const updateSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        // console.log("UPDATE SUB-SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Update Lecture");
        }
        toast.success("Lecture Updated");
        result = response?.data?.data;
    } catch (error) {
        console.log("UPDATE SUB-SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

// delete a section
export const deleteSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        // console.log("DELETE SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Section");
        }
        toast.success("Course Section Deleted");
        result = response?.data?.data;
        // console.log("Delete API RESULT............", result);
    } catch (error) {
        console.log("DELETE SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};
// delete a subsection
export const deleteSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        // console.log("DELETE SUB-SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Lecture");
        }
        toast.success("Lecture Deleted");
        result = response?.data?.data;
        // console.log("Delete subsection API RESULT............", result);
    } catch (error) {
        console.log("DELETE SUB-SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

// fetching all courses under a specific instructor
export const fetchInstructorCourses = async (token) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_INSTRUCTOR_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        // console.log("INSTRUCTOR COURSES API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Instructor Courses");
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("INSTRUCTOR COURSES API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

//delete a category
export const deleteCategory = async (data, token) => {
    const toastId = toast.loading("Deleting category...");

    try {
        const response = await apiConnector(
            "DELETE",
            CATEGORY_DELETE,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Could not delete category");
        }

        toast.success("Category deleted successfully");
        return response.data;
    } catch (error) {  // Required catch block
        console.error("DELETE CATEGORY ERROR:", error);
        toast.error(error.message || "Deletion failed");
    } finally {  // Optional finally block (but recommended)
        toast.dismiss(toastId); // Ensure loader is always dismissed
    }
};


// delete a course
export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        });
        // console.log("DELETE COURSE API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Course");
        }
        toast.success("Course Deleted");
    } catch (error) {
        console.log("DELETE COURSE API ERROR............", error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
};

// get full details of a course
export const getFullDetailsOfCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading...");
    //   dispatch(setLoading(true));
    let result = null;
    try {
        const response = await apiConnector(
            "POST",
            GET_FULL_COURSE_DETAILS_AUTHENTICATED,
            {
                courseId,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        );
        // console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("COURSE_FULL_DETAILS_API API ERROR............", error);
        result = error.response.data;
        // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    //   dispatch(setLoading(false));
    return result;
};

// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
    // let result = null;
    // console.log("mark complete data", data);
    const toastId = toast.loading("Marking Lecture as Complete...");
    try {
        const response = await apiConnector(
            "POST",
            LECTURE_COMPLETION_API,
            data,
            {
                Authorization: `Bearer ${token}`,
            });
        // console.log(
        //     "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
        //     response
        // );

        if (!response.data.success) {
            throw new Error(response.data.error);
        }
        toast.success("Lecture Completed");
        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        console.error("MARK_LECTURE_COMPLETE_ERROR:", error);

        let errorMessage = "An error occurred while marking lecture complete";
        if (error.response) {
            errorMessage = error.response.data?.message ||
                `Request failed with status ${error.response.status}`;
        } else if (error.request) {
            errorMessage = "No response from server. Please try again.";
        } else {
            errorMessage = error.message || errorMessage;
        }

        toast.error(errorMessage);
        return {
            success: false,
            error: errorMessage
        };
    } finally {
        toast.dismiss(toastId);
    }
};




// create a rating for course
export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let success = false;
    try {
        const response = await apiConnector("POST", CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`,
        });
        // console.log("CREATE RATING API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Create Rating");
        }
        toast.success("Rating Posted");
        success = true;
    } catch (error) {
        success = false;
        console.log("CREATE RATING API ERROR............", error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return success;
};

//add course to Category
export const addCourseToCategory = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let success = false;
    try {
        const response = await apiConnector(
            "POST",
            ADD_COURSE_TO_CATEGORY_API,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        // console.log("ADD COURSE TO CATEGORY API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Add Course To Category");
        }
        toast.success("Course Added To Category");
        success = true;
    } catch (error) {
        success = false;
        console.log("ADD COURSE TO CATEGORY API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return success;
};

//search courses
export const searchCourses = async (searchQuery, dispatch) => {
    // const toastId = toast.loading("Loading...")
    dispatch(setProgress(50));
    let result = null;
    try {
        const response = await apiConnector("POST", SEARCH_COURSES_API, {
            searchQuery: searchQuery,
        });
        // console.log("SEARCH COURSES API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Search Courses");
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("SEARCH COURSES API ERROR............", error);
        toast.error(error.message);
    }
    // toast.dismiss(toastId)
    dispatch(setProgress(100));
    return result;
};

//create category
export const createCategory = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let success = false;
    try {
        const response = await apiConnector("POST", CREATE_CATEGORY_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("CREATE CATEGORY API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Create Category");
        }
        toast.success("Category Created");
        success = true;
    } catch (error) {
        success = false;
        console.log("CREATE CATEGORY API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return success;
};
