import { BrowserWrapper } from "../infra/browser-wrapper";
import configJson from '../configfiles/config.json'
import { MainPage } from "../logic/pages/main-page";
import { ApiCalls } from '../logic/api/api-calls';
import { WishList } from "../logic/pages/wishList-page";
import {test, expect } from "@playwright/test";
import { Page } from "playwright";
import { wrapWishlistResponse } from "../utils/utils";
import userDateJson from '../configfiles/userDataConfig.json'


test.describe('test for adding item to wishlist ', () => {
    let browserWrapper: BrowserWrapper;
    let page:Page
    let mainPage:MainPage
    let itemid:number | undefined
    const apiCalls = new ApiCalls();

    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper()
        page = await browserWrapper.getPage(configJson.url)
        mainPage = new MainPage(page)
        mainPage.clickOnWishList()

    });
    test.afterEach(async () => {
        await apiCalls.deleteItemFromWishList(itemid)
        await browserWrapper.closeBrowser();
    })
    test("check item added to wishlist",async ()=>{
        
        //ARRANGE
        let dataObject={
            "sku": [
                userDateJson.polo
            ]
        }

        //ACT
        const response=await apiCalls.addToWishList(dataObject)
        let wishlistpage=new WishList(page)
        await wishlistpage.refreshPage()
        const data=await wrapWishlistResponse(response)
        itemid=data?.data.addProductsToWishlist.anyWishlist.items[0].id

        //ASSERT
        expect(await wishlistpage.getWishlistCountItems()).toBe(1)
        
    })
    
})