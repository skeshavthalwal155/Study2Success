import { setProgress } from '../../slice/loadingBarSlice'
import { apiConnector } from '../apiconnector'
import { profileEndpoints } from '../apis'
import { toast } from 'react-hot-toast'
import { settingEndpoints } from '../apis'
import { logout } from './authAPI'



// Get Enrolled Course
export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        // console.log("BEFORE CALLING BACKEND API FOR ENROLLED COURSE")
        const response = await apiConnector(
            "GET", 
            profileEndpoints.GET_USER_ENROLLED_COURSES_API, 
            null, 
            { Authorization: `Bearer ${token}` })
        // console.log("Response : ",response)
        // console.log("After Calling BACKEND API for ENROLLED COURSES");
        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }
        result = response?.data?.data
       
    } catch (error) {
        console.log("GET ENROLLED COURSE ERROR............", error);

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
            toast.error(error.message || "Failed to fetch enrolled courses");
        }
    } finally {
        toast.dismiss(toastId);   
        // dispatch(setProgress(100))   
        return result
    }
}

// Update Profile
export async function updatePfp(token, pfp) {
    const toastId = toast.loading("Uploading...")

    try {
        const formData = new FormData()
        // console.log('pfp', pfp)
        formData.append('pfp', pfp)
        const response = await apiConnector("PUT", settingEndpoints.UPDATE_DISPLAY_PICTURE_API, formData, {
            Authorization: `Bearer ${token}`,
        });
        // console.log("UPDATE DISPLAY API RESPONSE", response)
        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }
        toast.success("Profile Picture Updated Successfully!");
        const imageUrl = response?.data?.data?.image;
        localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), image: imageUrl }))
        // console.log(JSON.parse(localStorage.getItem('user')).image);
    } catch (error) {
        console.log("Update Profile Picture ERROR............", error);

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
            toast.error(error.message || "Failed to update profile picture");
        }
    } finally {
        toast.dismiss(toastId);
    }
}

// UpdateAdditionalDetails
export async function updateAdditionalDetails(token, additionalDetails) {
    // console.log("Additional Details : ", additionalDetails);
    const { firstName, lastName, dateOfBirth, gender, contactNumber, about } = additionalDetails
    // console.log("additional detials", additionalDetails)
    const toastId = toast.loading("Updating....")
    try {
        const response = await apiConnector(
            "PUT", 
            settingEndpoints.UPDATE_PROFILE_API, 
            { firstName, lastName, dateOfBirth, gender, contactNumber, about },
             {
            Authorization: `Bearer ${token}`
        })
        // console.log("Updated AddtionalDetails Response.....", response)
        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }
        toast.success("Additional Detials Updated Successfully");
        const user = JSON.parse(localStorage.getItem('user'))
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.additionalDetails.dateOfBirth = dateOfBirth || user.additionalDetails.dateOfBirth;
        user.additionalDetails.contactNumber = contactNumber || user.additionalDetails.contactNumber;
        user.additionalDetails.about = about || user.additionalDetails.about;
        user.additionalDetails.gender = gender
        localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
        console.log("Additonal Details Update ERROR............", error);

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
            toast.error(error.message || "Failed to update Addtional Details");
        }
    } finally {
        toast.dismiss(toastId);
    }
}

// Update Password
export async function updatePassword(token, password) {
    const { oldPassword, newPassword, confirmNewPassword } = password;
    // console.log("Password : ", password);
    const toastId = toast.loading("Updating Password...")
    try {

        const response = await apiConnector(
            "POST",
            settingEndpoints.CHANGE_PASSWORD_API,
            { oldPassword, newPassword, confirmNewPassword },
            {
                Authorization: `Bearer ${token}`
            }
        );

        // console.log("Update Password Api Resoponse....", response)
        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }
        toast.success("Password Updated Successfully!");
        return response.data
    } catch (error) {
        console.log("Change Password ERROR............", error);

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
            toast.error(error.message || "Failed to update password");
        }
    } finally {
        toast.dismiss(toastId);
    }
}

// Delete Account
export async function deleteAccount(token, dispatch, navigate) {
    const toastId = toast.loading("Profile Deleting....");
    try {
        const response = await apiConnector('DELETE', settingEndpoints.DELETE_PROFILE_API, null, { Authorization: `Bearer ${token}` });
        // console.log("DELETE ACCOUNT API RESPONSE....", response)

        // console.log("Delete Account Api Resoponse....", response)
        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }
        toast.success("Account Deleted Successfully!");
        dispatch(logout(navigate))

    } catch (error) {
        console.log("Delete Account APi ERROR............", error);

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
            toast.error(error.message || "Failed to delete account");
        }
    } finally {
        toast.dismiss(toastId);
    }
}


// Get Instructor Details
export async function getInstructorDashboard(token) {
    // const toastId = toast.loading("Porfile Deleting....");
    // dispatch(setProgress)
    let result = []
    try {
        // console.log("Before Calling Backend Api for instructor dashboard")
        const response = await apiConnector('GET', profileEndpoints.GET_ALL_INSTRUCTOR_DASHBOARD_DETAILS_API, null, { Authorization: `Bearer ${token}` });
        // console.log("After Calling ACCOUNT API RESPONSE....", response)

        // console.log("getInstructorDashboard Api Resoponse....", response)
        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("GET Instructor DashBoard ERROR............", error);

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
            toast.error(error.message || "Failed to update password");
        }
    } finally {
        // dispatch(setProgress(100))
        return result
    }
}