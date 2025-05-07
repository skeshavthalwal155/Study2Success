import React from 'react'
import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';

export const getCatalogPageData = async (categoryId) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, { categoryId: categoryId })

        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Category Page Details")
        }

        result = response?.data

    } catch (error) {
        console.log("GET CATALOG PAGE DATA ERROR............", error);

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
            toast.error(error.message || "Failed to send otp");
        }
    } finally {
        toast.dismiss(toastId);
        // dispatch(setLoading(false));
        return result
    }
}
