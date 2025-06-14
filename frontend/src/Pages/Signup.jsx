import signupLight from "../assets/Images/signupLight.png"
import signupDark from "../assets/Images/signupDark.png"
import Template from "../components/core/Auth/Template"
import { useSelector } from "react-redux";

const Signup = () => {
  const { loading } = useSelector((state)=>state.auth)
  const theme = useSelector((state)=>state.theme)
   
  return (
    loading ? (<div className='h-[100vh] flex justify-center items-center'><div className='custom-loader'></div></div>) : (

      <Template
        title="Join the millions learning to code with study2success for free"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={theme === "light" ? signupLight : signupDark}
        formType="signup"
        
        />
     

    )
  )
}

export default Signup