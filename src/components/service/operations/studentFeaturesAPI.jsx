import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import rzpLogo from '../../../assets/Logo/Logo-Full-Light.png'
import { setPaymentLoading } from "../../../slices/courseSlice";
import { resetCart } from "../../../slices/cartSlice";

const { studentEndpoints } = require("../apis");

const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API}=studentEndpoints;

function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement('script');
        script.src = src;
        script.onload = ()=>{
            resolve(true)
        }
        script.onerror=()=>{
            resolve(false)
        }
        document.body.appendChild(script);
    })
}


export async function buyCourse(courses,token,userDetails,navigate,dispatch){
    const toastId = toast.loading("Loading..")
    try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            toast.error("Razorpay sdk failed to load")
            return;
        }
       
        
        const orderRes = await apiConnector("POST",COURSE_PAYMENT_API,{courses},{
            Authorization:`Bearer ${token}`,
        })
        
        if(!orderRes.data.success){
            throw new Error(orderRes.data.message)
        }
        
        const option = {
            key:process.env.RAZORPAY_KEY,
            currency:orderRes.data.message.currency,
            amount:orderRes.data.message.amount,
            order_id:orderRes.data.message.id,
            name:"StudyNotion",
            description:"Thank you for purchasing course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:`${userDetails.email}`
            },
            handler:function(response){
                sendPaymentSuccessEmail(response,orderRes.data.message.amount,token);
                verifyPayment({...response,courses},token,navigate,dispatch);
            }
        }
        
        const paymentObject = new window.Razorpay(option)
        paymentObject.open()
        paymentObject.on("payment.failed",function(){
            toast.error("oops, payment failed")
        })
    } catch(e){
        console.log("PAYMENT API ERROR",e)
        toast.error(e.message)
    }
    toast.dismiss(toastId)
}


export async function sendPaymentSuccessEmail(response,amount,token){
    try{
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount
        },{
            Authorization:'Bearer ' + token,
        })
    } catch(e){
        console.log(e)
    }
}

async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId = toast.loading("Verifying Payment..")
    dispatch(setPaymentLoading(true))
    try{
        const response = await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
            Authorization:'Bearer ' +token,
        })
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Enrolled to course")
        navigate('/dashboard/enrolled-courses')
        dispatch(resetCart())
    } catch(e){
        console.log(e)
        toast.error("Could not verify payment")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}