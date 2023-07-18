import Template from "../components/Common/Template";
import signupImg from "../assets/Images/signup.webp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Signup() {
  const {token} = useSelector(state=>state.auth)
  const navigate = useNavigate()
  useEffect(()=>{
    if(token){
      console.log(token)
      navigate('/dashboard/my-profile')
    }
  },[])
  
  return (
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
  );
}

export default Signup;
