import { toast } from 'react-hot-toast'
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzplogo from '../../assets/Images/rzp.png'
import { setPaymentLoading } from "../../slice/courseSlice";
import { resetCart } from "../../slice/cartSlice";


const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src

        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...")
    try {
        // Load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if (!res) {
            toast.error("RazorPay SDK Failed to load")
            return
        }
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
            { courses },
            {
                Authorization: `Bearer ${token}`
            }
        )
        // console.log("Object Response : ",orderResponse)
        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message)
        }

        let options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            currency: orderResponse?.data?.data?.currency,
            amount: orderResponse?.data?.data?.amount,
            order_id: orderResponse?.data?.data?.id,
            name: "Study2Success",
            description: "Thank You For Purchasing the Course",
            image: rzplogo,
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: `${userDetails.email}`
            },
            handler: function (response) {

                // Send Successfuly Mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)

                // verify payment
                verifyPayment({ ...response, courses }, token, navigate, dispatch)
            }
        }

        const paymentObject = new window.Razorpay(options)
        // console.log("paymentObject : ", paymentObject)
        paymentObject.open()
        paymentObject.on("payment.failed", function (response) {
            toast.error("Oops, Payment Failed")
            console.log(response.error)
        })


    } catch (error) {
        console.log("BUY COURSE API ERROR............", error);

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
            toast.error(error.message || "Failed to Bought courses");
        }
    } finally {
        toast.dismiss(toastId);
    }

}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount
        },
            {
                Authorization: `Bearer ${token}`
            }
        )
    } catch (error) {
        console.log("BUY COURSE API ERROR............", error);

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
            toast.error(error.message || "Failed to Bought courses");
        }
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...")
    dispatch(setPaymentLoading(true))
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`
        })
        // if (!response.data.data) {
        //     throw new Error(response.data.message)
        // }
        toast.success("Payment Successful you are added to course")
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart())
    } catch (error) {
        console.log("VERIFY PAYMENT API ERROR............", error);

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
            toast.error(error.message || "Failed to Verifed Payment");
        }
    } finally {
        toast.dismiss(toastId)
        dispatch(setPaymentLoading(false))
    }
}