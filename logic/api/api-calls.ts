import { patchRequest, postRequest } from "../../infra/api/apiRequest";
import configjson from '../../configfiles/config.json'
import { APIRequestContext } from "playwright";


export class ApiCalls{

    async performLogin(request:APIRequestContext,url: string, user:string,password:string){
        const data ={
            username: user,
            password: password
        }
        return await postRequest(url,data,undefined,request)
    }

    async addNewAddress(data: any){
        return await postRequest(configjson.addAddressUrl ,data,undefined)
    }
}
