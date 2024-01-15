import {postRequest } from "../../infra/api/apiRequest";
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
    async deleteAddress(data: any){
        return await postRequest(configjson.deleteAddress ,data,undefined)
    }
    async addToWishList(data:any){
        return await postRequest(configjson.addWishListurl,data,undefined)
    }
    async deleteItemFromWishList(itemid:number | undefined){
        return await postRequest(configjson.deleteitemfromwishlist,{"id":itemid},undefined)
    }

    async updatePersonalInfo(data:any){
        return await postRequest(configjson.updateUserInfo,data,undefined)
    }

    async addToCart(data:any){
        return await postRequest(configjson.addToCart,data,undefined)
    }

}
