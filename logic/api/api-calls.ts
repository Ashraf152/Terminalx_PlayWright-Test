import {postRequest } from "../../infra/api/apiRequest";
import configjson from '../../configfiles/config.json'
import { APIRequestContext } from "playwright";
import { AddressBodyRequest, AddressId } from "./request-body/address-body-request";
import { CartBodyRequest } from "./request-body/cart-body-request";
import { WishListBodyRequest } from "./request-body/wishlist-body-request";
import { PersonalInfoObject } from "./request-body/personal-info-body-request";


export class ApiCalls{
    
    async performLogin(request:APIRequestContext,url: string, user:string,password:string){
        const data ={
            username: user,
            password: password
        }
        return await postRequest(url,data,request)
    }

    async addNewAddress(data: AddressBodyRequest){
        return await postRequest(configjson.addAddressUrl ,data)
    }
    async deleteAddress(data: AddressId){
        return await postRequest(configjson.deleteAddress ,data)
    }
    async addToWishList(data:WishListBodyRequest){
        return await postRequest(configjson.addWishListurl,data)
    }
    async deleteItemFromWishList(itemid:number | undefined){
        return await postRequest(configjson.deleteitemfromwishlist,{"id":itemid})
    }

    async updatePersonalInfo(data:PersonalInfoObject){
        return await postRequest(configjson.updateUserInfo,data)
    }

    async addToCart(data:CartBodyRequest){
        return await postRequest(configjson.addToCart,data)
    }

}
