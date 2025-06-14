import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home"
import Login from "./Pages/Login";
import NavBar from "./components/common/NavBar";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import OpenRoute from './components/core/Auth/OpenRoute'
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyOtp from "./Pages/VerifyOtp";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from './Pages/Error'
import Settings from './components/core/Dashboard/Settings'
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import MyCourses from "./components/core/Dashboard/MyCourses/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourse";
import AdminLogin from "./Pages/AdminLogin";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import { useEffect } from "react";
import { RiWifiOffLine } from "react-icons/ri";
import SearchCourse from "./Pages/SearchCourse";
import { checkAuth } from "./slice/authSlice";
import AllCategory from "./components/core/Dashboard/Admin/AllCategory";
import AddCategory from "./components/core/Dashboard/Admin/AddCategory";
import AllUsers from "./components/core/Dashboard/Admin/AllUsers";
import AdminDashboard from "./components/core/Dashboard/Admin/AdminDashboard";
import ViewAllCourses from "./components/core/Dashboard/Admin/ViewAllCourses";
import Games from "./Pages/Games";
import NoInternet from "./Pages/NoInternet";

function App() {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.profile)
  const theme = useSelector((state) => state.theme)

  useEffect(() => {
    dispatch(checkAuth());
    const interval = setInterval(dispatch(checkAuth()), 300000) //300000 means it check every 5 mintues
    return () => clearInterval(interval)
  }, [dispatch])


  useEffect(() => {
    const root = document.documentElement
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (theme === 'system') {
      root.classList.toggle('dark', systemDark)
      localStorage.removeItem('theme')
    } else {
      root.classList.toggle('dark', theme === 'dark')
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  if (!navigator.onLine){
    return(
      <NoInternet />
    )
  }
  

    return (
      <div className={`flex min-h-screen w-screen flex-col font-inter dark:bg-dark-richblack-900 bg-white dark:text-dark-richblack-50 text-black'
      }`}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/catalog/:catalogName" element={<Catalog />}></Route>
          <Route path="/courses/:id" element={<CourseDetails />}></Route>
          <Route
            path="/signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route path="/search/:searchQuery" element={<SearchCourse />} />

          <Route
            path="/admin"
            element={
              <OpenRoute>
                <AdminLogin />
              </OpenRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />
          <Route
            path="/update-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />
          <Route
            path="/verify-email"
            element={
              <OpenRoute>
                <VerifyOtp />
              </OpenRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route
              path="dashboard/my-profile"
              element={
                <PrivateRoute>
                  <MyProfile />
                </PrivateRoute>
              }
            />
            <Route path="dashboard/settings" element={<Settings />} />
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                <Route path="dashboard/cart" element={<Cart />} />
                <Route path="dashboard/games" element={<Games />} />
              </>
            )}
            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/edit-course/:id" element={<EditCourse />} />
              </>
            )}
            {user?.accountType === ACCOUNT_TYPE.ADMIN && (
              <>
                <Route path="dashboard/all-users" element={<AllUsers />} />
                <Route path="dashboard/add-Category" element={<AddCategory />} />
                <Route path="dashboard/all-categories" element={<AllCategory />} />
                <Route path="dashboard/admin" element={<AdminDashboard />} />
                <Route path="dashboard/all-courses" element={<ViewAllCourses />} />
              </>
            )}
          </Route>

          <Route
            element={
              <PrivateRoute>
                <ViewCourse />
              </PrivateRoute>
            }
          >
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            )}
          </Route>

          <Route path="*" element={<Error />}></Route>
        </Routes>
      </div>
    );
}

export default App;