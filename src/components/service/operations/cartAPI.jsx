import { toast } from "react-hot-toast"
import { cartEndpoints } from "../apis"
import { apiConnector } from "../apiconnector"
const {ADD_TO_CART,REMOVE_FROM_CART,RESET_CART} = cartEndpoints

export async function addCart(item,token){
    
    try{
        const res = await apiConnector("POST",ADD_TO_CART,item,{
            Authorization:'Bearer '+token,
        })
        if(!res.data.success){
            throw new Error(res.status.message)
        }
    } catch(e){
        console.log(e)
        toast.error(e.message)
    }
    
}

export async function resetedCart(token){
    try{
        const res = await apiConnector("POST",RESET_CART,null,{
            Authorization:'Bearer '+token,
        })
        if(!res.data.success){
            throw new Error(res.status.message)
        }
    } catch(e){
        toast.error(e.message)
    }
    
}

export async function removeCart(item,token){
    try{
        const res = await apiConnector("POST",REMOVE_FROM_CART,item,{
            Authorization:'Bearer '+token,
        })
        if(!res.data.success){
            throw new Error(res.status.message)
        }
    } catch(e){
        toast.error(e.message)
    }
    
}