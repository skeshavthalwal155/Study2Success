import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"

// import frameImg from '../../../assets/Images/frame.png'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import AdminLoginForm from "./AdminLoginForm"


const Template = ({ title, description1, description2, image, formType }) => {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="grid min-h-[calc(100vh - 3.5rem)] place-items-center">
      {
        loading ? (
          <div className="flex h-[calc(100vh-3.5rem)] w-full items-center justify-center">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
            <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
              <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-light-blue-5 dark:text-dark-blue-5">
                {title}
              </h1>
              <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                <span className="text-light-richblack-100 dark:text-dark-richblack-100">{description1}</span>{" "}
                <span className="font-edu-sa font-bold italic text-light-blue-100 dark:text-dark-blue-100">{description2}</span>
              </p>
              {formType === "signup" ? <SignupForm/> : formType==="admin" ? <AdminLoginForm /> : <LoginForm />}
            </div>
            <div className={`relative mx-auto w-11/12 max-w-[450px] md:mx-0`}>
             <img
                src={image}
                alt=""
                width={558}
                height={504}
                loading="lazy" 
                className="transition-all duration-200"
              />
            </div>
          </div>
        )
      }
      <div>

      </div>
    </div>
  )
}

export default Template