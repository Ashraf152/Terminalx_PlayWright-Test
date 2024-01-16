import { test, Page, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import configJson from '../configfiles/config.json';
import { ApiCalls } from '../logic/api/api-calls';
import { CheckOutPage } from '../logic/pages/checkout-page';
import userDataJson from '../configfiles/userDataConfig.json';
import { setCartBodyRequest } from '../logic/api/request-body/cart-body-request';
import {wrapCartResponse } from '../utils/utils';

test.describe.serial('test for adding an cart', () => {
    let browserWrapper: BrowserWrapper;
    let page: Page
    let checkOutPage:CheckOutPage

    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper()
        page = await browserWrapper.getPage(configJson.url)
        checkOutPage = new CheckOutPage(page);
    });
    test.afterEach(async () => {
        await checkOutPage.removeItem();
        await browserWrapper.closeBrowser();
    })
    test("check items is successfully added", async () => {
        //ARRANGE
        const apiCalls = new ApiCalls();
        let item=setCartBodyRequest(userDataJson.polo)
        
        //ACT
        const newPost = await apiCalls.addToCart((item))
        const data=await wrapCartResponse(newPost)
        const quantity=data?.data.addAnyProductsToAnyCart.total_quantity
        page = await browserWrapper.getPage(configJson.cartUrl)
        
        //ASSERT
        expect(await checkOutPage.getItemCount()).toBe(quantity)
    })

    test("check items prices", async () => {
        //ARRANGE
    
        let item1=setCartBodyRequest(userDataJson.polo)
        let item2=setCartBodyRequest(userDataJson.reebokShows)

        //ACT
        const apiCalls = new ApiCalls();
        await apiCalls.addToCart(item1)
        await apiCalls.addToCart(item2)
        page = await browserWrapper.getPage(configJson.cartUrl)

        //ASSERT
        expect(await checkOutPage.getpricesList()).toBe(await checkOutPage.getCartPrice())
    })
})
