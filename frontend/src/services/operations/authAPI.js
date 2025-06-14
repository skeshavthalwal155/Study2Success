import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slice/authSlice"
import { resetCart } from "../../slice/cartSlice"
import { setUser } from "../../slice/profileSlice"
import { endpoints } from "../apis"
import { apiConnector } from "../apiconnector"
import { setProgress } from "../../slice/loadingBarSlice"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      dispatch(setProgress(100));
      // console.log("SENDOTP API RESPONSE............", response)

      // console.log(response.data.success)

      if (!response?.data?.success) {
        console.log("Error=", response?.data?.message);
        toast.error(response?.data?.message || "Failed to send otp");
        return;
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SEND OTPERROR............", error);

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
      // toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      // console.log("SIGNUP API RESPONSE............", response)

      if (!response?.data?.success) {
        console.log("Error=", response?.data?.message);
        toast.error(response?.data?.message || "Failed to sign up");
        return;
      }

      dispatch(setProgress(100));
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("Singup ERROR............", error);

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
        toast.error(error.message || "Failed to sign up");
      }
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      // console.log("LOGIN API RESPONSE............", response)

      if (!response?.data?.success) {
        console.log("Error=", response?.data?.message);
        toast.error(response?.data?.message || "Failed to login");
        return;
      }
      const { token, user } = response.data;
      dispatch(setProgress(100))
      dispatch(setToken(token))
      toast.success("Login Successful")
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...user, image: userImage }))

      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("token", JSON.stringify(token))
      navigate("/dashboard/my-profile", { replace: true });

    } catch (error) {
      console.log("login api ERROR............", error);

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
        toast.error(error.message || "Failed to login");
      }
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      // console.log("RESET PASS TOKEN RESPONSE............", response);

      // This block will only execute for successful (2xx) responses
      if (!response?.data?.success) {
        console.log("Error=", response?.data?.message);
        toast.error(response?.data?.message || "Failed to send reset email");
        return;
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESET PASS TOKEN ERROR............", error);

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
        toast.error(error.message || "Failed to send reset email");
      }
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

export function resetPassword(password, confirmPassword, token, setresetComplete) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      // console.log("RESETPASSWORD RESPONSE............", response)

      if (!response?.data?.success) {
        console.log("Error=", response?.data?.message);
        toast.error(response?.data?.message || "Failed to reset password");
        return;
      }

      toast.success("Password Reset Successfully")
      setresetComplete(true)
    } catch (error) {
      console.log("RESET PASSWORD TOKEN ERROR............", error);

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
        toast.error(error.message || "Failed to reset password");
      }
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

export function logout(navigate) {
  return (dispatch) => {
    try {
      // Clear Redux state
      dispatch(setToken(null));
      dispatch(setUser(null));
      dispatch(resetCart());

      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Show feedback and redirect
      toast.success("You've been logged out successfully");

      if (navigate) {
        navigate("/", { replace: true });
      }

      // Force reload to ensure clean state
      window.location.reload();

    } catch (error) {
      console.error("LOGOUT ERROR:", error);
      toast.error("There was an issue during logout");
    }
  }
}


export function forgotPassword(email, setEmailSent) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      })

      // console.log("FORGOTPASSWORD RESPONSE............", response)

      if (!response?.data?.success) {
        console.log("Error=", response?.data?.message);
        toast.error(response?.data?.message || "Failed to reset password");
        return;
      }
      toast.success("Reset Email Sent");
      setEmailSent(true)
    } catch (error) {
      console.log("RESET PASS TOKEN ERROR............", error);

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
        toast.error(error.message || "Failed to forgot password");
      }
    } finally {
      // toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}