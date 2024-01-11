import { url } from "inspector"
import { APIRequest,APIRequestContext,request } from "playwright"

const putRequest = async (url:string,body:any)=>{
    const myRequest = await request.newContext()
    return await myRequest.put(url,{
        data:body,
    })
}

export const postRequest =async(url:string,body:any,headers?:Record<string,string>,availableRequest?:APIRequestContext)=>{
    let newRequest:APIRequestContext
    const requestOptions:Record<string,any>={
        data:body,
    };
    if(headers){
        requestOptions.headers=headers;
    }
    if(availableRequest){
        return await availableRequest.post(url,requestOptions);
    }
    newRequest = await request.newContext();
    return await newRequest.post(url,requestOptions)
};

export const patchRequest = async(url:string,)=>{
    const patchRequest = async (url:string,token:string) => {
        const myRequest = await request.newContext()
        return await myRequest.patch(url,{
       })      
    }
}