import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";

export async function getCatalogPageData(categoryId){
    const toastId = toast.loading("Loading..")
    let result;
    try{
        let response = await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId})
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        
        result = response?.data
    } catch(e){
        toast.error(e.message)
    }
    toast.dismiss(toastId)
    return result
}