import React, { useEffect } from 'react'
import OTPInput from 'react-otp-input'
import { useSelector, useDispatch } from 'react-redux';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';

const VerifyOtp = () => {

  const [otp, setOtp] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, signupData } = useSelector((state) => state.auth);


  useEffect(() => {
    if (!signupData) {
      navigate('/signup');
    }
  }, [])



  const handleOnSubmit = (e) => {
    const { email, accountType, confirmPassword, password, lastName, firstName } = signupData;

    e.preventDefault();

    dispatch(signUp(accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
      navigate));
  }

  return (
    loading ? (<div className=" h-[100vh] flex justify-center items-center"><div className="loader"></div></div>) : (
      <div>
        <div className='min-h-[calc(100vh-3.5rem)] grid place-items-center'>
          <div className='max-w-[500px] p-4 lg:p-8'>
            <h1 className="text-light-richblack-5 dark:text-dark-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">Verify Email</h1>
            <p className="text-[1.125rem] leading-[1.625rem] my-4 dark:text-dark-richblack-100 text-light-richblack-100">A verification code has been sent to you. Enter the code below</p>
            <form onSubmit={handleOnSubmit}>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                // renderSeparator={<span className='text-richblack-5'>-</span>}
                isInputNum={true}
                shouldAutoFocus={true}
                containerStyle="flex justify-between gap-[16px]"
                renderInput={(props) => <input {...props} placeholder='-' className='p-3 min-h-[48px] min-w-[58px] rounded-[8px] dark:bg-dark-richblack-800 bg-light-richblack-800 dark:text-dark-richblack-5 text-light-richblack-5 text-[16px] dark:shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] shadow-[0px_-1px_0px_0px_#00000014_inset]' />}

              />
              <button type="submit"
                className="w-full cursor-pointer bg-dark-yellow-50 my-3 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-dark-richblack-900">Verify Email</button>
            </form>
            <div className='flex items-center justify-between'>
              <Link to='/login'>
                <p className="flex items-center gap-x-2 dark:text-dark-richblack-5 text-light-richblack-5 "><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg> Back To Login</p>
              </Link>

              <button onClick={() => dispatch(sendOtp(signupData.email, navigate))} >
                <p className='flex items-center gap-x-2 w-full dark:text-dark-richblack-100 text-light-richblack-100 cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#47A5C5" width={15} viewBox="0 0 24 24" id="Outline"><title>194 restore</title>
                    <path d="M12,6a1,1,0,0,0-1,1v5a1,1,0,0,0,.293.707l3,3a1,1,0,0,0,1.414-1.414L13,11.586V7A1,1,0,0,0,12,6Z M23.812,10.132A12,12,0,0,0,3.578,3.415V1a1,1,0,0,0-2,0V5a2,2,0,0,0,2,2h4a1,1,0,0,0,0-2H4.827a9.99,9.99,0,1,1-2.835,7.878A.982.982,0,0,0,1,12a1.007,1.007,0,0,0-1,1.1,12,12,0,1,0,23.808-2.969Z" />
                  </svg>
                  Resend it
                </p>
              </button>

            </div>

          </div>
        </div>
      </div>)
  )
}

export default VerifyOtp