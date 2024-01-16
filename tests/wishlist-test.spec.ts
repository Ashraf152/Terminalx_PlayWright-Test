import { BrowserWrapper } from "../infra/browser-wrapper";
import configJson from '../configfiles/config.json'
import { MainPage } from "../logic/pages/main-page";
import { ApiCalls } from '../logic/api/api-calls';
import { WishList } from "../logic/pages/wishList-page";
import {test, expect } from "@playwright/test";
import { Page } from "playwright";
import { wrapApiResponse } from "../utils/utils";
import userDateJson from '../configfiles/userDataConfig.json'
import { setWishListItem } from "../logic/api/request-body/wishlist-body-request";
import { WishlistResponse } from "../logic/api/response-body/wishlist-response-body";


test.describe('test for adding item to wishlist ', () => {
    let browserWrapper: BrowserWrapper;
    let page:Page
    let itemid:number | undefined
    let apiCalls : ApiCalls;

    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper()
        page = await browserWrapper.getPage(configJson.url)
        let mainPage = new MainPage(page)
        mainPage.clickOnWishList()
        apiCalls = new ApiCalls();
    });
    test.afterEach(async () => {
        await apiCalls.deleteItemFromWishList(itemid)
        await browserWrapper.closeBrowser();
    })
    test("check item added to wishlist",async ()=>{
  
        //ACT
        const response=await apiCalls.addToWishList(setWishListItem(userDateJson.polo))
        let wishlistpage=new WishList(page)
        await wishlistpage.refreshPage();
        const data=await wrapApiResponse<WishlistResponse>(response)
        itemid=data?.data.addProductsToWishlist.anyWishlist.items[0].id

        //ASSERT
        expect(await wishlistpage.getWishlistCountItems()).toBe(1)
        
    })
    
})